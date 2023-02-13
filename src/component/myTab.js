import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import tabCafe from './tabCafe.js'
import tabWater from './tabwater'

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <View style={{flex : 1}}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={tabCafe} />
        <Tab.Screen name="Settings" component={tabWater} />
        <Tab.Screen name="odder" component={tabWater} />
      </Tab.Navigator>
    </View>
  );
}
