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
    console.log(`Playing song @ ${uri}`)
    return uri
  }

  render () {
    const {
      id,
      tags,
      date,
      plays,
      player,
      artist,
      album_art: albumArt,
      blog_name: blogName,
      track_name: trackName,
      note_count: noteCount
    } = this.props

    const HeaderProps = {
      blogName: blogName,
      reblogDate: date.substr(0, date.lastIndexOf(' ')),
      avatarUri: `http://api.tumblr.com/v2/blog/${blogName}.tumblr.com/avatar/64`
    }

    const AlbumTouchProps = {
      activeOpacity: 0.6,
      onPress: () => AudioPlayer.play(this.parseAudioURI(player))
    }

    const SongInfoProps = {
      trackName: trackName,
      artist: artist,
      plays: plays
    }

    const FooterProps = {
      id: id,
      tags: tags,
      noteCount: noteCount
    }

    return (
      <View style={styles.container}>

        {/* Reblogger information & menu icon */}
        <Header {...HeaderProps} />

        {/* Album art cover */}
        <TouchableOpacity {...AlbumTouchProps}>
          <Image
            style={styles.albumArt}
            source={{uri: albumArt}}
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

Item.propTypes = {
  id: React.PropTypes.number.isRequired,
  tags: React.PropTypes.array.isRequired,
  date: React.PropTypes.string.isRequired,
  plays: React.PropTypes.number.isRequired,
  player: React.PropTypes.string.isRequired,
  artist: React.PropTypes.string.isRequired,
  blog_name: React.PropTypes.string.isRequired,
  track_name: React.PropTypes.string.isRequired,
  note_count: React.PropTypes.number.isRequired
}

export default Item
