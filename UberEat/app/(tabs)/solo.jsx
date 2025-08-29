import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import React from 'react'
import munchLogo from "@/assets/images/newMunchLogo.png"
import { useRouter } from "expo-router"


const App = () => {
  // state allows components to remember their values over time and react when the values change
  // [x, setX] where x refers to the current value of the state, and setX is the funciton that updates the state
  const [username, setUsername] = React.useState('');
  const [userID, setUserID] = React.useState('');
  const [text, onChangeText] = React.useState('');
  const router = useRouter()

  const handleSubmit = async () => {
    // input handling
    if (!username || !userID) {
      Alert.alert('Error','Please fill in both fields')
      return;
    }

    if (username === 'kevin' && userID === '1'){
      router.push("/game")
    } else{
      Alert.alert('Error','invalid credentials')
    }

  

  //Prepare object to be sent to backend
  // const payload = {
  //   username: username,
  //   id: userID
  // }

  // try {
  //   const response = await fetch('pretend I have an API right now', {
  //     method: 'POST', // send data to server
  //     headers: {
  //       'Content-Type': 'application/JSON', 
  //     },
  //     body: JSON.stringify(payload),
  //   });

  //   if (response.ok){
  //     Alert.alert('Success')
  //   } else {
  //     Alert.alert('Error')
  //   }
  //   } catch (error) {
  //     console.error('Error:', error),
  //     Alert.alert('Error')
  //   }
 };

  return (
    <View style = {styles.container}>
      {/*title*/}
      <View style={styles.titleBar}>
        <Image style={styles.titleBarLogo} source={munchLogo}/>
        <Text style={styles.title}>solo</Text>  
        <View style={{ width: "20%"}}/>
      </View>

      <View style={{ height: 300}}/>

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder='Enter Username'
        placeholderTextColor="black"

      />

      <TextInput
        style={styles.input}
        onChangeText={setUserID}
        value={userID}
        placeholder='Enter ID'
        placeholderTextColor="black"
      />

      <View style = {{ marginBottom: 15}}/>

      {/*"click here" button*/}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Click Here!</Text>
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
  width: "20%",
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
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    textDecorationLine: 'none',
  },
  input:{
    display: 'flex',
    backgroundColor: 'white',
    color: 'black',
    width: "70%",
    height: "5%",
    margin: 12,
    borderRadius: 16,
    padding: 10,
    color: "black"
  }

})