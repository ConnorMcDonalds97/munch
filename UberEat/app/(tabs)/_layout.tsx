import React from 'react';
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

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
      tabBarScrollEnabled: true,
    }}
    >
      <TopTab.Screen name="Home" component={HomeScreen}/>
      <TopTab.Screen name="Solo" component={SoloScreen}/>
      <TopTab.Screen name="Room" component={RoomScreen}/>
      <TopTab.Screen name="Settings" component={SettingsScreen}/>


    </TopTab.Navigator>
  )
}
