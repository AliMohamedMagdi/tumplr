/**
 * Lunatune main application component
 */

'use strict'

import React, { AppRegistry, Component } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Response from './components/tumblr_response.js'
import SongList from './components/SongList'

class Lunatune extends Component {
  render () {
    return (
      <ScrollableTabView {...ScrollableTabProps}>
        <SongList {...Response} tabLabel={'Dashboard'}/>
        <SongList {...Response} tabLabel={'Settings'}/>
      </ScrollableTabView>
    )
  }
}

const ScrollableTabProps = {
  tabBarBackgroundColor: 'white',
  tabBarUnderlineColor: '#004466',
  tabBarActiveTextColor: '#004466',
  style: {
    paddingTop: 18,
    borderWidth: 0,
    backgroundColor: 'white'
  }
}

AppRegistry.registerComponent('lunatune', () => Lunatune)
