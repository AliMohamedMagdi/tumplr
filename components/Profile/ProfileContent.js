/**
 * Profile Item List Component
 */

'use strict'

import React, {
  View,
  ListView,
  Component,
  StyleSheet
} from 'react-native'
import Dimensions from 'Dimensions'
import ProfileHeader from './ProfileHeader'
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
    this._renderTrackList = this._renderTrackList.bind(this)
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

  _renderTrackList (event) {
    const { blog } = this.props
    const avatar = blog.avatar
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
        renderStickyHeader={() => <View style={styles.stickyHeader} />}
        renderBackground={() => <ProfileBackground {...ProfileBackgroundProps} />}
        renderForeground={() => <ProfileForeground avatar={avatar} color={headerColor} />}
      />
    )
  }

  render () {
    return <ListView
      ref='ListView'
      renderRow={(props) => <Item {...props} />}
      renderHeader={() => <ProfileHeader {...this.props.blog} />}
      renderScrollComponent={this._renderTrackList}
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
  fixedHeader: {
    backgroundColor: 'white'
  }
})

export default ProfileContent
