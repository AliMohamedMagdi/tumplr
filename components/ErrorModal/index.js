/**
 * Error Modal Component
 **/

import React, {
  View,
  Text,
  Component,
  StyleSheet
} from 'react-native'

class ErrorModal extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>{this.props.message}</Text>
      </View>
    )
  }
}

ErrorModal.propTypes = {
  message: React.PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
})

export default ErrorModal
