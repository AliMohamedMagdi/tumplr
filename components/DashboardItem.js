/**
 *  Dashboard Song Item Component
 */

'use strict'

import React, {
  View,
  Text,
  Image,
  Component,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import moment from 'moment'
import * as format from '../scripts/format.js'
import IonIcon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

class DashboardItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: props.liked,
      reblogged: false,
      showNotes: false
    }
    this.likeSong = this.likeSong.bind(this)
    this.reblogSong = this.reblogSong.bind(this)
    this.showingNotes = this.showingNotes.bind(this)
  }

  likeSong () {
    this.setState({liked: !this.state.liked})
  }

  reblogSong () {
    this.setState({reblogged: !this.state.reblogged})
  }

  showingNotes () {
    this.setState({showNotes: !this.state.showNotes})
  }

  render () {
    const data = this.props
    const reblogDate = data.date.substr(0, data.date.lastIndexOf(' '))
    // const avatarUri = `http://api.tumblr.com/v2/blog/${data.blog_name}.tumblr.com/avatar/64`
    const avatarUri = `http://api.tumblr.com/v2/blog/${data.blog_name}.tumblr.com/avatar/64`

    const AlbumTouchProps = {
      underlayColor: 'transparent'
      // onPress: () => console.dir(data)
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
    const PlayCountIconProps = {
      name: 'play',
      color: '#616566',
      size: 12
    }
    const LikeIconProps = {
      name: this.state.liked ? 'ios-heart' : 'ios-heart',
      color: this.state.liked ? '#e17d74' : '#aaa',
      size: 18,
      style: {
        marginLeft: 10,
        marginRight: 5
      }
    }
    const ReblogIconProps = {
      name: 'retweet',
      color: this.state.reblogged ? '#4c95ad' : '#aaa',
      size: 18,
      style: {
        marginLeft: 5,
        marginRight: 10
      }
    }
    const LikeTouchProps = {
      activeOpacity: 0.5,
      underlayColor: 'transparent',
      onPress: this.likeSong
    }
    const ReblogTouchProps = {
      activeOpacity: 0.5,
      underlayColor: 'transparent',
      onPress: this.reblogSong
    }
    const NoteIconProps = {
      name: this.state.showNotes ? 'text-document-inverted' : 'text-document',
      color: '#111',
      style: styles.notesText
    }
    const NoteTouchProps = {
      activeOpacity: 0.5,
      underlayColor: 'transparent',
      onPress: this.showingNotes
    }
    const tagsProps = {
      horizontal: true,
      showsHorizontalScrollIndicator: false
    }

    console.log(data)

    return (
      <View style={styles.container}>

        {/* Reblogger information & menu icon */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Image
              style={styles.rebloggerAvatar}
              source={{uri: avatarUri}}
            />
            <Text style={styles.headerText}>
              <Text style={styles.rebloggerName}> {data.blog_name} </Text>
              {'\n '}
              reblogged {moment(reblogDate, 'YYYY-MM-DD HH:mm:ss').fromNow()}
            </Text>
          </View>
          <TouchableHighlight style={styles.menuIconContainer} {...MenuIconTouchProps}>
            <IonIcon {...MenuIconProps}/>
          </TouchableHighlight>
        </View>

        {/* Album art cover */}
        <View style={styles.albumContent}>
          <TouchableHighlight {...AlbumTouchProps}>
            <Image
              style={styles.albumArt}
              source={{uri: data.album_art}}
            />
          </TouchableHighlight>
        </View>

        {/* Song Information */}
        <View style={styles.songInfoContainer}>
          <View style={styles.songInfoContent}>
            <Text style={styles.songTitleText}> {data.track_name} </Text>
            <Text style={styles.artistText}> {data.artist} </Text>
          </View>
          <View style={styles.songStatsContent}>
            <View style={styles.playCountContent}>
              <IonIcon {...PlayCountIconProps}>
                <Text style={styles.plays}> {format.insertCommas(data.plays)} plays </Text>
              </IonIcon>
            </View>
            <View style={styles.likeReblogContainer}>
              <TouchableHighlight {...LikeTouchProps}>
                <IonIcon {...LikeIconProps}/>
              </TouchableHighlight>
              <Text style={{color: '#999', fontSize: 14}}> {'|'} </Text>
              <TouchableHighlight {...ReblogTouchProps}>
                <EntypoIcon {...ReblogIconProps}/>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        {/* Footer containing notes information and tags */}
        <View style={styles.footer}>
          <TouchableHighlight {...NoteTouchProps}>
            <EntypoIcon {...NoteIconProps}>
              <Text style={styles.notesText}> {format.insertCommas(data.note_count)} notes </Text>
            </EntypoIcon>
          </TouchableHighlight>
          <ScrollView {...tagsProps}>
            {data.tags.map((tag, i) => <Text key={`${data.id}-${i}`} style={styles.tagsText}> #{tag} </Text>)}
          </ScrollView>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 2,
    backgroundColor: 'white'
  },
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
  },
  songInfoContent: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 5,
    backgroundColor: 'transparent'
  },
  albumContent: {
    flex: 1,
    flexDirection: 'column'
  },
  albumArt: {
    height: 100
  },
  songTitleText: {
    fontWeight: '500',
    fontSize: 15
  },
  artistText: {
    fontWeight: '400',
    fontSize: 12
  },
  songInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 5
  },
  songStatsContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  playCountContent: {
    padding: 5,
    paddingRight: 0
  },
  likeReblogContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#aaa'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f5f6f8',
    borderTopWidth: 0.5,
    borderColor: '#ccc'
  },
  notesText: {
    fontWeight: '400',
    fontSize: 12,
    padding: 3,
    paddingLeft: 11
  },
  tagsText: {
    fontWeight: '300',
    color: '#666',
    fontSize: 12,
    padding: 3,
    paddingLeft: 5
  }
})

export default DashboardItem
