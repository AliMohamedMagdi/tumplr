import React, {
  Text,
  View,
  Navigator,
  Component,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight
} from 'react-native'
import OAuthSimple from 'oauthsimple'
import EntypoIcon from 'react-native-vector-icons/Entypo'
const Tumblr = React.NativeModules.Tumblr

class LoginButton extends Component {
  constructor (props) {
    super(props)
    this.state = { heldDown: false }

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
    const TumblrIconProps = {
      color: 'white',
      name: 'tumblr',
      style: styles.button
    }

    const TumblrButtonProps = {
      activeOpacity: 0.5,
      onPress: () => this._login(),
      underlayColor: 'transparent',
      onShowUnderlay: () => this.setState({ heldDown: true }),
      onHideUnderlay: () => this.setState({ heldDown: false })
    }

    return (
      <View style={[ styles.buttonContainer, this.state.heldDown && styles.buttonDown ]}>
        <TouchableHighlight {...TumblrButtonProps} >
          <EntypoIcon {...TumblrIconProps}>
            <Text> Login with Tumblr </Text>
          </EntypoIcon>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 70,
    marginRight: 70,
    borderBottomWidth: 5,
    borderRadius: 2,
    borderColor: '#545f72',
    backgroundColor: '#727d8d'
  },
  button: {
    margin: 10,
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  },
  buttonDown: {
    marginTop: 4,
    borderBottomWidth: 3
  }
})

LoginButton.propTypes = {
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default LoginButton
