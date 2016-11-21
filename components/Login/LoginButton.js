import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import React, { Component } from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo'

class LoginButton extends Component {
  constructor (props) {
    super(props)
    this.state = { heldDown: false }
  }

  render () {
    const TumblrIconProps = {
      color: 'white',
      name: 'tumblr',
      style: styles.button
    }

    const TumblrButtonProps = {
      activeOpacity: 0.5,
      onPress: () => this.props.login(),
      underlayColor: 'transparent',
      onShowUnderlay: () => this.setState({ heldDown: true }),
      onHideUnderlay: () => this.setState({ heldDown: false })
    }

    return (
      <View style={[ styles.buttonContainer, this.state.heldDown && styles.buttonDown ]}>
        <TouchableHighlight {...TumblrButtonProps} >
          <EntypoIcon {...TumblrIconProps}>
            <Text> Login with Tumblr </Text>
          </EntypoIcon>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 70,
    marginRight: 70,
    borderBottomWidth: 5,
    borderRadius: 2,
    borderColor: '#545f72',
    backgroundColor: '#727d8d'
  },
  button: {
    margin: 10,
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  },
  buttonDown: {
    marginTop: 4,
    borderBottomWidth: 3
  }
})

LoginButton.propTypes = {
  login: React.PropTypes.func.isRequired,
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default LoginButton
