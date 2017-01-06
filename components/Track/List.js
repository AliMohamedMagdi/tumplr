/**
 *  Dashboard track list component
 */

'use strict'

import {
  View,
  ListView,
  StyleSheet,
  RecyclerViewBackedScrollView
} from 'react-native'
import React, { Component } from 'react'
import GiftedSpinner from 'react-native-gifted-spinner'
import Dimensions from 'Dimensions'

import colors from '../../scripts/colors'
import Track from '../../components/Track'
const window = Dimensions.get('window')

class TrackList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      pagination: {},
      dataSource: null,
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
    this.loadTracks = this.loadTracks.bind(this)
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

  renderRow (data) {
    if (data.type === 'loading') {
      return data.loading ? <GiftedSpinner style={styles.spinner} /> : null
    } else {
      return <Track {...data} />
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          enableEmptySections
          removeClippedSubviews={false}
          dataSource={this.state.dataSource}
          renderRow={data => this.renderRow(data)}
          onEndReached={() => this.props.loadMore()}
          initialListSize={this.props.tracks.length}
          renderScrollComponent={data => <RecyclerViewBackedScrollView {...data} />}
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
  },
  spinner: {
    paddingTop: 50,
    paddingBottom: 50
  }
})

TrackList.propTypes = {
  tracks: React.PropTypes.array.isRequired,
  loading: React.PropTypes.bool.isRequired,
  loadMore: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.object.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    tokenSecret: React.PropTypes.string.isRequired
  })
}

export default TrackList
