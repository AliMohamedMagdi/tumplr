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
import GiftedSpinner from 'react-native-gifted-spinner'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

const window = Dimensions.get('window')
import colors from '../../scripts/colors'
import Track from '../Track'

import ProfileHeader from './Header'
import ProfileBackground from './Background'
import ProfileForeground from './Foreground'

class Profile extends Component {

  constructor (props) {
    super(props)

    this.backgroundColor = props.blog.theme ? props.blog.theme.background_color : colors.nightshade
    this.state = {
      dataSource: null,
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }

    this.onScroll = this.onScroll.bind(this)
    this.renderTrackList = this.renderTrackList.bind(this)
  }

  componentWillMount () {
    this.loadTracks(this.props.posts, this.props.loading)
  }

  componentWillReceiveProps (nextProps) {
    // Update data source upon toggled loading state or added tracks
    if (this.props.loading !== nextProps.loading || this.props.posts.length !== nextProps.posts.length) {
      this.loadTracks(nextProps.posts, nextProps.loading)
    }
  }

  loadTracks (posts, loading) {
    const tracks = posts.map(track => ({
      navigator: this.props.navigator,
      auth: this.props.auth,
      ...track
    }))
    this.setState({
      dataSource: this.state.ds.cloneWithRows([ ...tracks, { loading, type: 'loading' } ])
    })
  }

  onScroll (event) {
    const {
      contentLength,
      visibleLength
    } = this.refs.ListView.scrollProperties
    const yPos = event.nativeEvent.contentOffset.y
    const isEndReached = yPos >= contentLength - visibleLength

    if (!this.props.loading && isEndReached) {
      this.props.loadMore()
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
    const coverHeight = window.height / 4
    const headerColor = this.backgroundColor
    const avatar = `https://api.tumblr.com/v2/blog/${this.props.blog.name}.tumblr.com/avatar/512`

    let backgroundImage = ''
    if (this.props.blog.theme && Object.keys(this.props.blog.theme).length) {
      backgroundImage = this.props.blog.theme.header_image || ''
    }

    return (
      <ParallaxScrollView
        backgroundSpeed={10}
        stickyHeaderHeight={65}
        onScroll={this.onScroll}
        parallaxHeaderHeight={coverHeight}
        contentBackgroundColor={headerColor}
        backgroundColor={colors.hex2rgba(headerColor)}
        contentContainerStyle={styles.contentContainer}
        renderStickyHeader={() => <View style={styles.stickyHeader} />}
        renderBackground={() => <ProfileBackground background={backgroundImage} height={coverHeight} />}
        renderForeground={() => <ProfileForeground avatar={avatar} color={headerColor} />}
      />
    )
  }

  renderRow (data) {
    if (data.type === 'loading') {
      return data.loading ? <GiftedSpinner style={styles.spinner} /> : null
    } else {
      return <Track {...Object.assign({}, data, { blog: this.props.blog })} />
    }
  }

  render () {
    const backgroundColor = { backgroundColor: this.backgroundColor }
    return (
      <View style={[styles.container, backgroundColor]}>
        <ListView
          ref='ListView'
          enableEmptySections
          removeClippedSubviews={false}
          dataSource={this.state.dataSource}
          renderRow={data => this.renderRow(data)}
          initialListSize={this.props.posts.length}
          renderHeader={() => <ProfileHeader {...this.props.blog} />}
          renderScrollComponent={this.renderTrackList}
        />
      </View>
    )
  }
}

Profile.propTypes = {
  blog: React.PropTypes.object,
  navigator: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  posts: React.PropTypes.array.isRequired,
  loadMore: React.PropTypes.func.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    tokenSecret: React.PropTypes.string.isRequired
  })
}

const styles = StyleSheet.create({
  container: {
    height: window.height
  },
  contentContainer: {
    flex: 1
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
})

export default Profile
