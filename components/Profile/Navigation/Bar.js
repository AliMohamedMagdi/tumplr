import {
  Navigator
} from 'react-native'

class ProfileNavigationBar extends Navigator.BreadcrumbNavigationBar {
  render () {
    const routes = this.props.navState.routeStack

    // Hide the navigation bar if profile view is not the current route
    if (routes.length) {
      const currentRoute = routes[routes.length - 1]
      if (currentRoute.name !== 'profile-view') {
        return null
      }
    }
    return super.render()
  }
}

export default ProfileNavigationBar
