/**
 * Lune main application component
 */

'use strict'

import React, {
  Linking,
  Component
} from 'react-native'
import qs from 'qs'

import Dashboard from './Dashboard'

class Lune extends Component {

  constructor (props) {
    super(props)

    this._processURL = this._processURL.bind(this)
    this._processOAuthCallback = this._processOAuthCallback.bind(this)
  }

  componentDidMount () {
    Linking.addEventListener('url', this._processURL)
  }

  _processURL (event) {
    console.log('Processing url!')
    console.dir(event)
    const url = event.url.replace('lune://', '').split('?')
    const path = url[0]
    const parameters = url[1] ? qs.parse(url[1]) : null

    switch (path) {
      case 'oauth-callback':
        this._processOAuthCallback(parameters)
        break
      default:
        console.log('???')
        console.log(path)
        break
    }
  }

  _processOAuthCallback (parameters) {
    console.log(parameters.oauth_token)
  }

  render () {
    return <Dashboard />
  }
}

export default Lune
