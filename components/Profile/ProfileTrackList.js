import React, {
  View,
  Text,
  Component,
  StyleSheet
} from 'react-native'
import Dimensions from 'Dimensions'
const screen = Dimensions.get('window')
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import * as Util from '../../scripts/util'
import ProfileBackground from './ProfileBackground'
import ProfileForeground from './ProfileForeground'

class ProfileTrackList extends Component {
  render () {
    const {
      header_image: headerImage,
      background_color: backgroundColor
    } = this.props
    const background = headerImage || ''
    const headerColor = backgroundColor || '#3a3f41'
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
}

ProfileTrackList.propTypes = {
  header_image: React.PropTypes.string,
  background_color: React.PropTypes.string
}

const styles = StyleSheet.create({
  fixedHeader: {
    backgroundColor: 'white'
  }
})

export default ProfileTrackList
