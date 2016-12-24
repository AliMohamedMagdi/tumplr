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

class Button extends Component {

  constructor (props) {
    super(props)
    this.state = {
      heldDown: false
    }
  }

  render () {
    const customButtonStyle = {
      height: this.props.height,
      ...this.props.style
    }

    const style = [
      styles.container,
      customButtonStyle,
      this.state.heldDown && {
        marginTop: 2,
        height: this.props.height - 2,
        ...StyleSheet.flatten(styles.heldDown)
      }
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
  style: React.PropTypes.object,
  label: React.PropTypes.node
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderRadius: 3
  },
  heldDown: {
    borderBottomWidth: 3
  }
})

export default Button
