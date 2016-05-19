import React, { Component } from 'react-native'
import LoginButton from './LoginButton'

class Login extends Component {
  render () {
    const LoginButtonProps = {
      navigator: this.props.navigator,
      creds: this.props.creds
    }
    return <LoginButton {...LoginButtonProps} />
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
