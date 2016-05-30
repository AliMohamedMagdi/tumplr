import React, {
  Component,
  Navigator,
  AsyncStorage
} from 'react-native'
import OAuthSimple from 'oauthsimple'
import LoginButton from '../../components/Login/LoginButton'
const Tumblr = React.NativeModules.Tumblr

class LoginButtonContainer extends Component {
  constructor (props) {
    super(props)
    this._login = this._login.bind(this)
    this._authCallback = this._authCallback.bind(this)
  }

  _login () {
    Tumblr.authenticate(this._authCallback)
  }

  _authCallback (response) {
    console.log('Fetching user data...')

    // Construct oauth signed url
    const oauth = new OAuthSimple(response.oauth_token, response.oauth_token_secret)
    const request = oauth.sign({
      action: 'GET',
      path: 'http://api.tumblr.com/v2/user/info',
      signatures: {
        consumer_key: this.props.creds.key,
        shared_secret: this.props.creds.sec,
        oauth_token: response.oauth_token,
        oauth_secret: response.oauth_token_secret
      }
    })

    // Retrieve user info and switch to the dashboard view
    fetch(request.signed_url).then((response) => response.text())
      .then((userInfo) => {
        console.log('User info received!')
        console.log(JSON.stringify(JSON.parse(userInfo), null, 2))

        AsyncStorage.multiSet([
          [ 'token', response.oauth_token ],
          [ 'token_secret', response.oauth_token_secret ],
          [ 'user_info', JSON.stringify(userInfo) ]
        ]).then(() => {
          // Redirect the view to the dashboard
          this.props.navigator.push({
            name: 'dashboard-view',
            creds: this.props.creds,
            token: response.oauth_token,
            token_secret: response.oauth_token_secret,
            style: Navigator.SceneConfigs.FadeAndroid,
            userInfo: userInfo
          })
        })
      })
      .catch((error) => console.log(error))
  }

  render () {
    const LoginButtonProps = {
      login: this._login,
      ...this.props
    }
    return <LoginButton {...LoginButtonProps} />
  }
}

LoginButtonContainer.propTypes = {
  navigator: React.PropTypes.object,
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default LoginButtonContainer
