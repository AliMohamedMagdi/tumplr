/**
 * Login button component
 */

'use strict'

import {
  Text,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'

import EntypoIcon from 'react-native-vector-icons/Entypo'

import Button from './Button'

class LoginButton extends Component {
  render () {
    return (
      <Button
        height={35}
        style={StyleSheet.flatten(styles.button)}
        onPress={this.props.onPress}>

        <EntypoIcon name='tumblr' color='white' style={styles.text}>
          <Text> Log in to Tumblr </Text>
        </EntypoIcon>

      </Button>
    )
  }
}

LoginButton.propTypes = {
  onPress: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  text: {
    margin: 8,
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  },
  button: {
    marginLeft: 80,
    marginRight: 80,
    borderColor: '#262626',
    backgroundColor: '#181818'
  }
})

export default LoginButton
