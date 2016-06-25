import React, {
  View,
  Text,
  Linking,
  Component,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

class ProfileHeader extends Component {
  _blogRedirect (blogName) {
    const url = `tumblr://x-callback-url/blog?blogName=${blogName}`
    console.log(`Redirecting to ${url}`)
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log(`Unable to open ${url}, opening in the browser instead`)
        return Linking.openURL(`http://${blogName}.tumblr.com`)
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred', err))
  }

  render () {
    const {
      uuid,
      name,
      title,
      theme,
      description
    } = this.props
    const isHTML = /<[a-z][\s\S]*>/i
    const titleProps = {
      style: [
        styles.title,
        { color: theme.title_color }
      ]
    }
    const descriptionProps = {
      style: [
        styles.desc,
        { color: theme.title_color }
      ]
    }
    const blogNameTouchProps = {
      activeOpacity: 0.6,
      onPress: () => this._blogRedirect(name)
    }
    const blogNameProps = {
      style: [
        styles.name,
        { color: theme.title_color }
      ]
    }

    return (
      <View style={styles.container}>
        <Text {...titleProps}> {title} </Text>
        <TouchableOpacity {...blogNameTouchProps}>
          <Text {...blogNameProps}> {uuid || `${name}.tumblr.com`} </Text>
        </TouchableOpacity>
        {!isHTML.test(description) && <Text {...descriptionProps}> {description} </Text>}
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
  desc: {
    fontSize: 13,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 10
  },
  name: {
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
})

export default ProfileHeader
