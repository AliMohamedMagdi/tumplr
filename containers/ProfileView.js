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
      loading: true
    }

    this.fetchPosts = this.fetchPosts.bind(this)
    this.fetchBlog = this.fetchBlog.bind(this)
  }

  componentWillMount () {
    this.props.blog ? this.fetchPosts() : this.fetchBlog()
  }

  async fetchPosts () {
    const { auth, blogName } = this.props
    const uri = `https://api.tumblr.com/v2/blog/${blogName}/posts/audio?api_key=${auth.key}`
    const data = await (await fetch(uri)).json()
    console.log('Received user post data!')
    console.dir(data)
    this.setState({
      posts: data.response.posts,
      loading: false
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
