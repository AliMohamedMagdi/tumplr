/**
 * Profile Item List Component
 */

'use strict'

import React, {
  Text,
  View,
  ListView,
  Component,
  StyleSheet
} from 'react-native'
import Dimensions from 'Dimensions'
import ProfileBackground from './ProfileBackground'
import ProfileForeground from './ProfileForeground'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

const screen = Dimensions.get('window')
import Item from './../Dashboard/Item'
import * as Util from '../../scripts/util'

class ProfileContent extends Component {

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(this._generateRows())
    }
    this._renderSongList = this._renderSongList.bind(this)
    this._renderListHeader = this._renderListHeader.bind(this)
  }

  _generateRows () {
    const { posts } = this.props.response

    let dataBlob = []
    for (let i = 0; i < posts.length; i++) {
      const data = posts[i]
      dataBlob.push({
        blog: this.props.blog,
        auth: this.props.auth,
        navigator: this.props.navigator,
        ...data
      })
    }

    return dataBlob
  }

  _renderListHeader (event) {
    const { blog } = this.props
    const isHTML = /<[a-z][\s\S]*>/i
    const titleProps = {
      style: [
        styles.title,
        { color: blog.theme.title_color }
      ]
    }
    const descriptionProps = {
      style: [
        styles.desc,
        { color: blog.theme.title_color }
      ]
    }

    return (
      <View>
        <Text> {blog.name} </Text>
        <Text {...titleProps}> {blog.title} </Text>
        {!isHTML.test(blog.description) && <Text {...descriptionProps}> {blog.description} </Text>}
      </View>
    )
  }

  _renderSongList (event) {
    const { blog } = this.props
    const background = blog.theme.header_image || ''
    const headerColor = blog.theme.background_color || '#3a3f41'
    const ProfileBackgroundProps = {
      background,
      height: screen.height / 4
    }

    return (
      <ParallaxScrollView
        onScroll={() => {}}
        backgroundSpeed={10}
        stickyHeaderHeight={65}
        contentBackgroundColor={headerColor}
        parallaxHeaderHeight={screen.height / 4}
        backgroundColor={Util.hex2rgba(headerColor)}
        renderBackground={() => <ProfileBackground {...ProfileBackgroundProps} />}
        renderForeground={() => <ProfileForeground />}
        renderStickyHeader={() => (
          <View key='sticky-header' style={styles.stickyHeader}>
            <Text style={styles.stickySectionText}>Waddup</Text>
          </View>
        )}
        renderFixedHeader={() => (
          <View key='fixed-header' style={styles.fixedHeader}>
            <Text style={styles.fixedSectionText}
              onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
              waddup yo
            </Text>
          </View>
        )}
      />
    )
  }

  render () {
    return <ListView
      ref='ListView'
      renderRow={(props) => <Item {...props} />}
      renderHeader={this._renderListHeader}
      renderScrollComponent={this._renderSongList}
      dataSource={this.state.dataSource}
    />
  }
}

ProfileContent.propTypes = {
  blog: React.PropTypes.object.isRequired,
  response: React.PropTypes.object.isRequired,
  navigator: React.PropTypes.object.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    token_secret: React.PropTypes.string.isRequired
  })
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  desc: {
    fontSize: 14,
    fontWeight: '100',
    textAlign: 'center'
  },
  fixedHeader: {
    backgroundColor: 'white'
  }
})

export default ProfileContent
