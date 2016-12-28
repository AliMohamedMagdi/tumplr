/*
 * Profile main component
 */

import {
  View,
  ListView,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import Dimensions from 'Dimensions'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

const screen = Dimensions.get('window')
import colors from '../../scripts/colors'
import LoadingView from '../../containers/LoadingView'
import Track from '../Track'

import ProfileHeader from './Header'
import ProfileBackground from './Background'
import ProfileForeground from './Foreground'

class Profile extends Component {

  constructor (props) {
    super(props)

    this.backgroundColor = props.blog.theme ? props.blog.theme.background_color : colors.nightshade
    this.state = {
      dataSource: null
    }

    this.renderTrackList = this.renderTrackList.bind(this)
    this.renderLoading = this.renderLoading.bind(this)
    this.renderProfile = this.renderProfile.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    // Set the list view datasource upon new data
    if (this.props.loading && !nextProps.loading) {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
      const rows = this.generateRows(nextProps.posts)
      this.setState({
        dataSource: ds.cloneWithRows(rows)
      })
    }
  }

  generateRows (posts) {
    return posts.map(post => ({
      blog: this.props.blog,
      auth: this.props.auth,
      navigator: this.props.navigator,
      ...post
    }))
  }

  renderTrackList (event) {
    const coverHeight = screen.height / 4
    const headerColor = this.backgroundColor
    const avatar = `https://api.tumblr.com/v2/blog/${this.props.blog.name}.tumblr.com/avatar/512`

    let backgroundImage = ''
    if (this.props.blog.theme && Object.keys(this.props.blog.theme).length) {
      backgroundImage = this.props.blog.theme.header_image || ''
    }

    return (
      <ParallaxScrollView
        onScroll={() => {}}
        backgroundSpeed={10}
        stickyHeaderHeight={65}
        contentBackgroundColor={headerColor}
        parallaxHeaderHeight={coverHeight}
        backgroundColor={colors.hex2rgba(headerColor)}
        renderStickyHeader={() => <View style={styles.stickyHeader} />}
        renderBackground={() => <ProfileBackground background={backgroundImage} height={coverHeight} />}
        renderForeground={() => <ProfileForeground avatar={avatar} color={headerColor} />}
      />
    )
  }

  renderLoading () {
    return <LoadingView backgroundColor={this.backgroundColor} />
  }

  renderProfile () {
    const backgroundColor = { backgroundColor: this.backgroundColor }
    return (
      <View style={[styles.container, backgroundColor]}>
        <ListView
          ref='ListView'
          enableEmptySections
          style={{ overflow: 'hidden' }}
          renderRow={data => <Track {...data} />}
          renderHeader={() => <ProfileHeader {...this.props.blog} />}
          renderScrollComponent={this.renderTrackList}
          dataSource={this.state.dataSource}
        />
      </View>
    )
  }

  render () {
    return this.props.loading ? this.renderLoading() : this.renderProfile()
  }
}

Profile.propTypes = {
  blog: React.PropTypes.object,
  navigator: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  posts: React.PropTypes.array.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    tokenSecret: React.PropTypes.string.isRequired
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
})

export default Profile
