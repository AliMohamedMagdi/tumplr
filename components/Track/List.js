/**
 *  Dashboard track list component
 */

'use strict'

import {
  View,
  ListView,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import Dimensions from 'Dimensions'

import colors from '../../scripts/colors'
const window = Dimensions.get('window')

class TrackList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dataSource: null,
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
    this.loadTracks = this.loadTracks.bind(this)
    this.getListView = this.getListView.bind(this)
  }

  componentWillMount () {
    this.loadTracks(this.props.tracks, this.props.loading)
  }

  componentWillReceiveProps (nextProps) {
    // Update data source upon toggled loading state or added tracks
    if (this.props.loading !== nextProps.loading || this.props.tracks.length !== nextProps.tracks.length) {
      this.loadTracks(nextProps.tracks, nextProps.loading)
    }
  }

  getListView () {
    return this.refs['list-view']
  }

  loadTracks (posts, loading) {
    const tracks = posts.map((track, i) => ({
      navigator: this.props.navigator,
      auth: this.props.auth,
      blog: this.props.blog,
      index: i,
      ...track
    }))
    this.setState({
      dataSource: this.state.ds.cloneWithRows([ ...tracks, { loading, type: 'loading' } ])
    })
  }

  render () {
    const { backgroundColor } = this.props
    return (
      <View style={[ styles.container, { backgroundColor } ]}>
        <ListView
          ref='list-view'
          style={styles.list}
          enableEmptySections
          removeClippedSubviews={false}
          renderRow={this.props.render.row}
          dataSource={this.state.dataSource}
          onEndReached={this.props.loadMore}
          renderHeader={this.props.render.header}
          initialListSize={this.props.tracks.length}
          renderScrollComponent={this.props.render.scrollComponent}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: window.height
  },
  list: {
    paddingTop: 15,
    backgroundColor: colors.nightshade
  }
})

TrackList.defaultProps = {
  blog: {},
  onEndReached: () => {},
  backgroundColor: colors.nightshade,
  render: {
    row: () => {},
    header: () => {},
    scrollComponent: () => {}
  }
}

TrackList.propTypes = {
  tracks: React.PropTypes.array.isRequired,
  loading: React.PropTypes.bool.isRequired,
  navigator: React.PropTypes.object.isRequired,
  backgroundColor: React.PropTypes.string,
  loadMore: React.PropTypes.func,
  blog: React.PropTypes.object,
  render: React.PropTypes.shape({
    row: React.PropTypes.func,
    header: React.PropTypes.func,
    scrollComponent: React.PropTypes.func
  }),
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    tokenSecret: React.PropTypes.string.isRequired
  })
}

export default TrackList
