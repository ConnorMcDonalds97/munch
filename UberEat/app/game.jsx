import { View, Text, StyleSheet, Pressable, Image} from 'react-native'
import React from 'react'
import { Link } from "expo-router"
import Swiper from 'react-native-deck-swiper'
import data from './data'

const colors = {
  red: '#ec2379',
  blue: '#0070ff',
  green: '#00b100ff',
  black: '#0000',
  white: '#ffff'
}

const Card = ({card}) => (
  <View style={styles.card}>
    <Image source={{uri: card.image}} style={styles.cardImage}/>
  </View>
)

const CardDetails = ({index}) => (
  <View>
    <Text style={[styles.title]}>data[index].name</Text>
  </View>

)

const App = () => {
  const [index, setIndex] = React.useState(0)
  const onSwiped = () => {
    setIndex(index+1)
  }
  return (
    <View style = {styles.container}>
      <Swiper
        cards={data}
        cardIndex={index}
        renderCard={card => <Card card={card}/>}
        onSwiped={onSwiped}
        stackSize={5}
        stackScale={10}
        stackSeparation={14}
        disableTopSwipe
        disableBottomSwipe
        animateOverlayLabelsOpacity
        animateCardOpacity
        overlayLabels={{
          left: {
            title: 'Nope',
            style: {
              label:{
                backgroundColor: colors.red,
                color: colors.white,
                fontSize: 24
              },
              wrapper:{
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: -20,
              }
            }
          },
          right: {
            title: 'yes',
            style: {
              label:{
                backgroundColor: colors.red,
                color: colors.white,
                fontSize: 24
              },
              wrapper:{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: 20,
              }
            }
          }
        }}
      />
      <View style={styles.bottomContainer}>
          <CardDetails index={index}/>
      </View>
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
    flex: 0.45,
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
  },
  bottomContainer: {
    bottomContainer: 0.5
  },
  CardDetails: {},
  text: {},
})