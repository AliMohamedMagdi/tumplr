import {
  View,
  Image,
  StyleSheet
} from 'react-native'
import Dimensions from 'Dimensions'
import React, { Component } from 'react'
const screen = Dimensions.get('window')

class ProfileBackground extends Component {
  render () {
    const source = {
      height: this.props.height,
      uri: this.props.background
    }
    return (
      <View>
        { !!this.props.background && <Image source={source} /> }
        <View style={styles.background} />
      </View>
    )
  }
}

ProfileBackground.propTypes = {
  background: React.PropTypes.string,
  height: React.PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  background: {
    width: screen.width
  }
})

export default ProfileBackground
