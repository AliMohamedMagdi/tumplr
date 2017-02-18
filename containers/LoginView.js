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
const screen = Dimensions.get('window')
const login = NativeModules.Tumblr.authenticate

import { LoginButton } from '../components/Buttons'

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

    // Store auth and user information
    const userInfo = await (await fetch(request.signed_url)).text()
    AsyncStorage.multiSet([
      [ 'token', response.oauthToken ],
      [ 'token-secret', response.oauthTokenSecret ],
      [ 'user-info', JSON.stringify(userInfo) ]
    ])

    console.log('User info received!')
    console.log(JSON.stringify(userInfo, null, 2))

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
      <View style={{ height: screen.height }}>

        {/* Background image */}
        <Image source={require('../assets/night.png')} style={styles.backgroundImage} />

        {/* Title & login button */}
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> Lune </Text>
          </View>
          <LoginButton onPress={() => login(this.authCallback.bind(this))} />
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
    marginTop: screen.height / 5
  },
  titleContainer: {
    marginTop: 30,
    marginRight: 30,
    marginBottom: 60
  },
  title: {
    fontSize: 80,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'NoteraPersonalUseOnly'
  },
  bold: {
    fontWeight: 'bold'
  },
  footer: {
    flex: 1,
    width: screen.width,
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
    height: screen.height,
    width: screen.width,
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
