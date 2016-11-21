/**
 * Lune main application component
 */

'use strict'

import {
  Text,
  Navigator,
  // StyleSheet,
  AsyncStorage
} from 'react-native'
import React, { Component } from 'react'

import LoginView from './LoginView'
import LoadingView from './LoadingView'
// import ErrorModal from './ErrorModal'
// import ProfileContainer from '../containers/Profile'
// import DashboardContainer from '../containers/Dashboard'
// import ProfileNavBarIcon from './Profile/ProfileNavBarIcon.js'
// import ProfileNavigationBar from './Profile/ProfileNavigationBar.js'

class Lune extends Component {

  constructor (props) {
    super(props)

    this.state = { currentRoute: 'loading-view' }

    this.renderScene = this.renderScene.bind(this)
    this._viewDashboard = this._viewDashboard.bind(this)
    this._initRouteMapper = this._initRouteMapper.bind(this)
  }

  _viewDashboard (token, tokenSecret, userInfo) {
    this._navigator.replacePrevious({
      token: token,
      name: 'dashboard-view',
      creds: this.props.creds,
      token_secret: tokenSecret,
      userInfo: JSON.parse(userInfo),
      style: Navigator.SceneConfigs.FadeAndroid
    })
  }

  _initRouteMapper () {
    this._navBarRouteMapper = {
      separatorForRoute: (route, navigator) => {},
      rightContentForRoute: (route, navigator) => {},
      // iconForRoute: (route, navigator) => <ProfileNavBarIcon {...{route, navigator}} />,
      titleContentForRoute: (route, navigator) => route.blog ? <Text> {route.blog.name} </Text> : null
    }
  }

  _loadData () {
    try {
      // Attempt to retrieve token information for Tumblr authentication
      AsyncStorage.multiGet(['token', 'token_secret', 'user_info']).then(stores => {
        const store = [
          stores.find(s => s[0] === 'token'),
          stores.find(s => s[0] === 'token_secret'),
          stores.find(s => s[0] === 'user_info')
        ]
        if (!store[0][1] || !store[1][1] || !store[2][1]) {
          this._navigator.replacePrevious({
            name: 'login-view',
            style: Navigator.SceneConfigs.FadeAndroid
          })
        } else {
          this._viewDashboard(store[0][1], store[1][1], store[2][1])
        }
      })
    } catch (error) {
      console.log(`AsyncStorage error: ${error.message}`)
    }
  }

  componentWillMount () {
    this._initRouteMapper()
    this._loadData()
  }

  renderScene (route, nav) {
    switch (route.name) {

      // case 'loading-view':
      //   return <LoadingView navigator={nav} />

      // case 'error-modal-view':
      //   const ErrorModalProps = {
      //     navigator: nav,
      //     message: route.message
      //   }
      //   return <ErrorModal {...ErrorModalProps} />

      case 'login-view':
        return (
          <LoginView navigator={nav}
            creds={{
              key: this.props.creds.key,
              sec: this.props.creds.sec
            }} />
        )

      // case 'dashboard-view':
      //   const DashboardProps = {
      //     navigator: nav,
      //     creds: route.creds,
      //     token: route.token,
      //     token_secret: route.token_secret,
      //     userInfo: route.userInfo
      //   }
      //   return <DashboardContainer {...DashboardProps} />

      // case 'profile-view':
      //   const ProfileProps = {
      //     auth: route.auth,
      //     blog: route.blog || null,
      //     blogName: route.blogName,
      //     image: route.image,
      //     creds: route.creds,
      //     navigator: nav
      //   }
      //   return <ProfileContainer {...ProfileProps} />

      default:
        return <LoadingView navigator={nav} />
    }
  }

  render () {
        // navigationBar={
        //   <ProfileNavigationBar routeMapper={this._navBarRouteMapper} style={styles.navbar} />
        // }
    return (
      <Navigator
        ref={ref => { this._navigator = ref }}
        renderScene={this.renderScene}
        initialRoute={{ name: this.state.currentRoute }}
        configureScene={route => route.style || Navigator.SceneConfigs.FloatFromRight}
      />
    )
  }
}

// const styles = StyleSheet.create({
//   navbar: {
//     backgroundColor: 'transparent'
//   }
// })

Lune.propTypes = {
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default Lune
