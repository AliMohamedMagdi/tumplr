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

  constructor (props) {
    super(props)
    this.likeSong = this.likeSong.bind(this)
    this.state = {
      liked: false
    }
  }

  likeSong () {
    this.setState({liked: !this.state.liked})
  }

  render () {
    const data = this.props
    const LikeIconProps = {
      name: this.state.liked ? 'ios-heart' : 'ios-heart',
      color: this.state.liked ? '#e17d74' : '#bbb',
      size: 18
    }
    const LikeTouchProps = {
      underlayColor: 'transparent',
      style: styles.likeIcon,
      onPress: this.likeSong
    }

    return (
      <View style={styles.item} key={data.id}>

        {/* Touchable album art cover */}
        <TouchableHighlight onPress={() => console.dir(data)}>
          <Image
            style={styles.albumArt}
            source={{uri: data.album_art}}
          />
        </TouchableHighlight>

        {/* Container holding song information */}
        <View style={styles.textContainer}>
          <Text style={styles.songName}>
            {data.track_name}
          </Text>
          <Text style={styles.artistName}>
            {data.artist}
          </Text>
        </View>

        {/* Container holding tumblr/reblog information */}
        <View style={styles.textContainer}>
          <View stlye={styles.textContainer}>
            <Icon {...PlayIconProps}>
              <Text style={styles.numbers}> {data.plays.toLocaleString()} </Text>
            </Icon>
          </View>
          <Icon {...NoteIconProps}>
            <Text style={styles.numbers}> {data.note_count.toLocaleString()} </Text>
          </Icon>
          <TouchableHighlight {...LikeTouchProps}>
            <Icon {...LikeIconProps}/>
          </TouchableHighlight>
        </View>

      </View>
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
    width: 70,
    height: 70,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: '#ddd'
  },
  textContainer: {
    flex: 1,
    marginLeft: 10
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
  },
  likeIcon: {
    alignSelf: 'stretch'
  }
})

export default Song
