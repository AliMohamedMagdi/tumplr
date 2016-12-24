/**
 * Loading view container
 */

'use strict'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'

class LoadingView extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text> Loading... </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  }
})

export default LoadingView
