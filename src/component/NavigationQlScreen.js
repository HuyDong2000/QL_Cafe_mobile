import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login.js'
import ListEditProduct from './EditProduct.js'
import DetailProduct from './EditProductDetail.js';
import AddPFood from './AddFood.js'
import HomeQlScreen from './HomeQlScreen.js';

import ListEditTable from './editTable.js'
import DetailTable from './detailEditTable.js'
import AddTable from './addTable.js';

import EditType from './EditType.js'
import EditTypeDetail from './EditTypeDetail.js'
import AddType from './AddType.js'

import AddStaff from './AddStaff.js';
import EditSatff from './editStaff'
import ScreenSatff from './screenStaff.js';
import Revennue from './Revennue.js';
import LoginAdmin from './LoginAdmin.js';
import EmployeeSalary from './EmployeeSalary.js';
import EmployeeSalaryDetail from './EmployeeSalaryDetail.js';
import ListStaffSalary from './ListStaffSalary.js';
import ListStaffSalaryDetail from './ListStaffSalaryDetail.js';
import SalaryManagement from './SalaryManagement.js';


import AreaScreen from './areaScreen.js';
import AddArea from './AddArea.js';
import EditArea from './EditArea.js';

import RevennueToDay from './RevenueToDay.js';
import Revennue1 from './Revennue.js';
const Stack = createNativeStackNavigator();

export default function NavigationQlScreen(){
    return(
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name='RevennueToDay' component={RevennueToDay} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='Revennue' component={Revennue1} ></Stack.Screen> 
            </Stack.Navigator>
        </NavigationContainer>
    )
}



{/* <Stack.Screen name='HomeQlScreen' component={HomeQlScreen} options={{ headerShown: false }}></Stack.Screen>
<Stack.Screen name='ListEditProduct' component={ListEditProduct} options={{ headerShown: false }}></Stack.Screen>
<Stack.Screen name='DetailProduct' component={DetailProduct} options={{ headerShown: false }}></Stack.Screen>
<Stack.Screen name='AddFood' component={AddPFood} options={{ headerShown: false }}></Stack.Screen>

<Stack.Screen name='ListEditTable' component={ListEditTable}></Stack.Screen>
<Stack.Screen name='DetailTable' component={DetailTable}></Stack.Screen>
<Stack.Screen name='AddTable' component={AddTable}></Stack.Screen>

<Stack.Screen name='EditType' component={EditType}></Stack.Screen>
<Stack.Screen name='EditTypeDetail' component={EditTypeDetail}></Stack.Screen>
<Stack.Screen name='AddType' component={AddType}></Stack.Screen>

<Stack.Screen name='ScreenSatff' component={ScreenSatff}></Stack.Screen>
<Stack.Screen name='EditSatff' component={EditSatff}></Stack.Screen>
<Stack.Screen name='AddStaff' component={AddStaff}></Stack.Screen>
<Stack.Screen name='Revennue' component={Revennue}></Stack.Screen> */}