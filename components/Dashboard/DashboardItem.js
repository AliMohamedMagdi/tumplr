/**
 *  Dashboard Song Item Component
 */

'use strict'

import React, {
  View,
  Image,
  Component,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import DashboardHeader from './DashboardHeader.js'
import DashboardSongInfo from './DashboardSongInfo.js'
import DashboardFooter from './DashboardFooter.js'

class DashboardItem extends Component {

  render () {
    const data = this.props

    const DashboardHeaderProps = {
      blogName: data.blog_name,
      reblogDate: data.date.substr(0, data.date.lastIndexOf(' ')),
      avatarUri: `http://api.tumblr.com/v2/blog/${data.blog_name}.tumblr.com/avatar/64`
    }

    const AlbumTouchProps = {
      underlayColor: 'transparent'
    }

    const DashboardSongInfoProps = {
      trackName: data.track_name,
      artist: data.artist,
      plays: data.plays
    }

    const DashboardFooterProps = {
      id: data.id,
      tags: data.tags,
      noteCount: data.note_count
    }

    console.log(data)

    return (
      <View style={styles.container}>

        {/* Reblogger information & menu icon */}
        <DashboardHeader {...DashboardHeaderProps}/>

        {/* Album art cover */}
        <View style={styles.albumContent}>
          <TouchableHighlight {...AlbumTouchProps}>
            <Image
              style={styles.albumArt}
              source={{uri: data.album_art}}
            />
          </TouchableHighlight>
        </View>

        {/* Song Information */}
        <DashboardSongInfo {...DashboardSongInfoProps}/>

        {/* Footer containing notes information and tags */}
        <DashboardFooter {...DashboardFooterProps}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 2,
    backgroundColor: 'white'
  },
  albumArt: {
    height: 100
  }
})

export default DashboardItem
