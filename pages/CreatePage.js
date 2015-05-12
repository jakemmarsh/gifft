'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Component
} = React;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

class CreatePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Save an Occasion
        </Text>
      </View>
    );
  }

}

module.exports = CreatePage;