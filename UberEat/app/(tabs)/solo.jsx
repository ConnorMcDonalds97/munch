import { View, Text, TextInput, Pressable, StyleSheet, Aler, Image } from 'react-native';
import React from 'react'
import munchLogo from "@/assets/images/newMunchLogo.png"
import { Link } from "expo-router"


const App = () => {
  // state allows components to remember their values over time and react when the values change
  // [x, setX] where x refers to the current value of the state, and setX is the funciton that updates the state
  const [username, setUsername] = React.useState('');
  const [userID, setUserID] = React.useState('');
  const [text, onChangeText] = React.useState('');

  const handleSubmit = async () => {
    // input handling
    if (!username || !userID) {
      Alert.alert('Please fill in both fields')
    }

  

  // Prepare object to be sent to backend
  const payload = {
    username: username,
    id: userID
  }

  try {
    const response = await fetch('pretend I have an API right now', {
      method: 'POST', // send data to server
      headers: {
        'Content-Type': 'application/JSON', 
      },
      body: JSON.stringify(payload),
    });

    if (response.ok){
      Alert.alert('Success')
    } else {
      Alert.alert('Error')
    }
    } catch (error) {
      console.error('Error:', error),
      Alert.alert('Error')
    }
};

  return (
    <View style = {styles.container}>
      {/*title*/}
      <View style={styles.titleBar}>
        <Image style={styles.titleBarLogo} source={munchLogo}/>
        <Text style={styles.title}>solo</Text>  
        <View style={{ width: 150}}/>
      </View>

      <View style={{ height: 300}}/>

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder='Enter Username'
      />

      <TextInput
        style={styles.input}
        onChangeText={setUserID}
        value={userID}
        placeholder='Enter ID'
      />

      {/*"click here" button*/}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text styles={styles.buttonText}>Click Here!</Text>
      </Pressable>

    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f37f6b',
    alignItems:'center',
  },
  titleBar:{
    flexDirection:'row',
    backgroundColor: '#f37f6b',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: 10,
  },
  titleBarLogo: {
  width: 150,
  height: 150,
  resizeMode: 'contain',
  },
  title: {
    color:'#f3e4e1',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlign: 'center'
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
  },
  input:{
    display: 'flex',
    backgroundColor: 'white',
    color: 'black',
    width: 500,
    height: 25,
    margin: 12,
    borderRadius: 16,
    padding: 15
  }

})