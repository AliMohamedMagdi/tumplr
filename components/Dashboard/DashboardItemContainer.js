/**
 *  Dashboard Song Item Container
 */

import React, {
  Component
} from 'react-native'
import DashboardItem from '../../components/DashboardItem.js'

class DashboardItemContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: props.liked,
      reblogged: false,
      showNotes: false
    }
  }

  likeSong () {
    this.setState({liked: !this.state.liked})
  }

  reblogSong () {
    this.setState({reblogged: !this.state.reblogged})
  }

  showingNotes () {
    this.setState({showNotes: !this.state.showNotes})
  }

  render () {
    return <DashboardItem/>
  }
}

DashboardItemContainer.propTypes = {
}

export default DashboardItemContainer
