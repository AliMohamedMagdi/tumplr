/**
 *  Dashboard Song Item Component
 */

'use strict'

import React, {
  View,
  Image,
  Component,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import DashboardHeader from './DashboardHeader.js'
import DashboardSongInfo from './DashboardSongInfo.js'
import DashboardFooter from './DashboardFooter.js'
// const AudioPlayer = React.NativeModules.AudioPlayer

class DashboardItem extends Component {

  parseAudioURI (playerElement) {
    console.log('in parseAudioURI')
    // return playerElement.match(/src=\"([^"]*)\"/)[1]
  }

  render () {
    const data = this.props

    const DashboardHeaderProps = {
      blogName: data.blog_name,
      reblogDate: data.date.substr(0, data.date.lastIndexOf(' ')),
      avatarUri: `http://api.tumblr.com/v2/blog/${data.blog_name}.tumblr.com/avatar/64`
    }

    const AlbumTouchProps = {
      activeOpacity: 0.6,
      onPress: () => this.parseAudioURI(data.player)
      // onPress: () => AudioPlayer.play(data.track_name)
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

    return (
      <View style={styles.container}>

        {/* Reblogger information & menu icon */}
        <DashboardHeader {...DashboardHeaderProps}/>

        {/* Album art cover */}
        <TouchableOpacity {...AlbumTouchProps}>
          <Image
            style={styles.albumArt}
            source={{uri: data.album_art}}
          />
        </TouchableOpacity>

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
