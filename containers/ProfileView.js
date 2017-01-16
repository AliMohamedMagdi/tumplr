/*
 * Profile main container component
 */

import React, { Component } from 'react'
import Profile from '../components/Profile'

class ProfileView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blog: {},
      posts: [],
      offset: 0,
      loading: true
    }
    this.limit = 20

    this.loadMore = this.loadMore.bind(this)
    this.fetchBlog = this.fetchBlog.bind(this)
    this.fetchPosts = this.fetchPosts.bind(this)
  }

  componentWillMount () {
    this.props.blog ? this.fetchPosts() : this.fetchBlog()
  }

  loadMore () {
    this.setState({ loading: true })
    return this.props.blog ? this.fetchPosts() : this.fetchBlog()
  }

  async fetchPosts () {
    const { auth, blogName } = this.props
    const uri = `https://api.tumblr.com/v2/blog/${blogName}/posts/audio`
    const params = `?api_key=${auth.key}&limit=${this.limit}&offset=${this.state.offset}`
    const data = await (await fetch(uri + params)).json()
    console.log('Received user post data!')
    console.dir(data)
    this.setState({
      loading: false,
      offset: this.state.offset + this.limit,
      posts: [ ...this.state.posts, ...data.response.posts ]
    })
  }

  async fetchBlog () {
    const { auth, blogName } = this.props
    const uri = `https://api.tumblr.com/v2/blog/${blogName}/info?api_key=${auth.key}`
    const data = await (await fetch(uri)).json()
    console.log('Received user blog data!')
    console.dir(data)
    this.setState({ blog: data.response.blog })
    this.fetchPosts()
  }

  render () {
    return (
      <Profile
        auth={this.props.auth}
        posts={this.state.posts}
        loadMore={this.loadMore}
        loading={this.state.loading}
        navigator={this.props.navigator}
        blog={this.props.blog || this.state.blog}
      />
    )
  }
}

ProfileView.propTypes = {
  blog: React.PropTypes.object,
  image: React.PropTypes.object.isRequired,
  blogName: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    tokenSecret: React.PropTypes.string.isRequired
  })
}

export default ProfileView
