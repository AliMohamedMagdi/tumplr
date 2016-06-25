import React, {
  View,
  Image,
  Component,
  StyleSheet
} from 'react-native'
import { hex2rgba } from '../../scripts/util'

const AVATAR_SIZE = 85

class ProfileForeground extends Component {
  render () {
    const { color, avatar } = this.props
    const uri = avatar[avatar.length - 1].url
    const avatarBackgroundColor = hex2rgba(color || '#3a3f41', 0.5)
    const AvatarProps = {
        style: [
            styles.avatar,
            { backgroundColor: avatarBackgroundColor }
        ],
        source: {
          uri,
          width: AVATAR_SIZE,
          height: AVATAR_SIZE
        }
    }

    return (
      <View style={styles.container}>
        <Image {...AvatarProps} />
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
    borderColor: '#eee',
    borderRadius: AVATAR_SIZE / 2,
    marginBottom: 10
  }
})

export default ProfileForeground
