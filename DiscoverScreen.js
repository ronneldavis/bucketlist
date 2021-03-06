import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards'
import items from './data.js'
import { Dimensions, AsyncStorage, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ImagePlaceholder from 'react-native-image-with-placeholder'

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.image == ""){
      return (
        <View style={[styles.card, {height: width - 60}]}>
          <Text style={styles.cardText}>{this.props.title}</Text>
        </View>
      )}
      else{
        return (
        <View style={styles.card}>
          <View style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: "hidden"}}>
            <ImagePlaceholder showActivityIndicator={false} src={`https://source.unsplash.com/${this.props.image}/640`} style={styles.cardImage}></ImagePlaceholder>
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


function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default class DiscoverScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
     arr: [],
      cards: shuffle(items).map((a, i) => {
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
    a.push({title: card.title, completed: false});
    this.setState({arr: a});
    this.setArray();
  }

  handleNope = (card) => {
  }

  handleMaybe = (card) => {
    var a = this.state.arr;
    a.push({title: card.title, completed: true});
    this.setState({arr: a});
    this.setArray();
  }

  render() {
    return (
        <View style={styles.container}>
        <Text style={styles.header}>Discover</Text>
      <SwipeCards
        loop={true}
        stackOffsetX={0}
        stackOffsetY={-10}
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
        fontFamily: Platform.OS === 'ios' ? "Avenir" : "Roboto",
        fontSize: 44,
        marginLeft: 30,
        marginTop: 44
    },
    container: {
        flex: 1,
        backgroundColor: "#eee",
        justifyContent: "center",
    },
  card: {
    marginTop: 50,
    marginLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 60,
    marginBottom: 50,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8}
  },
  cardImage: {
    width: width - 60,
    height: width - 60,
    flex: 0
  },
  cardText: {
    padding: 20,
    textAlign: "center",
    fontSize: 20,
    color: "#444",
    fontWeight: "800",
    fontFamily: Platform.OS === 'ios' ? "Avenir" : "Roboto",
  },
  noMoreCardsText: {
    fontSize: 22,
  },

  button: {
      borderRadius: 10,
      width: width - 60,
      left: 30,
      height: 54,
      padding: 0,
      backgroundColor: "#fff",
      borderColor: "transparent",
      elevation: 3,
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      shadowRadius: 16,
      shadowOffset: {width: 0, height: 8}
  },
  buttonInner: {
      textAlign: "center",
      fontFamily: Platform.OS === 'ios' ? "Avenir" : "Roboto",
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
