/**
 * Login view container
 */

'use strict'

import {
  View,
  Text,
  Image,
  Navigator,
  StyleSheet,
  AsyncStorage,
  NativeModules
} from 'react-native'
import React, { Component } from 'react'

import Dimensions from 'Dimensions'
import OAuthSimple from 'oauthsimple'
const window = Dimensions.get('window')

import LoginButton from '../components/LoginButton'

class LoginView extends Component {

  async authCallback (response) {
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

    console.log('User info received!')
    console.log(JSON.stringify(JSON.parse(userInfo), null, 2))

    // Store auth and user information
    const userInfo = await (await fetch(request.signed_url)).text()
    AsyncStorage.multiSet([
      [ 'token', response.oauthToken ],
      [ 'token-secret', response.oauthTokenSecret ],
      [ 'user-info', JSON.stringify(userInfo) ]
    ])

    // Redirect the view to the dashboard
    this.props.navigator.push({
      name: 'dashboard-view',
      creds: this.props.creds,
      token: response.oauthToken,
      tokenSecret: response.oauthTokenSecret,
      style: Navigator.SceneConfigs.FadeAndroid,
      userInfo
    })
  }

  render () {
    return (
      <View style={{ height: window.height }}>

        {/* Background image */}
        <Image source={require('../assets/night.png')} style={styles.backgroundImage} />

        {/* Title & login button */}
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> Lune </Text>
          </View>
          <LoginButton onPress={() => NativeModules.Tumblr.authenticate(this.authCallback)} />
        </View>

        {/* Signup / continue as guest */}
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
