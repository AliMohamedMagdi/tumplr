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
    this.state = { loading: false }
    this.openSideMenu = this.openSideMenu.bind(this)
    this.closeSideMenu = this.closeSideMenu.bind(this)
    this.renderLoading = this.renderLoading.bind(this)
    this.renderDashboard = this.renderDashboard.bind(this)
  }

  closeSideMenu () {
    console.log('close')
    this._drawer.close()
  }

  openSideMenu () {
    console.log('open')
    this._drawer.open()
  }

  componentWillMount () {
    // const { creds, token } = this.props
    // const uri = `http://api.tumblr.com/v2/user/info/?api_key=${creds.key}&oauth_consumer_key=${creds.key}&oauth_token=${token}`
    // fetch(uri, { method: 'GET' })
    //   .then((response) => response.text())
    //   .then((responseText) => console.dir(responseText))
    //   .catch((error) => console.dir(error))

    // const another = `http://api.tumblr.com/v2/blog/mi-xiu/likes?api_key=${creds.key}&oauth_consumer_key=${creds.key}&oauth_token=${token}`
    // fetch(another, { method: 'GET' })
    //   .then((response) => response.text())
    //   .then((responseText) => console.dir(responseText))
    //   .catch((error) => console.dir(error))
    // const { creds, token } = this.props
    // const uri = `http://api.tumblr.com/v2/user/info/?api_key=${creds.key}&oauth_consumer_key=${creds.key}&oauth_token=${token}`
    // fetch(uri, { method: 'GET' })
    //   .then((response) => response.text())
    //   .then((responseText) => console.dir(responseText))
    //   .catch((error) => console.dir(error))
  }

  renderLoading () {

  }

  renderDashboard () {
    const DrawerProps = {
      ref: ref => { this._drawer = ref },
      content: <SideMenu closeDrawer={this.closeSideMenu} />,
      styles: styles.drawer,
      tweenEasing: 'easeInCubic',
      openDrawerOffset: 100
    }

    return (
      <Drawer {...DrawerProps}>
        <ItemList {...Response} tabLabel={'Settings'} />
      </Drawer>
    )
  }

  render () {
    return this.state.loading ? this.renderLoading() : this.renderDashboard()
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

Dashboard.propTypes = {
  token: React.PropTypes.string.isRequired,
  token_secret: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default Dashboard
