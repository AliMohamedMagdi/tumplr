import React, {
  View,
  Component,
  StyleSheet
} from 'react-native'
import LoginButton from './LoginButton'

class Login extends Component {
  render () {
    const LoginButtonProps = {
      navigator: this.props.navigator,
      creds: this.props.creds
    }
    return (
      <View>
        <View style={styles.loginButtonContainer}>
          <LoginButton {...LoginButtonProps} />
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: 'transparent'
  },
  loginButtonContainer: {

  }
})

Login.propTypes = {
  navigator: React.PropTypes.object,
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default Login
