import React from 'react';
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { Text } from 'react-native'
import HomeScreen from './index'
import SoloScreen from './solo'
import RoomScreen from './room'
import SettingsScreen from './settings'

const TopTab = createMaterialTopTabNavigator()

export default function SwipeTabs(){
  return(
    <TopTab.Navigator
    tabBarPosition='bottom'

    screenOptions={{
      swipeEnabled: true,
      tabBarShowLabel: true,
      tabBarScrollEnabled: false,
      lazy: true,
      lazyPreloadDistance: 1,



      tabBarIndicatorStyle: {
        backgroundColor: '#9395D3', // underline colour
        height: 3,
        borderRadius: 3,
      },
      tabBarStyle: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 20,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#FBF9FF',
        overflow: 'hidden',
      },

      tabBarActiveTintColor: "#9395D3",
      tabBarInactiveTintColor: '#000807',
      tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'lowercase',
      },

    }}
    >
      <TopTab.Screen name="Home" component={HomeScreen}/>
      <TopTab.Screen name="Solo" component={SoloScreen}/>
      <TopTab.Screen name="Room" component={RoomScreen}/>
      <TopTab.Screen name="Settings" component={SettingsScreen}/>


    </TopTab.Navigator>
  )
}
