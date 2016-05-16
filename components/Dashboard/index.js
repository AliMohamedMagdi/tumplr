'use strict'

import React, {
  Component,
  StyleSheet
} from 'react-native'
import Drawer from 'react-native-drawer'
import SideMenu from './SideMenu'
import ItemList from './ItemList'
import Response from '../../scripts/tumblr_response.json'

// import ScrollableTabView from 'react-native-scrollable-tab-view'
// import AnimatedAudioFooter from './AudioFooter/AnimatedAudioFooter'

class Dashboard extends Component {

  constructor (props) {
    super(props)
    this.openSideMenu = this.openSideMenu.bind(this)
    this.closeSideMenu = this.closeSideMenu.bind(this)
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
        >
        <ItemList {...Response} tabLabel={'Settings'} />
      </Drawer>
    )
  }
};

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

export default Dashboard
