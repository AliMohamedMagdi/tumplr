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
    const uri = this.props.avatar.slice(-1)[0].url
    const backgroundColor = colors.hex2rgba(this.props.color || colors.nightshade, 0.5)
    return (
      <View style={styles.container}>
        <Image
          style={[ styles.avatar, { backgroundColor } ]}
          source={{ uri, width: AVATAR_SIZE, height: AVATAR_SIZE }}
        />
      </View>
    )
  }
}

ProfileForeground.propTypes = {
  color: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.array.isRequired
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
