import React, {
  Text,
  View,
  Component,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import * as format from '../../scripts/format.js'

class DashboardFooter extends Component {
  constructor (props) {
    super(props)
    this.state = { showNotes: false }
    this.showingNotes = this.showingNotes.bind(this)
  }

  showingNotes () {
    this.setState({ showNotes: !this.state.showNotes })
  }

  render () {
    const NoteIconProps = {
      name: this.state.showNotes ? 'text-document-inverted' : 'text-document',
      color: '#111',
      style: styles.notesText
    }
    const NoteTouchProps = {
      activeOpacity: 0.5,
      underlayColor: 'transparent',
      onPress: this.showingNotes
    }
    const tagsProps = {
      horizontal: true,
      showsHorizontalScrollIndicator: false
    }

    return (
      <View style={styles.footer}>
        <TouchableHighlight {...NoteTouchProps}>
          <EntypoIcon {...NoteIconProps}>
            <Text style={styles.notesText}> {format.insertCommas(this.props.noteCount)} notes </Text>
          </EntypoIcon>
        </TouchableHighlight>
        <ScrollView {...tagsProps}>
          {this.props.tags.map((tag, i) => {
            <Text key={`${this.props.id}-${i}`} style={styles.tagsText}> #{tag} </Text>
          })}
        </ScrollView>
      </View>
    )
  }

}

DashboardFooter.propTypes = {
  id: React.PropTypes.number,
  tags: React.PropTypes.array,
  noteCount: React.PropTypes.number
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f5f6f8',
    borderTopWidth: 0.5,
    borderColor: '#ccc'
  },
  notesText: {
    fontWeight: '400',
    fontSize: 12,
    padding: 3,
    paddingLeft: 11
  },
  tagsText: {
    fontWeight: '300',
    color: '#666',
    fontSize: 12,
    padding: 3,
    paddingLeft: 5
  }
})

export default DashboardFooter
