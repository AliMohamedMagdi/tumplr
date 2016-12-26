import {
  Text,
  View,
  Animated,
  StyleSheet,
  ScrollView
} from 'react-native'
import React, { Component } from 'react'

import { LikeButton, ReblogButton } from '../../components/Buttons'

const ACTION_TIMER = 600

class TrackInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: false,
      reblogged: false,
      pressAction: new Animated.Value(0)
    }

    this.likeSong = this.likeSong.bind(this)
    this.reblogSong = this.reblogSong.bind(this)
    this.handleReblogPressIn = this.handleReblogPressIn.bind(this)
    this.handleReblogPressOut = this.handleReblogPressOut.bind(this)
    this.animationActionComplete = this.animationActionComplete.bind(this)
  }

  componentWillMount () {
    this._value = 0
    this.state.pressAction.addListener(evt => { this._value = evt.value })
  }

  likeSong () {
    this.setState({ liked: !this.state.liked })
  }

  animationActionComplete () {
    if (this._value === 1) {
      console.log('WHOA')
    }
  }

  handleReblogPressIn () {
    Animated.timing(this.state.pressAction, {
      duration: ACTION_TIMER,
      toValue: 1
    }).start(this.animationActionComplete)
  }

  handleReblogPressOut () {
    this.setState({ reblogBtnDown: false })
    Animated.timing(this.state.pressAction, {
      duration: this._value * ACTION_TIMER,
      toValue: 0
    }).start()
  }

  reblogSong () {
    this.setState({ reblogged: !this.state.reblogged })
  }

  render () {
    return (
      <View style={styles.container}>

        {/* Track title and artist name */}
        <View style={styles.content}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.songTitleText}> {this.props.trackName} </Text>
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.artistText}> {this.props.artist} </Text>
          </ScrollView>
        </View>

        {/* Like & Reblog buttons */}
        <View style={styles.buttons}>
          <LikeButton
            liked={this.state.liked}
            onPress={() => this.likeSong()} />
          <ReblogButton
            reblogged={this.state.reblogged}
            onPress={() => this.reblogSong()}
            onPressIn={() => this.handleReblogPressIn()}
            onPressOut={() => this.handleReblogPressOut()} />
        </View>

      </View>
    )
  }
}

TrackInfo.propTypes = {
  trackName: React.PropTypes.string,
  artist: React.PropTypes.string,
  plays: React.PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    flex: 2,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
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
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default TrackInfo
