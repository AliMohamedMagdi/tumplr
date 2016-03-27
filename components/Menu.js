import React, {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component
} from 'react-native'
const window = Dimensions.get('window')

class Menu extends Component {
  render () {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../assets/lol.jpg')}/>
          <Text style={styles.name}>Your name</Text>
        </View>

        <Text
          onPress={() => this.props.onItemSelected('About')}
          style={styles.item}>
          About
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Contacts')}
          style={styles.item}>
          Contacts
        </Text>
      </ScrollView>
    )
  }
}

Menu.propTypes = {
  onItemSelected: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 20
  },
  background: {
    flex: 1,
    height: window.height,
    position: 'absolute'
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar: {
    flex: 1,
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 35,
    borderColor: 'white'
  },
  name: {
    position: 'absolute',
    color: 'white',
    fontWeight: '100',
    fontSize: 18,
    left: 100,
    top: 10
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    color: 'white'
  }
})

export default Menu
