import React, {
  Text,
  View,
  Animated,
  Component,
  StyleSheet,
  ScrollView,
  PanResponder
} from 'react-native'
import Dimensions from 'Dimensions'
// import AudioFooter from './AudioFooter'

// const AnimatedFooter = Animated.createAnimatedComponent(AudioFooter)
const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const {
  width,
  height
} = Dimensions.get('window')
const AlbumWidth = width
const AlbumHeight = Math.round((AlbumWidth / 16) * 9)

class AnimatedAudioView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      _y: 0,
      _translateY: null,
      _scale: new Animated.Value(1),
      position: new Animated.ValueXY()
    }
    this.getScalePosition = this.getScalePosition.bind(this)
    this.getScrollOffset = this.getScrollOffset.bind(this)
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      onPanResponderMove: Animated.event([
        null,
        { dy: this.state.position.y }
      ]).bind(this),

      onPanResponderRelease: function (event, gestureState) {
        this.state.position.flattenOffset()

        if (gestureState.dy >= 100) {
          Animated.timing(this.state.position.y, {
            duration: 200,
            toValue: height
          }).start()
        } else {
          Animated.timing(this.state.position.y, {
            duration: 200,
            toValue: 0
          }).start()
        }
      }.bind(this),

      onPanResponderGrant: function (event, gestureState) {
        this.state.position.y.setOffset(this.state._y)
      }.bind(this)
    })

    this.state._scale = this.state.position.y.interpolate({
      inputRange: [0, height],
      outputRange: [1, 0.71],
      extrapolate: 'clamp'
    })

    this.state._translateY = this.state.position.y.interpolate({
      inputRange: [0, height],
      outputRange: [0, height],
      extrapolate: 'clamp'
    })

    this.state.position.y.addListener(function (value) {
      this.state._y = value.value
      const scaleValue = this.state._scale.__getAnimatedValue()
      const currentwidth = scaleValue * width
      const buffer = ((width - currentwidth) / 2)
      this.state.position.x.setValue(buffer)
    }.bind(this))

    this._opacity = this.state.position.y.interpolate({
      inputRange: [0, height],
      outputRange: [1, 0.1]
    })
  }

  getScalePosition () {
    return {
      transform: [
        { scale: this.state._scale },
        { translateX: this.state.position.x },
        { translateY: this.state._translateY }
      ]
    }
  }

  getScrollOffset () {
    return {
      transform: [
        { translateY: this.state._translateY }
      ],
      opacity: this._opacity
    }
  }

  render () {
    // const AnimatedFooterProps = {
    //   panHandlers: this._panResponder.panHandlers
    // }

    return (
      <View style={styles.container}>
        <AnimatedView {...this._panResponder.panHandlers} style={[styles.albumSize, this.getScalePosition()]}/>
        <AnimatedScrollView style={[styles.container, this.getScrollOffset()]}>
          <View style={styles.stuff}>
            <Text>TESTTTTTTT</Text>
          </View>

          <View style={styles.stuff}>
            <Text>asdklfjaklsdf</Text>
          </View>

          <View style={styles.stuff}>
            <Text>:) :) :)</Text>
          </View>
        </AnimatedScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  albumSize: {
    width: AlbumWidth,
    height: AlbumHeight,
    backgroundColor: 'red'
  },
  stuff: {
    height: 100
  }
})

export default AnimatedAudioView
