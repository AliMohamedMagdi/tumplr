/**
 * Dashboard view container
 */

'use strict'

// import {
//   StyleSheet
// } from 'react-native'
import React, { Component } from 'react'

import OAuthSimple from 'oauthsimple'
import LoadingView from '../LoadingView'
// import Drawer from 'react-native-drawer'

import TrackList from '../../components/Track/List'

class DashboardView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      loading: true
    }
  }

  componentWillMount () {
    this.fetchData(this.signDashboardUrl())
  }

  closeSideMenu () {
    console.log('close')
    this._drawer.close()
  }

  openSideMenu () {
    console.log('open')
    this._drawer.open()
  }

  async fetchData (signedUrl) {
    // Retrieve user info and switch to the dashboard view
    try {
      const data = await (await fetch(signedUrl)).json()
      this.setState({
        loading: false,
        posts: data.response.posts
      })
    } catch (err) {
      console.log(err)
    }
  }

  signDashboardUrl () {
    // Construct oauth signed url to retrieve user dashboard data
    const oauth = new OAuthSimple(this.props.token, this.props.tokenSecret)
    const options = {
      action: 'GET',
      path: 'https://api.tumblr.com/v2/user/dashboard',
      parameters: {
        limit: 20,
        type: 'audio',
        reblog_info: true
      },
      signatures: {
        consumer_key: this.props.creds.key,
        shared_secret: this.props.creds.sec,
        oauth_token: this.props.token,
        oauth_secret: this.props.tokenSecret
      }
    }
    return oauth.sign(options).signed_url
  }

  renderLoading () {
    return <LoadingView />
  }

  renderDashboardView () {
    // const DrawerProps = {
    //   ref: ref => { this._drawer = ref },
    //   content: <SideMenu closeDrawer={this.closeSideMenu} />,
    //   style: styles.drawer,
    //   tweenEasing: 'easeInCubic',
    //   openDrawerOffset: 100
    // }
    // return (
    //   <Drawer {...DrawerProps}>
    //     <ItemList {...ItemListProps} />
    //   </Drawer>
    // )
    return (
      <TrackList
        tracks={this.state.posts}
        navigator={this.props.navigator}
        auth={{
          key: this.props.creds.key,
          sec: this.props.creds.sec,
          token: this.props.token,
          tokenSecret: this.props.tokenSecret
        }}
      />
    )
  }

  render () {
    return this.state.loading ? this.renderLoading() : this.renderDashboardView()
  }
};

// const styles = StyleSheet.create({
//   drawer: {
//     flex: 1,
//     shadowColor: '#000000',
//     shadowOpacity: 0.8,
//     shadowRadius: 3
//   }
// })

DashboardView.propTypes = {
  token: React.PropTypes.string.isRequired,
  tokenSecret: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default DashboardView
