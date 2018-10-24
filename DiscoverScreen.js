import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards'
import items from './data.js'

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Text>{this.props.text}</Text>
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
      cards: items.map(a => {
        return {"text": a}
      })
    };
  }

  render() {
    return (
      <SwipeCards
        style={styles.wrapper}
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#ccc",
    flex: 1,
  },  
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    elevation: 3,
    backgroundColor: "#eee",
    elevation: 3
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})
