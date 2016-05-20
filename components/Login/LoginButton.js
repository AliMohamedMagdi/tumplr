import React, {
  Text,
  View,
  Navigator,
  Component,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import OAuthSimple from 'oauthsimple'
import EntypoIcon from 'react-native-vector-icons/Entypo'
const Tumblr = React.NativeModules.Tumblr

class LoginButton extends Component {
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
        console.dir('User info received!')
        console.dir(JSON.parse(userInfo))
        this.props.navigator.push({
          name: 'dashboard-view',
          creds: this.props.creds,
          token: response.oauth_token,
          token_secret: response.oauth_token_secret,
          style: Navigator.SceneConfigs.FadeAndroid,
          userInfo: userInfo
        })
      })
      .catch((error) => console.log(error))
  }

  render () {
    const TumblrIconProps = {
      color: 'white',
      name: 'tumblr',
      style: styles.button
    }

    return (
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._login}>
            <EntypoIcon {...TumblrIconProps}>
              <Text> Sign in with Tumblr </Text>
            </EntypoIcon>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 40,
    borderRadius: 4,
    backgroundColor: '#36465D'
  },
  button: {
    margin: 10,
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  }
})

LoginButton.propTypes = {
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default LoginButton
