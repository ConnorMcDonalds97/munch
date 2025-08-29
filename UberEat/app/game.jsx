import { View, Text, StyleSheet, Pressable, Image} from 'react-native'
import React from 'react'
import { Link } from "expo-router"
import Swiper from 'react-native-deck-swiper'
import data from './data'

const Card = ({card}) => (
  <View style={styles.card}>
    <Image source={{uri: card.image}} style={styles.cardImage}/>
  </View>
)

const App = () => {
  const [index, setIndex] = React.useState(0)
  return (
    <View style = {styles.container}>
      <Swiper
  cards={data}
  cardIndex={index}
  renderCard={(card) => {
    if (!card) {
      return (
        <View style={[styles.card, {backgroundColor: 'gray'}]}>
          <Text style={{color: 'white'}}>No Card</Text>
        </View>
      );
    }
    return <Card card={card} />;
  }}
/>

    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: "black",
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 0},
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: 'contain'
  }
  
})