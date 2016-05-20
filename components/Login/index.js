import React, { Component, View } from 'react-native'
import LoginButton from './LoginButton'

class Login extends Component {
  render () {
    const LoginButtonProps = {
      navigator: this.props.navigator,
      creds: this.props.creds
    }
    return (
      <View>
        <LoginButton {...LoginButtonProps} />
      </View>
    )
  }
};

Login.propTypes = {
  navigator: React.PropTypes.object,
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default Login
