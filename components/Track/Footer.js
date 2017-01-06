import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'

import EntypoIcon from 'react-native-vector-icons/Entypo'

const format = {
  insertCommas: function (num) {
    if (num < 1000) {
      return num
    } else {
      let arr = String(num).split('').reverse()
      for (let i = 3; i < arr.length; i += 4) {
        arr.splice(i, 0, ',')
      }
      return arr.reverse().join('')
    }
  }
}

class Footer extends Component {

  insertCommas (num) {
    if (num < 1000) {
      return num
    } else {
      let arr = String(num).split('').reverse()
      for (let i = 3; i < arr.length; i += 4) {
        arr.splice(i, 0, ',')
      }
      return arr.reverse().join('')
    }
  }

  render () {
    return (
      <View style={styles.footer}>

        {/* Notes icon and count */}
        <EntypoIcon
          color='#111'
          name='text-document'
          style={styles.notesText}>
          <Text style={styles.notesText}> {format.insertCommas(this.props.noteCount)} notes </Text>
        </EntypoIcon>

        {/* Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.props.tags.map((tag, i) =>
            <Text key={`${this.props.id}-${i}`} style={styles.tagsText}> #{tag} </Text>
          )}
        </ScrollView>

      </View>
    )
  }

}

Footer.propTypes = {
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

export default Footer
