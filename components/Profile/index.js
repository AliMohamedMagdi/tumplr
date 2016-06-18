import React, {
  View,
  Component,
  StyleSheet
} from 'react-native'
import GiftedSpinner from 'react-native-gifted-spinner'

import ProfileContent from './ProfileContent'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.renderLoading = this.renderLoading.bind(this)
    this.renderProfile = this.renderProfile.bind(this)
  }

  componentWillMount () {
    this.props.actions.fetchData()
  }

  renderLoading () {
    const { blog } = this.props
    const backgroundColor = blog.theme.background_color || '#3a3f41'
    return (
      <View style={[styles.spinner, {backgroundColor}]}>
        <GiftedSpinner />
      </View>
    )
  }

  renderProfile (data) {
    const { blog } = this.props
    const backgroundColor = blog.theme.background_color || '#3a3f41'

    const ProfileContentProps = {
      blog,
      auth: this.props.auth,
      response: data.response,
      navigator: this.props.navigator
    }

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ProfileContent {...ProfileContentProps} />
      </View>
    )
  }

  render () {
    const { data, loading } = this.props
    return loading ? this.renderLoading() : this.renderProfile(data)
  }
}

Profile.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  blog: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  auth: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    token_secret: React.PropTypes.string.isRequired
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
})

export default Profile
