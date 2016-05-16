/**
 * Lune main application component
 */

'use strict'

import React, {
  Linking,
  Component,
  StyleSheet
} from 'react-native'
import qs from 'qs'
import Drawer from 'react-native-drawer'
// import ScrollableTabView from 'react-native-scrollable-tab-view'

import Response from '../scripts/tumblr_response.json'
import SongList from './SongList.js'
import SideMenu from './SideMenu.js'
// import AnimatedAudioFooter from './AudioFooter/AnimatedAudioFooter'

class Lune extends Component {
  constructor (props) {
    super(props)

    this._processURL = this._processURL.bind(this)
    this._processOAuthCallback = this._processOAuthCallback.bind(this)

    this.openSideMenu = this.openSideMenu.bind(this)
    this.closeSideMenu = this.closeSideMenu.bind(this)
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

  closeSideMenu () {
    console.log('close')
    this._drawer.close()
  }

  openSideMenu () {
    console.log('open')
    this._drawer.open()
  }

  render () {
    return (
      <Drawer
        ref={ref => { this._drawer = ref }}
        content={<SideMenu closeDrawer={this.closeSideMenu} />}
        styles={styles.drawer}
        tweenEasing={"easeInCubic"}
        openDrawerOffset={100}
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
        >
        <SongList {...Response} tabLabel={'Settings'} />
      </Drawer>
    )
  }
}

      // <View>
      //   <AnimatedAudioFooter/>
      // </View>

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

const styles = StyleSheet.create({
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  }
})

export default Lune
