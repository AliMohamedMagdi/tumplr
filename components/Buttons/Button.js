/**
 * Default button component
 */

'use strict'

import {
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import React, { Component } from 'react'

import colors from '../../scripts/colors'

class Button extends Component {

  constructor (props) {
    super(props)
    this.state = {
      heldDown: false
    }
  }

  handlePressIn () {
    if (this.props.onPressIn) {
      this.props.onPressIn()
    }
  }

  handlePressOut () {
    if (this.props.onPressOut) {
      this.props.onPressOut()
    }
  }

  handleOnShowUnderlay () {
    this.setState({ heldDown: true })
    this.props.onHold && this.props.onHold()
  }

  handleOnHideUnderlay () {
    this.setState({ heldDown: false })
    this.props.onRelease && this.props.onRelease()
  }

  render () {
    const defaultStyle = StyleSheet.flatten(styles.default)
    const backgroundColor = (
      (this.props.style && this.props.style.backgroundColor) || defaultStyle.backgroundColor
    )
    const borderColor = colors.shade(backgroundColor, -0.06)

    // Collapse height/width props into style object
    const buttonStyle = {
      borderColor,
      width: this.props.width,
      height: this.props.height || defaultStyle.height,
      ...this.props.style
    }

    // Construct button style for when held down
    const heldButtonStyle = {
      height: (this.props.height || defaultStyle.height) - 2,
      borderBottomWidth: defaultStyle.borderBottomWidth - 2,
      ...StyleSheet.flatten(styles.heldDown)
    }

    // Cascade the default and custom styles
    const style = [
      styles.default,
      buttonStyle,
      this.state.heldDown && heldButtonStyle
    ]

    return (
      <View style={style}>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor='transparent'
          onPressIn={() => this.handlePressIn()}
          onPressOut={() => this.handlePressOut()}
          onShowUnderlay={() => this.handleOnShowUnderlay()}
          onHideUnderlay={() => this.handleOnHideUnderlay()}
          onPress={() => this.props.onPress()}>
          { this.props.children }
        </TouchableHighlight>
      </View>
    )
  }
};

Button.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  onPressOut: React.PropTypes.func,
  onPressIn: React.PropTypes.func,
  onRelease: React.PropTypes.func,
  onHold: React.PropTypes.func,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  style: React.PropTypes.object,
  label: React.PropTypes.node
}

const styles = StyleSheet.create({
  default: {
    height: 30,
    borderRadius: 3,
    borderBottomWidth: 3,
    backgroundColor: colors.night
  },
  heldDown: {
    marginTop: 2
  }
})

export default Button
