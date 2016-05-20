'use strict'

import React, {
  Component,
  StyleSheet
} from 'react-native'
import OAuthSimple from 'oauthsimple'
import Drawer from 'react-native-drawer'
import GiftedSpinner from 'react-native-gifted-spinner'

import SideMenu from './SideMenu'
import ItemList from './ItemList'
// import Response from '../../scripts/tumblr_response.json'

// import ScrollableTabView from 'react-native-scrollable-tab-view'
// import AnimatedAudioFooter from './AudioFooter/AnimatedAudioFooter'

class Dashboard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      dashboardData: null
    }
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
    // Construct oauth signed url
    const oauth = new OAuthSimple(this.props.token, this.props.token_secret)
    const request = oauth.sign({
      action: 'GET',
      path: 'http://api.tumblr.com/v2/user/dashboard',
      parameters: {
        limit: 20,
        type: 'audio',
        notes_info: true,
        reblog_info: true
      },
      signatures: {
        consumer_key: this.props.creds.key,
        shared_secret: this.props.creds.sec,
        oauth_token: this.props.token,
        oauth_secret: this.props.token_secret
      }
    })

    // Retrieve user info and switch to the dashboard view
    fetch(request.signed_url).then((response) => response.json())
      .then((data) => {
        console.dir('Dashboard data received!')
        console.dir(data)
        this.setState({
          loading: false,
          dashboardData: data
        })
      })
      .catch((error) => console.log(error))
  }

  renderLoading () {
    return <GiftedSpinner style={styles.spinner} />
  }

  renderDashboard (data) {
    const DrawerProps = {
      ref: ref => { this._drawer = ref },
      content: <SideMenu closeDrawer={this.closeSideMenu} />,
      styles: styles.drawer,
      tweenEasing: 'easeInCubic',
      openDrawerOffset: 100
    }

    return (
      <Drawer {...DrawerProps}>
        <ItemList {...data} tabLabel={'Settings'} />
      </Drawer>
    )
  }

  render () {
    const data = this.state.dashboardData
    return this.state.loading ? this.renderLoading() : this.renderDashboard(data)
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
