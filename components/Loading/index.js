import React, {
  Text,
  View,
  Component,
  StyleSheet
} from 'react-native'

class Loading extends Component {
  render () {
    return (
      <View style={styles.container} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  }
})

export default Loading
