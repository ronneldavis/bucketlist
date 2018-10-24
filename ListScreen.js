import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native';
import items from './data.js'
import { SwipeListView } from 'react-native-swipe-list-view';

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

    console.log(this.state.data)
  }


  render() {
    return (
      <SwipeListView
            useFlatList
            data={this.state.data}
            renderItem={({item}) => (
                <View style={styles.rowFront}>
                    <Text style={styles.text}>{item.text}</Text>
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
    textAlign: 'center',
    color: '#000',
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
    color: '#fff'
	},
});
