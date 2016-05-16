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
import Header from './Header.js'
import SongInfo from './SongInfo.js'
import Footer from './Footer.js'
const AudioPlayer = React.NativeModules.AudioPlayer

class Item extends Component {

  parseAudioURI (playerElement) {
    let src = playerElement.match(/src=\"([^"]*)\"/)[1]
    let audioKey = decodeURIComponent(src)
    let uri = 'http://a.tumblr.com/'
    audioKey = audioKey.substring(audioKey.lastIndexOf('/') + 1, audioKey.lastIndexOf('&'))
    uri += (audioKey.search('o1.mp3') > 0) ? audioKey : audioKey + 'o1.mp3'
    return uri
  }

  render () {
    const data = this.props

    const HeaderProps = {
      blogName: data.blog_name,
      reblogDate: data.date.substr(0, data.date.lastIndexOf(' ')),
      avatarUri: `http://api.tumblr.com/v2/blog/${data.blog_name}.tumblr.com/avatar/64`
    }

    const AlbumTouchProps = {
      activeOpacity: 0.6,
      onPress: () => AudioPlayer.play(this.parseAudioURI(data.player))
    }

    const SongInfoProps = {
      trackName: data.track_name,
      artist: data.artist,
      plays: data.plays
    }

    const FooterProps = {
      id: data.id,
      tags: data.tags,
      noteCount: data.note_count
    }

    return (
      <View style={styles.container}>

        {/* Reblogger information & menu icon */}
        <Header {...HeaderProps} />

        {/* Album art cover */}
        <TouchableOpacity {...AlbumTouchProps}>
          <Image
            style={styles.albumArt}
            source={{uri: data.album_art}}
          />
        </TouchableOpacity>

        {/* Song Information */}
        <SongInfo {...SongInfoProps} />

        {/* Footer containing notes information and tags */}
        <Footer {...FooterProps} />

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

export default Item
