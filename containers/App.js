/**
 * Lune main application container component
 */

'use strict'

import {
  StatusBar,
  Navigator,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import React, { Component } from 'react'

import LoginView from './LoginView'
import LoadingView from './LoadingView'
// import ErrorModal from './ErrorModal'
import ProfileView from './ProfileView'
import DashboardView from './DashboardView'
import ProfileNavigationBar from '../components/Profile/Navigation/Bar'
import ProfileNavigationBarIcon from '../components/Profile/Navigation/Icon'

class Lune extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentRoute: 'loading-view'
    }
    this.renderScene = this.renderScene.bind(this)
  }

  componentWillMount () {
    StatusBar.setHidden(true)
    this.initRouteMapper()
    this.loadData()
  }

  initRouteMapper () {
    this.routeMapper = {
      separatorForRoute: (route, navigator) => {},
      rightContentForRoute: (route, navigator) => {},
      titleContentForRoute: (route, navigator) => {},
      iconForRoute: (route, navigator) => <ProfileNavigationBarIcon {...{route, navigator}} />
    }
  }

  async loadData () {
    try {
      // Attempt to retrieve user/auth from storage
      const [
        [, token],
        [, tokenSecret],
        [, userInfo]
      ] = await AsyncStorage.multiGet([
        'token',
        'token-secret',
        'user-info'
      ])

      // Navigate to login view to retrieve user/auth or to dashboard view
      if (!token || !tokenSecret || !userInfo) {
        this._navigator.replacePrevious({
          name: 'login-view',
          style: Navigator.SceneConfigs.FadeAndroid
        })
      } else {
        this._navigator.replacePrevious({
          token,
          tokenSecret,
          name: 'dashboard-view',
          creds: this.props.creds,
          userInfo: JSON.parse(userInfo),
          style: Navigator.SceneConfigs.FadeAndroid
        })
      }
    } catch (error) {
      console.log(`AsyncStorage error: ${error.message}`)
    }
  }

  renderScene (route, nav) {
    switch (route.name) {

      case 'loading-view':
        return <LoadingView navigator={nav} />

      // case 'error-modal-view':
      //   const ErrorModalProps = {
      //     navigator: nav,
      //     message: route.message
      //   }
      //   return <ErrorModal {...ErrorModalProps} />

      case 'login-view':
        return <LoginView navigator={nav} creds={this.props.creds} />

      case 'dashboard-view':
        return (
          <DashboardView
            navigator={nav}
            creds={route.creds}
            token={route.token}
            tokenSecret={route.tokenSecret}
            userInfo={route.userInfo}
          />
        )

      case 'profile-view':
        return (
          <ProfileView
            auth={route.auth}
            blog={route.blog || null}
            blogName={route.blogName}
            image={route.image}
            creds={route.creds}
            navigator={nav}
          />
        )

      default:
        return <LoadingView navigator={nav} />
    }
  }

  render () {
    return (
      <Navigator
        renderScene={this.renderScene}
        ref={ref => { this._navigator = ref }}
        initialRoute={{ name: this.state.currentRoute }}
        configureScene={route => route.style || Navigator.SceneConfigs.FloatFromRight}
        navigationBar={<ProfileNavigationBar routeMapper={this.routeMapper} style={styles.navbar} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'transparent'
  }
})

Lune.propTypes = {
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default Lune
