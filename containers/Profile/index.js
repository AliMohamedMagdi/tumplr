/*
 * Profile main container component
 */

import React, {
  Component
} from 'react-native'
import Profile from '../../components/Profile'

class ProfileContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      blog: {},
      loading: true
    }

    this.fetchData = this.fetchData.bind(this)
    this._fetchPostData = this._fetchPostData.bind(this)
    this._fetchBlogData = this._fetchBlogData.bind(this)
  }

  fetchData () {
    const {
      auth,
      blog,
      blogName
    } = this.props

    if (blog) {
      console.log('- Only fetching post data, already have blog information')
      this._fetchPostData(blogName, auth.key)
    } else {
      console.log('- Fetching both blog and post data, since we lack blog information')
      this._fetchBlogData(blogName, auth.key)
    }
  }

  _fetchPostData (blogName, key) {
    const uri = `https://api.tumblr.com/v2/blog/${blogName}/posts/audio?api_key=${key}`

    fetch(uri).then((response) => response.json())
      .then((data) => {
        console.log('Received user post data!')
        console.dir(data)
        this.setState({
          data,
          loading: false
        })
      })
  }

  _fetchBlogData (blogName, key) {
    const uri = `https://api.tumblr.com/v2/blog/${blogName}/info?api_key=${key}`

    fetch(uri).then((response) => response.json())
      .then((data) => {
        console.log('Received user blog data!')
        console.dir(data)
        this.setState({ blog: data })
        this._fetchPostData(blogName, key)
        console.dir(this.state)
      })
  }

  render () {
    const ProfileProps = {
      loading: this.state.loading,
      data: this.state.data,
      actions: {
        fetchData: this.fetchData
      },
      ... Object.assign({}, { blog: this.state.blog }, this.props)
    }
    return <Profile {...ProfileProps} />
  }
}

ProfileContainer.propTypes = {
  blog: React.PropTypes.object,
  image: React.PropTypes.object.isRequired,
  blogName: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    token_secret: React.PropTypes.string.isRequired
  })
}

export default ProfileContainer
