import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login.js'
import HomeScreen from './HomeScreen.js'
import App from './myTab.js'
import Table from './Table.js'
import EditTable from './detailEditTable.js';
import Cart from './Cart.js';
import BillTable from './BillTable'
import BillTableDetail from './BillTableDetaill';
import CheckTableProduct from './CheckTableProduct.js';
import DetailCheckOder from './DetailCheckOder.js';
import PrintBill from './PrintBill.js';
import TransforTable from './TransferTable.js';
import TableCombine from './TableCombine.js'
import SreenCombine from './ScreenCombine.js';
import CupTable from './CupTable.js';
import ScreenCup from './ScreenCup.js';
const Stack = createNativeStackNavigator();

export default function MainScreen(){
    return(
        <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen name='Login' component={Login} options={{headerShown : false}}></Stack.Screen>
            <Stack.Screen name='Home' component={HomeScreen} options={{headerShown : false}}></Stack.Screen>
             <Stack.Screen name='Oder' component={App}></Stack.Screen>
            <Stack.Screen name='Table' component={Table}></Stack.Screen>  
            <Stack.Screen name='editTable' component={EditTable}></Stack.Screen> 
            <Stack.Screen name='Cart' component={Cart}></Stack.Screen>
            <Stack.Screen name='BillTable' component={BillTable}></Stack.Screen>
            <Stack.Screen name='BillTableDetail' component={BillTableDetail}  options={{headerShown : false}}></Stack.Screen>
            <Stack.Screen name='CheckOder' component={CheckTableProduct}></Stack.Screen>
            <Stack.Screen name='CheckOderDetail' component={DetailCheckOder} ></Stack.Screen>
            <Stack.Screen name='PrintBill' component={PrintBill} ></Stack.Screen>
            <Stack.Screen name='TransforTable' component={TransforTable} ></Stack.Screen>
            <Stack.Screen name='TableCombine' component={TableCombine} ></Stack.Screen>
            <Stack.Screen name='SreenCombine' component={SreenCombine} ></Stack.Screen>
            <Stack.Screen name='CupTable' component={CupTable} ></Stack.Screen>
            <Stack.Screen name='ScreenCup' component={ScreenCup} ></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

