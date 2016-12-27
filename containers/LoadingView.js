/**
 * Loading view container
 */

'use strict'

import {
  View,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import GiftedSpinner from 'react-native-gifted-spinner'

class LoadingView extends Component {
  render () {
    const style = [
      styles.container,
      this.props.backgroundColor && {
        backgroundColor: this.props.backgroundColor
      }
    ]
    return (
      <View style={style}>
        <GiftedSpinner />
      </View>
    )
  }
}

LoadingView.propTypes = {
  backgroundColor: React.PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3a3f41'
  }
})

export default LoadingView
