import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login.js'
import HomeScreen from './HomeScreen.js'
import App from './myTab.js'
import Table from './Table.js'
import PayScreen from './editListPay.js'
const Stack = createNativeStackNavigator();

export default function MainScreen(){
    return(
        <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen name='Login' component={Login}></Stack.Screen>
            <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
            <Stack.Screen name='Oder' component={App}></Stack.Screen>
            <Stack.Screen name='Table' component={Table}></Stack.Screen>
            <Stack.Screen name='Pay' component={PayScreen}></Stack.Screen> 
        </Stack.Navigator>
    </NavigationContainer>
    )
}

