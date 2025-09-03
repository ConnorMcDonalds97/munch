import { View, Text, StyleSheet, Pressable, Image, Dimensions} from 'react-native'
import React from 'react'
import { Link } from "expo-router"
import Swiper from 'react-native-deck-swiper'
import data from './data'
import { LinearGradient } from 'expo-linear-gradient'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')



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
    element: (
      <LinearGradient
        colors={['rgba(255,0,0,1)', 'rgba(255,0,0,0.5)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}>
          NOPE
        </Text>
      </LinearGradient>
    ),
    style: {
      wrapper: {
        width: '30%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // center overlay on card
      },
    },
  },
  right: {
    element: (
      <LinearGradient
        colors={['rgba(0,255,0,1)', 'rgba(0,255,0,0.5)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}>
          YES
        </Text>
      </LinearGradient>
    ),
    style: {
      wrapper: {
        width: '30%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      },
    },
  },
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
    width: "30%",
    height: "50%",
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: "black",
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 0},
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    alignSelf: 'center'
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