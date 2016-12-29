/**
 * Dashboard view container
 */

'use strict'

import React, { Component } from 'react'
import OAuthSimple from 'oauthsimple'

import TrackList from '../../components/Track/List'

class DashboardView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      offset: 0,
      loading: true
    }
    this.limit = 20
  }

  componentWillMount () {
    this.fetchData()
  }

  closeSideMenu () {
    console.log('close')
    this._drawer.close()
  }

  openSideMenu () {
    console.log('open')
    this._drawer.open()
  }

  async fetchData () {
    // Retrieve user info and switch to the dashboard view
    try {
      const data = await (await fetch(this.signDashboardUrl())).json()
      this.setState({
        loading: false,
        offset: this.state.offset + this.limit,
        posts: [ ...this.state.posts, ...data.response.posts ]
      })
    } catch (err) {
      console.log(err)
    }
  }

  loadMore () {
    this.setState({ loading: true })
    this.fetchData()
  }

  signDashboardUrl () {
    // Construct oauth signed url to retrieve user dashboard data
    const oauth = new OAuthSimple(this.props.token, this.props.tokenSecret)
    const options = {
      action: 'GET',
      path: 'https://api.tumblr.com/v2/user/dashboard',
      parameters: {
        type: 'audio',
        limit: this.limit,
        reblog_info: true,
        offset: this.state.offset
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

  render () {
    return (
      <TrackList
        tracks={this.state.posts}
        loading={this.state.loading}
        navigator={this.props.navigator}
        loadMore={() => this.loadMore()}
        auth={{
          key: this.props.creds.key,
          sec: this.props.creds.sec,
          token: this.props.token,
          tokenSecret: this.props.tokenSecret
        }}
      />
    )
  }
};

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
