import {
  View,
  Text,
  Image,
  // Navigator,
  StyleSheet,
  // AsyncStorage
  NativeModules
} from 'react-native'
import React, { Component } from 'react'
import Dimensions from 'Dimensions'
import OAuthSimple from 'oauthsimple'
import Button from '../components/Button'

const window = Dimensions.get('window')

class LoginView extends Component {

  constructor (props) {
    super(props)
    this.state = { loggingIn: false }
    this._login = this._login.bind(this)
    this._authCallback = this._authCallback.bind(this)
  }

  componentDidMount () {
  }

  onNavigationStateChange (navState) {
    console.dir(navState)
  }

  _authCallback (response) {
    console.log('Fetching user data...')

    // Construct oauth signed url
    const oauth = new OAuthSimple(response.oauthToken, response.oauthTokenSecret)
    const request = oauth.sign({
      action: 'GET',
      path: 'https://api.tumblr.com/v2/user/info',
      signatures: {
        consumer_key: this.props.creds.key,
        shared_secret: this.props.creds.sec,
        oauth_token: response.oauthToken,
        oauth_secret: response.oauthTokenSecret
      }
    })

    // Retrieve user info and switch to the dashboard view
    fetch(request.signed_url).then((response) => response.text())
      .then((userInfo) => {
        console.log('User info received!')
        console.log(JSON.stringify(JSON.parse(userInfo), null, 2))

        // AsyncStorage.multiSet([
        //   [ 'token', response.oauth_token ],
        //   [ 'token_secret', response.oauth_token_secret ],
        //   [ 'user_info', JSON.stringify(userInfo) ]
        // ]).then(() => {
        //   // Redirect the view to the dashboard
        //   this.props.navigator.push({
        //     name: 'dashboard-view',
        //     creds: this.props.creds,
        //     token: response.oauth_token,
        //     token_secret: response.oauth_token_secret,
        //     style: Navigator.SceneConfigs.FadeAndroid,
        //     userInfo: userInfo
        //   })
        // })
      })
      .catch((error) => console.log(error))
  }

  _login () {
    console.log('login :)')
    NativeModules.Tumblr.authenticate(this._authCallback)
  }

  render () {
    return (
      <View style={{ height: window.height }}>

        <Image source={require('../assets/night.png')} style={styles.backgroundImage} />

        <View style={styles.container}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}> Lune </Text>
          </View>

          <Button
            onPress={() => NativeModules.Tumblr.authenticate(this._authCallback)}
            text='Log in to Tumblr'
            icon={{
              name: 'tumblr',
              color: 'white'
            }}
          />

        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}> Not a Tumblr user? </Text>
          <Text style={styles.footerText}>
            <Text style={styles.bold}> Sign up </Text> or
            <Text style={styles.bold}> Continue </Text> as a guest user.
          </Text>
        </View>

      </View>
    )
  }

};

const styles = StyleSheet.create({
  container: {
    marginTop: window.height / 5
  },
  titleContainer: {
    margin: 50
  },
  title: {
    fontSize: 100,
    color: 'white',
    marginRight: 40,
    textAlign: 'center',
    fontFamily: 'NoteraPersonalUseOnly'
  },
  bold: {
    fontWeight: 'bold'
  },
  footer: {
    flex: 1,
    width: window.width,
    position: 'absolute',
    bottom: 20
  },
  footerText: {
    color: 'white',
    paddingBottom: 5,
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center'
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    height: window.height,
    width: window.width,
    resizeMode: 'cover'
  }
})

LoginView.propTypes = {
  navigator: React.PropTypes.object,
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default LoginView
