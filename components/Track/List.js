/**
 *  Dashboard track list component
 *
 *  TODO:
 *    Add state management (navigator/track list)
 *    Implement endless scrolling
 */

'use strict'

import {
  ListView,
  StyleSheet,
  RecyclerViewBackedScrollView
} from 'react-native'
import React, { Component } from 'react'

import Track from '../../components/Track'

class TrackList extends Component {

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(props.tracks.map(track => ({
        auth: props.auth,
        navigator: props.navigator,
        ...track
      })))
    }
  }

  render () {
    return (
      <ListView
        style={styles.list}
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={data => <Track {...data} />}
        initialListSize={this.props.tracks.length}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 15,
    backgroundColor: '#3a3f41'
  }
})

TrackList.propTypes = {
  tracks: React.PropTypes.array.isRequired,
  navigator: React.PropTypes.object.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    tokenSecret: React.PropTypes.string.isRequired
  })
}

export default TrackList
