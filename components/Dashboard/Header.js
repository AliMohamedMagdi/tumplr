/*
 * Dashboard header component
 */

import React, {
  Text,
  View,
  Image,
  Component,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import moment from 'moment'
import IonIcon from 'react-native-vector-icons/Ionicons'

class Header extends Component {
  render () {
    const {
      auth,
      blog,
      avatarUri,
      navigator
    } = this.props

    const MenuIconProps = {
      name: 'navicon-round',
      color: '#aaa',
      size: 18
    }

    const UserTouchProps = {
      activeOpacity: 0.5,
      underlayColor: 'transparent',
      onPress: () => {
        navigator.push({
          auth,
          blog,
          name: 'profile-view',
          image: { uri: avatarUri }
        })
      }
    }

    const MenuIconTouchProps = {
      activeOpacity: 0.5,
      underlayColor: 'transparent',
      onPress: () => console.log('hi')
    }

    return (
      <View style={styles.header}>

        {/* Avatar and Reblog Information */}
        <View style={styles.headerTextContainer}>
          <TouchableHighlight {...UserTouchProps}>
            <Image
              style={styles.rebloggerAvatar}
              source={{uri: this.props.avatarUri}}
            />
          </TouchableHighlight>
          <View>
            <TouchableHighlight {...UserTouchProps}>
              <Text style={styles.rebloggerName}> {this.props.blogName} </Text>
            </TouchableHighlight>
            <Text style={styles.headerText}>
              {''} reblogged {moment(this.props.reblogDate, 'YYYY-MM-DD HH:mm:ss').fromNow()}
            </Text>
          </View>
        </View>

        {/* Menu Icon */}
        <TouchableHighlight style={styles.menuIconContainer} {...MenuIconTouchProps}>
          <IonIcon {...MenuIconProps} />
        </TouchableHighlight>

      </View>
    )
  }
}

Header.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  reblogDate: React.PropTypes.string.isRequired,
  avatarUri: React.PropTypes.string.isRequired,
  blogName: React.PropTypes.string.isRequired,
  blog: React.PropTypes.object.isRequired,

  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    token_secret: React.PropTypes.string.isRequired
  })
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f6f8',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc'
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rebloggerAvatar: {
    width: 30,
    height: 30,
    marginRight: 3,
    borderWidth: 0.8,
    borderRadius: 15,
    borderColor: 'white',
    backgroundColor: '#c6c6c6'
  },
  headerText: {
    fontSize: 11,
    color: 'gray'
  },
  rebloggerName: {
    fontWeight: '400',
    fontSize: 13,
    color: 'black'
  },
  menuIconContainer: {
    marginTop: 5
  }
})

export default Header
