import {
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'

import Button from './Button'
import colors from '../../styles/colors'

class LikeButton extends Component {
  render () {
    return (
      <Button
        width={40}
        height={30}
        onPress={() => this.props.onPress()}
        style={StyleSheet.flatten(styles.button)}>

        <IonIcon
          size={24}
          name='ios-heart'
          style={styles.icon}
          color={this.props.liked ? colors.heart : 'white'}
        />

      </Button>
    )
  }
}

LikeButton.propTypes = {
  liked: React.PropTypes.bool.isRequired,
  onPress: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.heartlite,
    marginRight: 5,
    marginLeft: 5
  },
  icon: {
    textAlign: 'center',
    marginTop: 2
  }
})

export default LikeButton
