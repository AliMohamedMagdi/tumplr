import {
  View,
  Text,
  Linking,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import React, { Component } from 'react'

class ProfileHeader extends Component {

  blogRedirect () {
    const browserUrl = `https://${this.props.name}.tumblr.com`
    const appUrl = `tumblr://x-callback-url/blog?blogName=${this.props.name}`
    Linking.canOpenURL(appUrl)
      .then(canOpen => canOpen ? Linking.openURL(appUrl) : Linking.openURL(browserUrl))
      .catch(err => console.error('An error occurred opening the url:', err))
  }

  render () {
    const isHTML = /<[a-z][\s\S]*>/i
    const textColor = { color: this.props.theme.title_color }
    return (
      <View style={styles.container}>

        {/* Title text */}
        <Text style={[ styles.title, textColor ]}>
          {this.props.title}
        </Text>

        {/* Blog profile url link */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => this.blogRedirect()}>
          <Text style={[ styles.name, textColor ]}>
            {this.props.uuid || `${this.props.name}.tumblr.com`}
          </Text>
        </TouchableOpacity>

        {/* Blog profile non-html description */}
        {!isHTML.test(this.props.description) && (
          <Text style={[ styles.description, textColor ]}>
            {this.props.description}
          </Text>
        )}

      </View>
    )
  }
}

ProfileHeader.propTypes = {
  uuid: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  theme: React.PropTypes.object.isRequired,
  description: React.PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  description: {
    fontSize: 13,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 0,
    margin: 7
  },
  name: {
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
})

export default ProfileHeader
