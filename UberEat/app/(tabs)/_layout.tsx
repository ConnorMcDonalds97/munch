import React from 'react';
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import HomeScreen from './index'
import ExploreScreen from './explore'

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
      <TopTab.Screen name="Explore" component={ExploreScreen}/>


    </TopTab.Navigator>
  )
}
