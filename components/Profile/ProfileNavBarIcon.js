import React, {
  Image,
  Component,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'

class ProfileNavBarIcon extends Component {
  render () {
    const {
      route,
      navigator
    } = this.props

    const IconTouchProps = {
      activeOpacity: 0.5,
      underlayColor: 'transparent',
      onPress: () => navigator.popToRoute(route)
    }

    const IconProps = route.image ? {
      style: styles.profileIcon,
      source: route.image
    } : {
      style: styles.dashboardIcon,
      name: 'ios-home',
      color: '#fafafa',
      size: 32
    }

    return (
      <TouchableHighlight {...IconTouchProps} >
        {route.image ? <Image {...IconProps} /> : <IonIcon {...IconProps} />}
      </TouchableHighlight>
    )
  }
}

ProfileNavBarIcon.propTypes = {
  route: React.PropTypes.object.isRequired,
  navigator: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  dashboardIcon: {
    width: 36,
    height: 36,
    marginTop: 2,
    marginLeft: 12,
    backgroundColor: 'transparent'
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 0.8,
    borderColor: 'white',
    backgroundColor: '#c6c6c6'
  }
})

export default ProfileNavBarIcon
