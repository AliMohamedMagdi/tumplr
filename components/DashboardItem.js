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
import IonIcon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

class DashboardItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: false,
      reblogged: false
    }
    this.likeSong = this.likeSong.bind(this)
    this.reblogSong = this.reblogSong.bind(this)
  }

  likeSong () {
    this.setState({liked: !this.state.liked})
  }

  reblogSong () {
    this.setState({reblogged: !this.state.reblogged})
  }

  render () {
    const data = this.props
    const reblogDate = data.date.substr(0, data.date.lastIndexOf(' '))

    const AlbumTouchProps = {
      underlayColor: 'transparent',
      onPress: () => console.dir(data)
    }
    const MenuIconProps = {
      name: 'navicon-round',
      color: '#aaa',
      size: 16
    }
    const PlayCountIconProps = {
      name: 'play',
      color: '#616566',
      size: 12
    }
    const LikeIconProps = {
      name: this.state.liked ? 'ios-heart' : 'ios-heart',
      color: this.state.liked ? '#e17d74' : '#aaa',
      size: 18,
      style: {
        marginLeft: 10,
        marginRight: 5
      }
    }
    const ReblogIconProps = {
      name: 'retweet',
      color: this.state.reblogged ? '#4c95ad' : '#aaa',
      size: 18,
      style: {
        marginLeft: 5,
        marginRight: 10
      }
    }
    const LikeTouchProps = {
      underlayColor: 'transparent',
      onPress: this.likeSong
    }
    const ReblogTouchProps = {
      underlayColor: 'transparent',
      onPress: this.reblogSong
    }

    console.log(data)

    return (
      <View style={styles.container}>

        {/* Reblogger information & menu icon */}
        <View style={styles.reblogInfoContainer}>
          <View style={styles.reblogTextContent}>
            <Image
              style={styles.rebloggerAvatar}
              source={require('../assets/crie.png')}
            />
            <Text style={styles.reblogText}>
              <Text style={styles.rebloggerName}> {data.blog_name} </Text>
              {'\n '}
              reblogged {moment(reblogDate, 'YYYY-MM-DD HH:mm:ss').fromNow()}
            </Text>
          </View>
          <IonIcon {...MenuIconProps}/>
        </View>

        {/* Touchable album art cover */}
        <View style={styles.albumContent}>
          <TouchableHighlight {...AlbumTouchProps}>
            <Image
              style={styles.albumArt}
              source={{uri: data.album_art}}
            />
          </TouchableHighlight>
        </View>

        {/* Song Information */}
        <View style={styles.songInfoContainer}>
          <View style={styles.songInfoContent}>
            <Text style={styles.songTitleText}> {data.track_name} </Text>
            <Text style={styles.artistText}> {data.artist} </Text>
          </View>
          <View style={styles.songStatsContent}>
            <View style={styles.playCountContent}>
              <IonIcon {...PlayCountIconProps}>
                <Text style={styles.plays}> {data.plays.toLocaleString()} plays </Text>
              </IonIcon>
            </View>
            <View style={styles.likeReblogContainer}>
              <TouchableHighlight {...LikeTouchProps}>
                <IonIcon {...LikeIconProps}/>
              </TouchableHighlight>
              <Text style={{color: '#999', fontSize: 14}}> {'|'} </Text>
              <TouchableHighlight {...ReblogTouchProps}>
                <EntypoIcon {...ReblogIconProps}/>
              </TouchableHighlight>
            </View>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 2,
    backgroundColor: 'white'
  },
  reblogInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  reblogTextContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rebloggerAvatar: {
    width: 26,
    height: 26,
    marginRight: 3,
    borderWidth: 0.1,
    borderRadius: 13,
    borderColor: 'gainsboro'
  },
  reblogText: {
    fontSize: 10,
    color: 'gray'
  },
  rebloggerName: {
    fontSize: 11,
    color: 'black'
  },
  songInfoContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 5,
    backgroundColor: 'transparent'
  },
  albumContent: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10
  },
  albumArt: {
    height: 100,
    marginLeft: 10,
    marginRight: 10
  },
  songTitleText: {
    fontWeight: '400',
    fontSize: 15
  },
  artistText: {
    fontWeight: '200',
    fontSize: 12
  },
  songInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 5
  },
  songStatsContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  playCountContent: {
    padding: 5,
    paddingRight: 0
  },
  likeReblogContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#aaa'
  }
})

export default DashboardItem
