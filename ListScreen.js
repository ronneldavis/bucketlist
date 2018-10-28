import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import items from './data.js'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: true,
      data: items.map(a => {
        return {"text": a}
      }),
      listViewData: items.map((_,i) => ({key: `${i}`, text: `item #${i}`})),
    };
  }

  static navigationOptions = {
    //header: null,
    title: 'List',
    tabBarVisible: true,
    tabBarIcon: <Ionicons name="md-list" size={32} color="#666" />
  }

  swipeBegan = (a, b, c) => {
    console.log(a, b, c);
  }

  render() {
    return (
      <View style={styles.wrapper}>
      <Text style={styles.header}>My List</Text>
      <SwipeListView
          onRowOpen={this.swipeBegan}
          style={styles.scroller}
          keyExtractor={(item, index) => index.toString()}
            useFlatList={true}
            data={this.state.data}
            renderItem={({item}) => (
                <View style={styles.rowFront}>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                  <Text style={styles.whiteText}>Completed</Text>
                  <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                    <Text style={styles.whiteText}>Remove</Text>
                  </View>
                </View>
            )}
            leftOpenValue={100}
            rightOpenValue={-100}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "900",
    fontFamily: "Avenir",
    fontSize: 44,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 44
  }, 
  wrapper: {
    backgroundColor: "#eee",
    flex: 1
  },
  scroller: {
    backgroundColor: "#eee"
  },
  rowFront: {
		backgroundColor: '#FFF',
    borderBottomColor: 'black',
    borderRadius: 5,
    width: width - 40,
    marginLeft: 20,
    marginTop: 10,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15
	},
	rowBack: {
    borderRadius: 5,
    width: width - 40,
    marginLeft: 20,
    marginTop: 10,
		alignItems: 'center',
		backgroundColor: '#2ecc71',
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
    width: (width/2) - 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
	},
	backRightBtnRight: {
		backgroundColor: '#e74c3c',
		right: 0,
	},
});
