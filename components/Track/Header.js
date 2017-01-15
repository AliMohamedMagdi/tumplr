/*
 * Dashboard header component
 */

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import React, { Component } from 'react'

import moment from 'moment'
import IonIcon from 'react-native-vector-icons/Ionicons'

class Header extends Component {
  constructor (props) {
    super(props)
    this.renderHeader = this.renderHeader.bind(this)
  }

  renderHeader () {
    const routes = this.props.navigator.getCurrentRoutes()
    const currentView = routes[routes.length - 1].name
    const sourceTitle = this.props.sourceTitle || null

    const onPressUser = (sourceTitle && currentView === 'profile-view') ? () => {
      this.props.navigator.push({
        auth: this.props.auth,
        blog: null,
        blogName: sourceTitle,
        name: 'profile-view',
        image: { uri: `https://api.tumblr.com/v2/blog/${sourceTitle}.tumblr.com/avatar/64` }
      })
    } : () => {
      this.props.navigator.push({
        auth: this.props.auth,
        blog: this.props.blog,
        blogName: this.props.blogName,
        name: 'profile-view',
        image: { uri: this.props.avatarUri }
      })
    }

    const userTouchProps = {
      activeOpacity: 0.5,
      underlayColor: 'transparent',
      onPress: onPressUser
    }

    const defaultHeader = (
      <View style={styles.headerTextContainer}>
        <TouchableHighlight {...userTouchProps}>
          <Image
            style={styles.rebloggerAvatar}
            source={{uri: this.props.avatarUri}}
          />
        </TouchableHighlight>
        <View>
          <TouchableHighlight {...userTouchProps}>
            <Text style={styles.rebloggerName}> {this.props.blogName} </Text>
          </TouchableHighlight>
          <Text style={styles.headerText}>
            {''} reblogged {moment(this.props.reblogDate, 'YYYY-MM-DD HH:mm:ss').fromNow()}
          </Text>
        </View>
      </View>
    )

    const profileHeader = (
      <View style={styles.headerTextContainer}>
        <TouchableHighlight {...userTouchProps}>
          <Image style={styles.rebloggerAvatar}
            source={{uri: `https://api.tumblr.com/v2/blog/${sourceTitle}.tumblr.com/avatar/64`}}
          />
        </TouchableHighlight>
        <View>
          <TouchableHighlight {...userTouchProps}>
            <Text style={styles.rebloggerName}> {sourceTitle} </Text>
          </TouchableHighlight>
          <Text style={styles.headerText}>
            {''} reblogged {moment(this.props.reblogDate, 'YYYY-MM-DD HH:mm:ss').fromNow()}
          </Text>
        </View>
      </View>
    )

    switch (currentView) {
      case 'dashboard-view':
        return defaultHeader
      case 'profile-view':
        return sourceTitle ? profileHeader : defaultHeader
    }
  }

  render () {
    return (
      <View style={styles.header}>

        {/* Header */}
        {this.renderHeader()}

        {/* Menu icon */}
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={'transparent'}
          style={styles.menuIconContainer}
          onPress={() => console.log('hi')}>
          <IonIcon
            name='ios-menu'
            color='#aaa'
            size={18}
          />
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
    tokenSecret: React.PropTypes.string.isRequired
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
