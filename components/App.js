/**
 * Lune main application component
 */

'use strict'

import React, {
  Navigator,
  AsyncStorage
} from 'react-native'

import Login from './Login'
import Loading from './Loading'
import Dashboard from './Dashboard'

class Lune extends React.Component {

  constructor (props) {
    super(props)
    this.state = { currentRoute: 'loading-view' }

    this.renderScene = this.renderScene.bind(this)
    this._viewDashboard = this._viewDashboard.bind(this)
  }

  _viewDashboard (token) {
    this._navigator.push({
      token: token,
      name: 'dashboard-view',
      creds: this.props.creds,
      style: Navigator.SceneConfigs.FadeAndroid
    })
  }

  _loadData () {
    try {
      AsyncStorage.getItem('token')
        .then((token) => {
          if (token === null) {
            this._navigator.push({
              name: 'login-view',
              style: Navigator.SceneConfigs.FadeAndroid
            })
          } else {
            this._viewDashboard(token)
          }
        })
    } catch (error) {
      console.log(`AsyncStorage error: ${error.message}`)
    }
  }

  componentWillMount () {
    this._loadData()
  }

  renderScene (route, nav) {
    switch (route.name) {
      case 'loading-view':
        return <Loading navigator={nav} />

      case 'login-view':
        const LoginProps = {
          navigator: nav,
          creds: {
            key: this.props.creds.key,
            sec: this.props.creds.sec
          }
        }
        return <Login {...LoginProps} />

      case 'dashboard-view':
        const DashboardProps = {
          navigator: nav,
          creds: route.creds,
          token: route.token,
          token_secret: route.token_secret
        }
        return <Dashboard {...DashboardProps} />

      default:
        return <Loading navigator={nav} />
    }
  }

  render () {
    return <Navigator
      ref={ref => { this._navigator = ref }}
      initialRoute={{name: this.state.currentRoute}}
      renderScene={this.renderScene}
      configureScene={route => route.style || Navigator.SceneConfigs.FloatFromRight}
    />
  }
}

Lune.propTypes = {
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default Lune
