import React, {
  Text,
  View,
  Image,
  Navigator,
  Component,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import Dimensions from 'Dimensions'
import OAuthSimple from 'oauthsimple'
import EntypoIcon from 'react-native-vector-icons/Entypo'
const Tumblr = React.NativeModules.Tumblr
const window = Dimensions.get('window')

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

    return (
      <View>
        <Image source={require('../../assets/night.png')} style={styles.backgroundImage} />
        <TouchableOpacity onPress={this._login}>
          <View style={styles.buttonContainer}>
            <EntypoIcon {...TumblrIconProps}>
              <Text> Login with Tumblr </Text>
            </EntypoIcon>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    height: window.height,
    width: window.width,
    resizeMode: 'cover'
  },
  buttonContainer: {
    margin: 70,
    borderBottomWidth: 5,
    borderRadius: 2,
    borderColor: '#5e6a7d',
    backgroundColor: '#727d8d'
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
