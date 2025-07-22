import { View, Text, StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { Link } from "expo-router"

const app = () => {
  return (
    <View style = {styles.container}>
      {/*title*/}
      <Text style={styles.title}>UberEat</Text>  

      {/*"click here" button*/}
      <Link href="/explore" asChild> 
        <Pressable style={styles.button}>
          <Text styles={styles.buttonText}>Click Here!</Text>
        </Pressable>
      </Link>

    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "black"
  },
  title: {
    color:'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 120
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
    justifyContent: 'center'
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