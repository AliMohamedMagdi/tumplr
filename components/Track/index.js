/**
 *  Dashboard Track Component
 */

'use strict'

import {
  View,
  Image,
  StyleSheet,
  NativeModules,
  TouchableOpacity
} from 'react-native'
import React, { Component } from 'react'

import Dimensions from 'Dimensions'
import queryString from 'query-string'
const screen = Dimensions.get('window')

import Header from './Header'
import Footer from './Footer'
import TrackInfo from './Info'

class Track extends Component {

  parseAudioURI (playerHTML) {
    let src = playerHTML.match(/src="([^"]*)"/)[1]
    let audioKey = decodeURIComponent(src)
    console.log(`Parsing song ${audioKey}`)

    const query = queryString.parse(audioKey.substring(audioKey.indexOf('?')))
    console.log(`Audio file: ${query.audio_file}`)

    // Modify the audio file uri appropriately
    if (query.audio_file.includes('tumblr.com')) {
      let uri = 'http://a.tumblr.com/'
      audioKey = audioKey.substring(audioKey.lastIndexOf('/') + 1, audioKey.lastIndexOf('&'))
      uri += (audioKey.search('o1.mp3') > 0) ? audioKey : audioKey + 'o1.mp3'
      uri = encodeURI(uri)
      console.log(`Playing song @ ${uri}`)
      return uri
    } else {
      let uri = query.audio_file
      uri = encodeURI(uri)
      console.log(`Playing song @ ${uri}`)
      return uri
    }
  }

  render () {
    const {
      id,
      tags,
      blog,
      date,
      auth,
      plays,
      player,
      navigator,
      album_art: albumArt,
      blog_name: blogName,
      note_count: noteCount,
      source_title: sourceTitle,
      artist = 'Unknown Artist',
      track_name: trackName = 'Unknown'
    } = this.props

    const HeaderProps = {
      auth,
      blog,
      blogName,
      navigator,
      sourceTitle,
      reblogDate: date.substr(0, date.lastIndexOf(' ')),
      avatarUri: `https://api.tumblr.com/v2/blog/${blogName}.tumblr.com/avatar/64`
    }

    const AlbumTouchProps = {
      activeOpacity: 0.6,
      onPress: () => NativeModules.AudioPlayer.play(this.parseAudioURI(player))
    }

    const AlbumArtProps = {
      style: [styles.albumArt, {
        width: albumArt ? -1 : screen.width
      }],
      source: albumArt ? {uri: albumArt} : require('../../assets/coverart.png')
    }

    const TrackInfoProps = {
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
          <Image {...AlbumArtProps} />
        </TouchableOpacity>

        {/* Song Information */}
        <TrackInfo {...TrackInfoProps} />

        {/* Footer containing notes information and tags */}
        <Footer {...FooterProps} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 2,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#ccc',
    backgroundColor: 'white'
  },
  albumArt: {
    height: 100
  }
})

Track.propTypes = {
  track_name: React.PropTypes.string,
  artist: React.PropTypes.string,

  id: React.PropTypes.number.isRequired,
  tags: React.PropTypes.array.isRequired,
  blog: React.PropTypes.object.isRequired,
  date: React.PropTypes.string.isRequired,
  plays: React.PropTypes.number.isRequired,
  player: React.PropTypes.string.isRequired,
  blog_name: React.PropTypes.string.isRequired,
  note_count: React.PropTypes.number.isRequired,

  navigator: React.PropTypes.object.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    tokenSecret: React.PropTypes.string.isRequired
  })
}

export default Track
