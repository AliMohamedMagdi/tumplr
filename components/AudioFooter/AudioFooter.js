import React, {
  View,
  Component,
  StyleSheet
} from 'react-native'
import Dimensions from 'Dimensions'

const {
  width
} = Dimensions.get('window')
const AlbumWidth = width
const AlbumHeight = Math.round((AlbumWidth / 16) * 9)

class AudioFooter extends Component {
  render () {
    return (
      <View style={styles.albumSize} {...this.props.panHandlers}/>
    )
  }
}

const styles = StyleSheet.create({
  albumSize: {
    width: AlbumWidth,
    height: AlbumHeight,
    backgroundColor: 'red'
  }
})

export default AudioFooter
