import {
  View,
  Image,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'

class ProfileBackground extends Component {
  render () {
    return (
      <View>
        <Image source={{ height: this.props.height, uri: this.props.background }} />
        <View style={styles.background} />
      </View>
    )
  }
}

ProfileBackground.propTypes = {
  background: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  background: {
    width: window.width
  }
})

export default ProfileBackground
