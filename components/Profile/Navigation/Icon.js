import {
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import React, { Component } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'

class ProfileNavigationBarIcon extends Component {
  render () {
    return (
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor='transparent'
        onPress={() => this.props.navigator.popToRoute(this.props.route)}>
        { this.props.route.image
            ? <Image style={styles.profileIcon} source={this.props.route.image} />
            : <IonIcon name='ios-home' color='#fafafa' size={32} style={styles.dashboardIcon} /> }
      </TouchableHighlight>
    )
  }
}

ProfileNavigationBarIcon.propTypes = {
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

export default ProfileNavigationBarIcon
