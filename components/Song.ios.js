/**
 *  Song List Item Component
 */

'use strict'

import React, {
  Text,
  View,
  Image,
  Component,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class Song extends Component {

  render () {
    const data = this.props

    const LikeIconProps = {
      name: data.likes ? 'ios-heart' : 'ios-heart',
      color: data.likes ? '#e17d74' : '#bbb',
      size: 9
    }

    return (
      <TouchableHighlight key={data.id} onPress={() => console.dir(data)}>
        <View style={styles.item}>

          <Image
            style={styles.albumArt}
            source={{uri: data.album_art}}
          />

          <View style={styles.textContainer}>
            <Text style={styles.songName}>
              {data.track_name}
            </Text>
            <Text style={styles.artistName}>
              {data.artist}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <View stlye={styles.textContainer}>
              <Icon {...PlayIconProps}>
                <Text style={styles.numbers}> {data.plays} </Text>
              </Icon>
            </View>
            <Icon {...NoteIconProps}>
              <Text style={styles.numbers}> {data.note_count} </Text>
            </Icon>
            <Icon {...LikeIconProps}/>
          </View>

        </View>
      </TouchableHighlight>
    )
  }
}

const PlayIconProps = {
  name: 'play',
  color: '#bbb',
  size: 10
}

const NoteIconProps = {
  name: 'ios-chatbubble',
  color: '#bbb',
  size: 10
}

const styles = StyleSheet.create({
  item: {
    paddingRight: 5,
    flexDirection: 'row',
    borderColor: 'gainsboro',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  albumArt: {
    backgroundColor: '#ddd',
    width: 100,
    height: 100,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  songName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '100',
    flexDirection: 'row'
  },
  artistName: {
    fontSize: 10,
    fontWeight: '100'
  },
  numbers: {
    fontSize: 10,
    color: '#666',
    fontWeight: '300'
  }
})

export default Song
