/**
 * Default button component
 */

'use strict'

import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import React, { Component } from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import styles from '../stylesheets/components/button'

class Button extends Component {

  constructor (props) {
    super(props)
    this.state = {
      heldDown: false
    }
  }

  render () {
    return (
      <View style={[
        styles.container,
        { borderColor: '#262626' },
        { backgroundColor: '#181818' },
        this.state.heldDown && styles.heldDown
      ]}>

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor='transparent'
          onShowUnderlay={() => this.setState({ heldDown: true })}
          onHideUnderlay={() => this.setState({ heldDown: false })}
          onPress={() => this.props.onPress()} >

          { this.props.icon ? (
            <EntypoIcon style={styles.text} {...this.props.icon}>
              <Text> {this.props.text} </Text>
            </EntypoIcon>
          ) : (
            <Text> {this.props.text} </Text>
          ) }

        </TouchableHighlight>

      </View>
    )
  }
};

Button.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  text: React.PropTypes.string,
  icon: React.PropTypes.shape({
    color: React.PropTypes.string,
    name: React.PropTypes.string
  })
}

export default Button
