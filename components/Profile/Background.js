import {
  View,
  Image,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'

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
    width: window.width
  }
})

export default ProfileBackground
