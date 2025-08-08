import { View, Text, StyleSheet, Pressable, Image} from 'react-native'
import React from 'react'
import { Link } from "expo-router"
import munchLogo from "@/assets/images/newMunchLogo.png"

const App = () => {
  return (
    <View style = {styles.container}>
      <Image
        style={styles.logo}
        source={munchLogo}
      ></Image>

      {/*title*/}
     {/*<Text style={styles.title}>munch</Text>*/}

      {/*"click here" button*/}
      {/*<Link href="/tempPage" asChild> 
        <Pressable style={styles.button}>
          <Text styles={styles.buttonText}>Click Here!</Text>
        </Pressable>
      </Link>*/}

    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f37f6b'
  },
  logo:{
    width: 'auto',
    height: 'auto',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
    
    
  },
  title: {
    color:'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 120,
    marginTop: 32
  },
  link: {
    color:'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    textDecoration: 'none'
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 'auto',
    padding: 4,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    textDecorationLine: 'none'
  }

})