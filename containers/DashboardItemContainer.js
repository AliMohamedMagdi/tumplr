/**
 *  Dashboard Song Item Container
 */

import React, {
  View,
  Text,
  Image,
  Component,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import moment from 'moment'
import * as format from '../scripts/format.js'
import IonIcon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import DashboardItem from '../components/DashboardItem.js'

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
