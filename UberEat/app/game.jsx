import { View, Text, StyleSheet, Pressable, Image, Dimensions} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
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
    <Text style={[styles.title]}>
      {data[index]?.name ? data[index].name : 'No more restaurants'}
    </Text>
  </View>

)

const App = () => {
  const [index, setIndex] = React.useState(0)
  const [swipeHistory, setSwipeHistory] = React.useState([])

  // Log swipe history whenever it changes
  React.useEffect(() => {
    console.log('Swipe History:', swipeHistory);
  }, [swipeHistory]);

  // Helper to record swipe direction and restaurant
  const recordSwipe = (direction) => {
    const restaurant = data[index];
    if (restaurant) {
      setSwipeHistory(prev => [...prev, { restaurant, direction }]);
    }
  }

  const onSwipedLeft = () => {
    recordSwipe('left');
    setIndex(index + 1);
  }

  const onSwipedRight = () => {
    recordSwipe('right');
    setIndex(index + 1);
  }

  // Optionally, handle up/down swipes if needed
  // const onSwipedTop = () => { ... }
  // const onSwipedBottom = () => { ... }
  return (
      <View style={[styles.container, {paddingTop: Constants.statusBarHeight}]}> 
        <StatusBar style="light" translucent backgroundColor="transparent" />

        <View style={styles.bottomContainer}>
          <CardDetails index={index}/>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Swiper
            cards={data}
            cardIndex={index}
            renderCard={card => <Card card={card}/>}
            onSwipedLeft={onSwipedLeft}
            onSwipedRight={onSwipedRight}
            backgroundColor='#f37f6b'
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
                    width: Math.max(SCREEN_WIDTH * 0.8, 280),
                    height: Math.max(SCREEN_HEIGHT * 0.45, 220),
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
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
                    width: Math.max(SCREEN_WIDTH * 0.8, 280),
                    height: Math.max(SCREEN_HEIGHT * 0.45, 220),
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  },
                },
              },
            }}
          />
        </View>
      </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor:"white"
  },
  card: {
    width: Math.max(SCREEN_WIDTH * 0.8, 280), // 80% of screen or at least 280px
    height: Math.max(SCREEN_HEIGHT * 0.45, 220), // 45% of screen or at least 220px
    borderRadius: 16,
    shadowRadius: 25,
    shadowColor: "black",
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 0},
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    alignSelf: 'center',
    overflow: 'hidden', // ensure image doesn't overflow
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#f37f6b"
  },
  CardDetails: {},
  text: {},
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})