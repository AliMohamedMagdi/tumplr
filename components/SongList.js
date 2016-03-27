/**
 *  Song List Component
 */

'use strict'

import React, {
  ListView,
  Component,
  StyleSheet,
  RecyclerViewBackedScrollView
} from 'react-native'
// import Song from './Song'
import DashboardItem from './DashboardItem'

class SongList extends Component {

  constructor (props) {
    super(props)
    console.log('response: ')
    // console.dir(props.response)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(this._generateRows(this.props.response))
    }
  }

  _renderSongs (data) {
    return <DashboardItem {...data}/>
  }

  _generateRows () {
    const posts = this.props.response.posts
    let dataBlob = []
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].artist) {
        dataBlob.push(posts[i])
      }
    }
    // console.dir(dataBlob)
    return dataBlob
  }

  render () {
    return (
      <ListView style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderSongs}
        renderScrollComponent={(props) => <RecyclerViewBackedScrollView {...props} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 5,
    backgroundColor: '#3a3f41'
  }
})

export default SongList
