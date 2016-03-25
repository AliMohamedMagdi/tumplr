/**
 *  Dashboard Song Item Component
 */

'use strict'

import React, {
  View,
  Text,
  Image,
  Component,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

class DashboardItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: false
    }
  }

  likeSong () {
    this.setState({liked: !this.state.liked})
  }

  render () {
    const data = this.props
    console.log(data)

    const reblogDate = data.date.substr(0, data.date.lastIndexOf(' '))

    const AlbumTouchProps = {
      underlayColor: 'transparent',
      onPress: () => console.dir(data)
    }
    const HappyIconProps = {
      name: 'retweet',
      color: '#aaa',
      size: 11
    }

    return (
      <View>
        <View style={styles.albumContent}>
          {/* Touchable album art cover */}
          <TouchableHighlight {...AlbumTouchProps}>
            <Image
              style={styles.albumArt}
              source={{uri: data.album_art}}
            />
          </TouchableHighlight>

          <View style={styles.reblogContent}>
            {/* Information of the reblogger */}
            <Text style={styles.reblogText}>
              {data.blog_name} <EntypoIcon {...HappyIconProps}/> {moment(reblogDate, 'YYYY-MM-DD HH:mm:ss').fromNow()}
            </Text>
            <Image
              style={styles.rebloggerAvatar}
              source={require('../assets/crie.png')}
            />
          </View>
        </View>

        <View style={styles.songContent}>
          <Text style={styles.songTitleText}>
            {data.track_name}
          </Text>
          <Text style={styles.artistText}>
            {data.artist}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reblogContent: {
    flex: 1,
    top: -25,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  rebloggerAvatar: {
    width: 50,
    height: 50,
    marginRight: 3,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'gainsboro'
  },
  reblogText: {
    fontSize: 10,
    color: 'gray',
    marginTop: 30,
    marginLeft: 5
  },
  songContent: {
    flex: 1,
    top: -20,
    padding: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  albumContent: {
    flex: 1,
    flexDirection: 'column',
    bottom: -20
  },
  albumArt: {
    height: 100
  },
  songTitleText: {
    fontWeight: '300',
    fontSize: 14
  },
  artistText: {
    fontWeight: '100',
    fontSize: 10
  }
})

export default DashboardItem
