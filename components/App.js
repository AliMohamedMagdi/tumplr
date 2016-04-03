/**
 * Lunatune main application component
 */

'use strict'
import React, { Component } from 'react-native'
// import ScrollableTabView from 'react-native-scrollable-tab-view'
import Response from '../scripts/tumblr_response.js'
import SongList from './SongList.js'

class Lunatune extends Component {
  render () {
    return (
      <SongList {...Response} tabLabel={'Settings'}/>
    )
  }
}

// <ScrollableTabView {...ScrollableTabProps}>
//   <SongList {...Response} tabLabel={'Dashboard'}/>
//   <SongList {...Response} tabLabel={'Settings'}/>
// </ScrollableTabView>

// const ScrollableTabProps = {
//   tabBarBackgroundColor: 'white',
//   tabBarUnderlineColor: '#004466',
//   tabBarActiveTextColor: '#004466',
//   style: {
//     paddingTop: 18,
//     borderWidth: 0,
//     backgroundColor: 'white'
//   }
// }

export default Lunatune
