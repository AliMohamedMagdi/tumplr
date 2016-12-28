import {
  View,
  Image,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import colors from '../../scripts/colors'

const AVATAR_SIZE = 85

class ProfileForeground extends Component {
  render () {
    const imageSrc = {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      uri: this.props.avatar || require('../../assets/stardust.png')
    }
    const backgroundColor = colors.hex2rgba(this.props.color || colors.nightshade, 0.5)
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={[ styles.avatar, { backgroundColor } ]} />
      </View>
    )
  }
}

ProfileForeground.propTypes = {
  color: React.PropTypes.string,
  avatar: React.PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  avatar: {
    opacity: 0.95,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: AVATAR_SIZE / 2,
    marginBottom: 10
  }
})

export default ProfileForeground
