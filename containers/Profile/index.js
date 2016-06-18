import React, {
  Component
} from 'react-native'
import Profile from '../../components/Profile'

class ProfileContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      loading: true
    }
    this._fetchData = this._fetchData.bind(this)
  }

  _fetchData () {
    const {
      blog,
      auth
    } = this.props
    const uri = `https://api.tumblr.com/v2/blog/${blog.name}/posts/audio?api_key=${auth.key}`

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

  render () {
    const ProfileProps = {
      loading: this.state.loading,
      data: this.state.data,
      actions: {
        fetchData: this._fetchData
      },
      ...this.props
    }
    return <Profile {...ProfileProps} />
  }
}

ProfileContainer.propTypes = {
  blog: React.PropTypes.object.isRequired,
  image: React.PropTypes.object.isRequired,
  navigator: React.PropTypes.object.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    token_secret: React.PropTypes.string.isRequired
  })
}

export default ProfileContainer
