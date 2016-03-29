import React, {
  Text,
  View,
  Component,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import * as format from '../../scripts/format.js'
import IonIcon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

class DashboardSongInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: false,
      reblogged: false
    }
  }

  render () {
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

    return (
      <View style={styles.songInfoContainer}>
        <View style={styles.songInfoContent}>
          <Text style={styles.songTitleText}> {this.props.trackName} </Text>
          <Text style={styles.artistText}> {this.props.artist} </Text>
        </View>
        <View style={styles.songStatsContent}>
          <View style={styles.playCountContent}>
            <IonIcon {...PlayCountIconProps}>
              <Text style={styles.plays}> {format.insertCommas(this.props.plays)} plays </Text>
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
    )
  }
}

DashboardSongInfo.propTypes = {
  trackName: React.PropTypes.string,
  artist: React.PropTypes.string,
  plays: React.PropTypes.number
}

const PlayCountIconProps = {
  name: 'play',
  color: '#616566',
  size: 12
}

const ReblogTouchProps = {
  activeOpacity: 0.5,
  underlayColor: 'transparent',
  onPress: this.reblogSong
}

const LikeTouchProps = {
  activeOpacity: 0.5,
  underlayColor: 'transparent',
  onPress: this.likeSong
}

const styles = StyleSheet.create({
  songInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 5
  },
  songInfoContent: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 5,
    backgroundColor: 'transparent'
  },
  albumContent: {
    flex: 1,
    flexDirection: 'column'
  },
  songTitleText: {
    fontWeight: '500',
    fontSize: 15
  },
  artistText: {
    fontWeight: '400',
    fontSize: 12
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

export default DashboardSongInfo
