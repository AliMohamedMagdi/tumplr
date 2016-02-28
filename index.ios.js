/**
 * Lunatune main application component
 */

'use strict'

import React, { AppRegistry, Component } from 'react-native'
import Response from './components/tumblr_response.js'
import SongList from './components/SongList'

class Lunatune extends Component {
  render () {
    return <SongList {...Response}/>
  }
}

AppRegistry.registerComponent('lunatune', () => Lunatune)
