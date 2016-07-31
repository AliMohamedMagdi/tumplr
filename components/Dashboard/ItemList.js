/**
 *  Dashboard Item List Component
 */

'use strict'

import React, {
  ListView,
  Component,
  StyleSheet,
  RecyclerViewBackedScrollView
} from 'react-native'
import Item from './Item'

class ItemList extends Component {

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      retrievingData: false,
      dataSource: ds.cloneWithRows(this._generateRows(this.props.response))
    }
    this._renderSongs = this._renderSongs.bind(this)
    this._generateRows = this._generateRows.bind(this)
    this._retrieveMoreSongs = this._retrieveMoreSongs.bind(this)
  }

  _renderSongs (props) {
    return <Item {...props} />
  }

  _retrieveMoreSongs () {
    if (this.state.retrievingData) return
    // this.props.actions.fetchDashboardItems(offset)
  }

  _generateRows () {
    const posts = this.props.response.posts
    console.log('Posts:')
    console.dir(posts)

    let dataBlob = []
    for (let i = 0; i < posts.length; i++) {
      const data = this.props.blog ? {
        blog: this.props.blog,
        ...posts[i]
      } : posts[i]
      if (posts[i].artist) {
        dataBlob.push({
          auth: this.props.auth,
          navigator: this.props.navigator,
          ...data
        })
      }
    }

    console.log('Data blob:')
    console.dir(dataBlob)
    return dataBlob
  }

  render () {
    console.log(this.state.dataSource)
    return (
      <ListView style={styles.list}
        renderRow={this._renderSongs}
        dataSource={this.state.dataSource}
        onEndReached={this._retrieveMoreSongs}
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

ItemList.propTypes = {
  response: React.PropTypes.object.isRequired,
  navigator: React.PropTypes.object.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    token_secret: React.PropTypes.string.isRequired
  })
}

export default ItemList
