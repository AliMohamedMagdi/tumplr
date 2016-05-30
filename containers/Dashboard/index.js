import React, {
  Component
} from 'react-native'
import OAuthSimple from 'oauthsimple'
import Dashboard from '../../components/Dashboard'

class DashboardContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
        loading: true,
        dashboardData: {}
    }
    this._fetchData = this._fetchData.bind(this)
    this._signOauth = this._signOauth.bind(this)
  }

  _fetchData (request) {
    // Retrieve user info and switch to the dashboard view
    fetch(request.signed_url).then((response) => response.json())
      .then((data) => {
        console.log('Dashboard data received!')
        console.log(JSON.stringify(data, null, 2))
        this.setState({
          loading: false,
          dashboardData: data
        })
      })
      .catch((error) => console.log(error))
  }

  _signOauth () {
    // Construct oauth signed url
    const oauth = new OAuthSimple(this.props.token, this.props.token_secret)
    const request = oauth.sign({
      action: 'GET',
      path: 'http://api.tumblr.com/v2/user/dashboard',
      parameters: {
        limit: 20,
        type: 'audio',
        reblog_info: true
      },
      signatures: {
        consumer_key: this.props.creds.key,
        shared_secret: this.props.creds.sec,
        oauth_token: this.props.token,
        oauth_secret: this.props.token_secret
      }
    })
    this._fetchData(request)
  }

  render () {
    const DashboardProps = {
      loading: this.state.loading,
      dashboardData: this.state.dashboardData,
      actions: {
        fetchData: this._fetchData.bind(this),
        signOauth: this._signOauth.bind(this)
      },
      ...this.props
    }
    return <Dashboard {...DashboardProps} />
  }
}

DashboardContainer.propTypes = {
  token: React.PropTypes.string.isRequired,
  token_secret: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
  creds: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    sec: React.PropTypes.string.isRequired
  })
}

export default DashboardContainer
