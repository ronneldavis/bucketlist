import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards'
import items from './data.js'
<<<<<<< HEAD
import { Dimensions, AsyncStorage, Image } from "react-native";
=======
import { Dimensions, AsyncStorage, Platform } from "react-native";
>>>>>>> dd0e4bbb9afe84696935aeb15e2899e462795e72
import { Ionicons } from '@expo/vector-icons';
import ImageLoad from 'react-native-image-placeholder';

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.image == ""){
      return (
        <View style={[styles.card, {height: 300}]}>
          <Text style={styles.cardText}>{this.props.title}</Text>
        </View>
      )}
      else{
        return (
        <View style={styles.card}>
          <View style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: "hidden"}}>
            <ImageLoad source={{uri: `https://source.unsplash.com/${this.props.image}/640x640`}} style={styles.cardImage}></ImageLoad>
          </View>
          <Text style={styles.cardText}>{this.props.title}</Text>
        </View>
      )}
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
      cards: items.map((a, i) => {
        var obj = a;
        obj.key = i.toString();
        return obj;
      })
    };
  }

  static navigationOptions = {
    //header: null,
    title: 'Discover',
    tabBarVisible: true,
    tabBarIcon: <Ionicons name="md-compass" size={32} color="#666" />
  }


  componentDidMount() {
    this.getArray();
  }

  getArray = () => {
    AsyncStorage.getItem('data').then(req => JSON.parse(req)).then(json => {
        this.setState({arr: json || []});
    }).catch(e => {
        this.setState({arr: []});
        this.setArray();
    })
  }

  setArray = () => {
    AsyncStorage.setItem('data', JSON.stringify(this.state.arr))
  }

  handleYup = (card) => {
    var a = this.state.arr;
    a.push({title: card.text, completed: false});
    this.setState({arr: a});
    this.setArray();
  }

  handleNope = (card) => {
  }

  handleMaybe = (card) => {
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
        stack={true}
        cards={this.state.cards}
        renderCard={(cardData) => {
          return <Card {...cardData} />
        }}
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
        fontFamily: Platform.OS === 'ios' ? "Avenir" : "Open Sans",
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
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginBottom: 50,
    elevation: 3,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8}
  },
  cardImage: {
    width: 300,
    height: 300
  },
  cardText: {
    padding: 20,
    textAlign: "center",
    fontSize: 20,
    color: "#444",
    fontWeight: "800",
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
      fontFamily: Platform.OS === 'ios' ? "Avenir" : "Open Sans",
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
