import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards'
import items from './data.js'
import { Dimensions, AsyncStorage } from "react-native";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.cardInner}>{this.props.text}</Text>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}


export default class DiscoverScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
     arr: [],
      cards: items.map(a => {
        return {"text": a}
      })
    };
  }


  componentDidMount() {
    this.getArray();
  }

  getArray = () => {
    AsyncStorage.getItem('data').then(req => JSON.parse(req)).then(json => {
        console.log("Found");
        console.log(json || []);
        this.setState({arr: json || []});
    }).catch(e => {
        console.log("Not found");
        this.setState({arr: []});
        this.setArray();
    })
  }

  setArray = () => {
    AsyncStorage.setItem('data', JSON.stringify(this.state.arr))
  }

  handleYup = (card) => {
    console.log("YUP");
    console.log(card.text);
    var a = this.state.arr;
    a.push({title: card.text, completed: false});
    this.setState({arr: a});
    this.setArray();
  }

  handleNope = (card) => {
    console.log("NOPE");
    console.log(card.text);
  }
  
  handleMaybe = (card) => {
    console.log("MAYBE");
    console.log(card.text);
    var a = this.state.arr;
    a.push({title: card.text, completed: true});
    this.setState({arr: a});
    this.setArray();
  }

  render() {
    return (
        <View style={styles.container}>
        <Text style={styles.header}>Discover</Text>
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        maybeText="Completed!"

        maybeStyle={[styles.button, styles.maybeButton]}
        yupStyle={[styles.button, styles.yupButton]}
        nopeStyle={[styles.button, styles.nopeButton]}

        maybeTextStyle={styles.buttonInner}
        nopeTextStyle={styles.buttonInner}
        yupTextStyle={styles.buttonInner}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    header: {
        fontWeight: "900",
        fontFamily: "Avenir",
        fontSize: 44,
        marginLeft: 20,
        marginTop: 44
    },  
    container: {
        flex: 1,
        backgroundColor: "#eee",
        justifyContent: "center",
    },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    padding: 20,
    marginBottom: 100,
    elevation: 3,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8}
  },
  cardInner: {
      textAlign: "center",
      fontSize: 22,
      fontFamily: 'Avenir'
  },
  noMoreCardsText: {
    fontSize: 22,
  },

  button: {
      borderRadius: 10,
      width: width - 40,
      left: 20,
      backgroundColor: "#fff",
      borderColor: "transparent",
      elevation: 3,
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      shadowRadius: 16,
      shadowOffset: {width: 0, height: 8}
  },
  buttonInner: {
      textAlign: "center",
      fontFamily: "Avenir",
      fontSize: 18,
      fontWeight: "700",
      color: "#fff"
  },

  yupButton: {
      backgroundColor: "#2ecc71"
  },
  nopeButton: {
    backgroundColor: "#e74c3c"
  },
  maybeButton: {
    backgroundColor: "#3498db"
  }
})
