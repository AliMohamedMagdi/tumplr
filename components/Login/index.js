import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import Dimensions from 'Dimensions'
import LoginButtonContainer from '../../containers/LoginButton'
const window = Dimensions.get('window')

class LoginView extends Component {
  render () {
    const LoginButtonProps = {
      navigator: this.props.navigator,
      creds: this.props.creds
    }
    return (
      <View>
        <Image source={require('../../assets/night.png')} style={styles.backgroundImage} />

        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> Lune </Text>
          </View>

          <View style={styles.loginButtonContainer}>
            <LoginButtonContainer {...LoginButtonProps} />
          </View>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: window.height / 5
  },
  titleContainer: {
    margin: 50
  },
  title: {
    fontSize: 100,
    color: 'white',
    marginRight: 40,
    textAlign: 'center',
    fontFamily: 'NoteraPersonalUseOnly'
  },
  loginButtonContainer: {
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    height: window.height,
    width: window.width,
    resizeMode: 'cover'
  }
})

LoginView.propTypes = {
  navigator: React.PropTypes.object,
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default LoginView
