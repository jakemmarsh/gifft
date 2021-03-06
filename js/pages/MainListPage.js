'use strict';

var _ = require('lodash');
var React = require('react-native');
var Icon = require('FAKIconImage');
var moment = require('moment');
var {
  StyleSheet,
  Text,
  View,
  Component,
  ListView,
  TouchableHighlight,
  Image
} = React;
var OccasionPage = require('./OccasionPage');
var Storage = require('../utils/Storage');
var constants = require('../constants');
var styles = StyleSheet.create({
  row: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  dateCircle: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#c1ebdd'
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
    marginTop: 5,
    marginBottom: -5,
    color: '#ffffff',
    containerBackgroundColor: 'transparent'
  },
  month: {
    fontSize: 14,
    color: '#ffffff',
    containerBackgroundColor: 'transparent'
  },
  textContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  occasionTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  occasionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  icon: {
    marginRight: 5
  },
  mutedText: {
    color: '#acacac'
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee'
  }
});

class MainListPage extends Component {

  constructor(props) {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid !== r2.guid
    });

    super(props);

    this.state = {
      loading: true,
      occasions: [],
      dataSource: dataSource.cloneWithRows([])
    }
  }

  componentDidMount() {
    Storage.getAllOccasions().then((occasions) => {
      this.setState({
        loading: false,
        occasions: occasions || [],
        dataSource: this.state.dataSource.cloneWithRows(occasions || [])
      });
    });
  }

  navigateToOccasion(occasion) {
    this.props.toRoute({
      name: occasion.title || 'Occasion',
      component: OccasionPage,
      data: {occasion}
    });
  }

  renderRow(occasion, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor={constants.colors.dark_grey} onPress={this.navigateToOccasion.bind(this, occasion)}>
        <View>
          <View style={styles.row}>
            <View>
              <View style={styles.dateCircle}>
                <Text style={styles.day}>{moment(occasion.date).format('D')}</Text>
                <Text style={styles.month}>{moment(occasion.date).format('MMM').toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.occasionTitle}>{occasion.title}</Text>
              <View style={styles.occasionDetails}>
                <Icon name="fontawesome|bell"
                      size={50}
                      width={50}
                      height={50}
                      color="#000000"
                      style={styles.icon} />
                <Text style={styles.mutedText}>{occasion.reminders ? occasion.reminders.length : 0}</Text>
                <Icon name="fontawesome|gift"
                      size={50}
                      width={50}
                      height={50}
                      color="#000000"
                      style={styles.icon} />
                <Text style={styles.mutedText}>{occasion.giftIdeas ? occasion.giftIdeas.length : 0}</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
    );
  }

}

module.exports = MainListPage;