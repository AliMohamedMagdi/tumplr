import React, {
  View,
  Text,
  Image,
  Component,
  StyleSheet
} from 'react-native'

const AVATAR_SIZE = 30

class ProfileForeground extends Component {
  render () {
    const {
      avatar
    } = this.props

    const AvatarProps = {
      uri: avatar,
      width: AVATAR_SIZE,
      height: AVATAR_SIZE
    }

    return (
      <View key='parallax-header' style={styles.parallaxHeader}>
        <Image style={styles.avatar} source={AvatarProps} />
        <Text style={styles.sectionSpeakerText}>
          parallax-header
        </Text>
        <Text style={styles.sectionTitleText}>
          ??????????????????
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  }
})

export default ProfileForeground
