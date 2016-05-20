import React, {
  Text,
  View,
  Animated,
  Component,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

const ACTION_TIMER = 600

class SongInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: false,
      reblogged: false,
      pressAction: new Animated.Value(0)
    }

    this.likeSong = this.likeSong.bind(this)
    this.reblogSong = this.reblogSong.bind(this)
    this.handleIconPressIn = this.handleIconPressIn.bind(this)
    this.handleIconPressOut = this.handleIconPressOut.bind(this)
    this.animationActionComplete = this.animationActionComplete.bind(this)
  }

  componentWillMount () {
    this._value = 0
    this.state.pressAction.addListener((evt) => { this._value = evt.value })
  }

  animationActionComplete () {
    if (this._value === 1) {
      console.log('WHOA')
    }
  }

  handleIconPressIn () {
    Animated.timing(this.state.pressAction, {
      duration: ACTION_TIMER,
      toValue: 1
    }).start(this.animationActionComplete)
  }

  handleIconPressOut () {
    Animated.timing(this.state.pressAction, {
      duration: this._value * ACTION_TIMER,
      toValue: 0
    }).start()
  }

  likeSong () {
    this.setState({ liked: !this.state.liked })
  }

  reblogSong () {
    this.setState({ reblogged: !this.state.reblogged })
  }

  render () {
    const ReblogTouchProps = {
      activeOpacity: 0.5,
      underlayColor: 'transparent',
      onPress: this.reblogSong,
      onPressIn: this.handleIconPressIn,
      onPressOut: this.handleIconPressOut
    }

    const LikeTouchProps = {
      activeOpacity: 0.5,
      underlayColor: 'transparent',
      onPress: this.likeSong
    }

    const LikeIconProps = {
      size: 24,
      style: { textAlign: 'center' },
      name: this.state.liked ? 'ios-heart' : 'ios-heart',
      color: this.state.liked ? '#e17d74' : '#F6FCFF'
    }

    const ReblogIconProps = {
      size: 24,
      name: 'retweet',
      style: { textAlign: 'center' },
      color: this.state.reblogged ? '#4c95ad' : '#F6FCFF'
    }

    return (
      <View style={styles.songInfoContainer}>

        {/* Track title and artist name */}
        <View style={styles.songInfoContent}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            <Text style={styles.songTitleText}> {this.props.trackName} </Text>
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            <Text style={styles.artistText}> {this.props.artist} </Text>
          </ScrollView>
        </View>

        <View style={styles.buttonsContainer}>
          {/* Like button */}
          <View style={styles.likeContainer}>
            <TouchableHighlight {...LikeTouchProps}>
              <IonIcon {...LikeIconProps} />
            </TouchableHighlight>
          </View>

          {/* Reblog button */}
          <View style={styles.reblogContainer}>
            <TouchableHighlight {...ReblogTouchProps}>
              <Animated.View>
                <EntypoIcon {...ReblogIconProps} />
              </Animated.View>
            </TouchableHighlight>
          </View>
        </View>

      </View>
    )
  }
}

SongInfo.propTypes = {
  trackName: React.PropTypes.string,
  artist: React.PropTypes.string,
  plays: React.PropTypes.number
}

const styles = StyleSheet.create({
  songInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  songInfoContent: {
    flex: 2,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  albumContent: {
    flex: 1,
    flexDirection: 'column'
  },
  songTitleText: {
    fontWeight: '500',
    fontSize: 14
  },
  artistText: {
    paddingTop: 5,
    fontWeight: '400',
    fontSize: 12
  },
  playCountContent: {
    paddingTop: 5,
    paddingRight: 0
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  likeContainer: {
    flex: 1,
    paddingTop: 3,
    marginRight: 5,
    alignSelf: 'center',
    borderBottomWidth: 4,
    borderRadius: 2,
    borderColor: '#eeb1aa',
    backgroundColor: '#f4cbc6'
  },
  reblogContainer: {
    flex: 1,
    paddingTop: 3,
    marginRight: 5,
    alignSelf: 'center',
    borderBottomWidth: 4,
    borderRadius: 2,
    borderColor: '#89bccd',
    backgroundColor: '#bddae3'
  }
})

export default SongInfo
