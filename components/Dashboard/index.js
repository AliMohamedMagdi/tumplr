'use strict'

import React, {
  View,
  Component,
  StyleSheet
} from 'react-native'
import Drawer from 'react-native-drawer'
import GiftedSpinner from 'react-native-gifted-spinner'

import SideMenu from './SideMenu'
import ItemList from './ItemList'

// import ScrollableTabView from 'react-native-scrollable-tab-view'
// import AnimatedAudioFooter from './AudioFooter/AnimatedAudioFooter'

class Dashboard extends Component {

  constructor (props) {
    super(props)
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
    this.props.actions.signOauth()
  }

  renderLoading () {
    return (
      <View style={styles.spinnerContainer}>
        <GiftedSpinner />
      </View>
    )
  }

  renderDashboard (data) {
    const DrawerProps = {
      ref: ref => { this._drawer = ref },
      content: <SideMenu closeDrawer={this.closeSideMenu} />,
      styles: styles.drawer,
      tweenEasing: 'easeInCubic',
      openDrawerOffset: 100
    }
    const ItemListProps = {
      response: data.response,
      navigator: this.props.navigator
    }

    return (
      <Drawer {...DrawerProps}>
        <ItemList {...ItemListProps} />
      </Drawer>
    )
  }

  render () {
    const {
      loading,
      dashboardData: data
    } = this.props
    return loading ? this.renderLoading() : this.renderDashboard(data)
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
  },
  spinner: {
  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3a3f41'
  }
})

Dashboard.propTypes = {
  token: React.PropTypes.string.isRequired,
  token_secret: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,

  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  }),

  // Container state and actions
  loading: React.PropTypes.bool.isRequired,
  dashboardData: React.PropTypes.object.isRequired,
  actions: React.PropTypes.shape({
    fetchData: React.PropTypes.func.isRequired,
    signOauth: React.PropTypes.func.isRequired
  })
}

export default Dashboard
