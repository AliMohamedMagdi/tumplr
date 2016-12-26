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

import color from '../../util/color'
import colors from '../../styles/colors'

class Button extends Component {

  constructor (props) {
    super(props)
    this.state = {
      heldDown: false
    }
  }

  render () {
    const defaultStyle = StyleSheet.flatten(styles.default)
    const backgroundColor = (
      (this.props.style && this.props.style.backgroundColor) || defaultStyle.backgroundColor
    )
    const borderColor = color.shade(backgroundColor, 0.06)

    // Collapse height/width props into style object
    const customButtonStyle = {
      borderColor,
      width: this.props.width,
      height: this.props.height,
      ...this.props.style
    }

    // Construct held down style
    const heldDownStyle = {
      height: (this.props.height || defaultStyle.height) - 2,
      borderBottomWidth: defaultStyle.borderBottomWidth - 2,
      ...StyleSheet.flatten(styles.heldDown)
    }

    // Cascade the default and custom styles
    const style = [
      styles.default,
      customButtonStyle,
      this.state.heldDown && heldDownStyle
    ]

    return (
      <View style={style}>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor='transparent'
          onShowUnderlay={() => this.setState({ heldDown: true })}
          onHideUnderlay={() => this.setState({ heldDown: false })}
          onPress={() => this.props.onPress()} >
          { this.props.children }
        </TouchableHighlight>
      </View>
    )
  }
};

Button.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  style: React.PropTypes.object,
  label: React.PropTypes.node
}

const styles = StyleSheet.create({
  default: {
    height: 40,
    borderRadius: 3,
    borderBottomWidth: 3,
    backgroundColor: colors.night
  },
  heldDown: {
    marginTop: 2
  }
})

export default Button
