/**
 * Lunatune main application component
 */

'use strict'

import React, { AppRegistry, Component } from 'react-native'
import Response from './components/tumblr_response.js'
import SideMenu from 'react-native-side-menu'
import SongList from './components/SongList'
import Menu from './components/Menu.js'

class Lunatune extends Component {
  render () {
    const menu = <Menu navigator={navigator}/>
    return (
      <SideMenu menu={menu}>
        <SongList {...Response}/>
      </SideMenu>
    )
  }
}

AppRegistry.registerComponent('lunatune', () => Lunatune)
