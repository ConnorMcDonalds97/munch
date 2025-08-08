import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import React from 'react'
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
      <Text style={styles.title}>solo</Text>  

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
  title: {
    color:'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
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
  },
  input:{
    display: 'flex',
    backgroundColor: 'white',
    color: 'black',
    width: 500,
    height: 25,
    margin: 12,
    borderWidth: 1,
  }

})