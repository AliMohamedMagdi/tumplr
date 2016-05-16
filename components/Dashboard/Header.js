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
    return (
      <View style={styles.header}>

        {/* Avatar and Reblog Information */}
        <View style={styles.headerTextContainer}>
          <Image
            style={styles.rebloggerAvatar}
            source={{uri: this.props.avatarUri}}
          />
          <Text style={styles.headerText}>
            <Text style={styles.rebloggerName}> {this.props.blogName} </Text>
            {'\n '}
            reblogged {moment(this.props.reblogDate, 'YYYY-MM-DD HH:mm:ss').fromNow()}
          </Text>
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
  reblogDate: React.PropTypes.string,
  avatarUri: React.PropTypes.string,
  blogName: React.PropTypes.string
}

const MenuIconProps = {
  name: 'navicon-round',
  color: '#aaa',
  size: 18
}

const MenuIconTouchProps = {
  activeOpacity: 0.5,
  underlayColor: 'transparent',
  onPress: () => console.log('hi')
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
