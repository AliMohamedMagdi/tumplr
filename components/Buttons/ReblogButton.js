import {
  Animated,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import Button from './Button'
import colors from '../../styles/colors'

class ReblogButton extends Component {
  render () {
    return (
      <Button
        width={40}
        height={30}
        onPress={() => this.props.onPress()}
        onPressIn={() => this.props.onPressIn()}
        onPressOut={() => this.props.onPressOut()}
        style={StyleSheet.flatten(styles.button)}>

        <Animated.View>
          <EntypoIcon
            size={24}
            name='retweet'
            style={styles.icon}
            color={this.props.reblogged ? colors.overcastnite : 'white'}
          />
        </Animated.View>

      </Button>
    )
  }
}

ReblogButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  reblogged: React.PropTypes.bool.isRequired,
  onPressIn: React.PropTypes.func,
  onPressOut: React.PropTypes.func
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.overcast,
    marginRight: 5,
    marginLeft: 5
  },
  icon: {
    textAlign: 'center',
    marginTop: 2
  }
})

export default ReblogButton
