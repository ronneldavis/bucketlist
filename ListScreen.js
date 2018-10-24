import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, AsyncStorage, Platform } from 'react-native';
import items from './data.js'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';

export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    console.log(this.state.data)
  }

  componentDidMount() {
    this.getArray();
  }

  getArray = () => {
    AsyncStorage.getItem('data').then(req => JSON.parse(req)).then(json => {
        console.log("Found");
        console.log(json || []);
        this.setState({data: json || []});
    }).catch(e => {
        console.log("Not found");
        this.setState({data: []});
        this.setArray();
    })
  }

  static navigationOptions = {
    //header: null,
    title: 'List',
    tabBarVisible: true,
    tabBarIcon: <Ionicons name="md-list" size={32} color="#666" />
  }

  render() {
    return (
      <SwipeListView
            useFlatList
            data={this.state.data}
            renderItem={({item}) => (
                <View style={styles.rowFront}>
                    <Text style={styles.text}>{item.title}</Text>
                </View>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                  <Text style={styles.whiteText}>Completed</Text>
                  <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}>
                    <Text style={styles.backTextWhite}>Remove</Text>
                  </TouchableOpacity>
                </View>
            )}
            leftOpenValue={100}
            rightOpenValue={-100}
        />
    );
  }
}

const styles = StyleSheet.create({
  rowFront: {
		backgroundColor: '#FFF',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: 'green',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
    paddingRight: 20
	},
  whiteText: {
    color: '#fff'
  },
  text: {
    color: '#000',
    fontSize: 22,
  },
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 100
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0,
	},
});
