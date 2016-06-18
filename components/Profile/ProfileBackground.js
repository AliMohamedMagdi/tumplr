import React, {
  View,
  Image,
  Component,
  StyleSheet
} from 'react-native'

class ProfileBackground extends Component {
  render () {
    const {
      height,
      background
    } = this.props

    const BackgroundProps = {
      height,
      uri: background
    }

    return (
      <View>
        <Image source={BackgroundProps} />
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
