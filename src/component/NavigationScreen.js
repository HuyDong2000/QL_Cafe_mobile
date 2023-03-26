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
import LoginAdmin from './LoginAdmin.js';

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
import RevennueToDay from './RevenueToDay.js';
import Revennue1 from './Revennue.js';

import EmployeeSalary from './EmployeeSalary.js';
import EmployeeSalaryDetail from './EmployeeSalaryDetail.js';
import ListStaffSalary from './ListStaffSalary.js';
import ListStaffSalaryDetail from './ListStaffSalaryDetail.js';
import SalaryManagement from './SalaryManagement.js';

import AreaScreen from './areaScreen.js';
import AddArea from './AddArea.js';
import EditArea from './EditArea.js';

import StaffInfor from './StaffInfor.js';
const Stack = createNativeStackNavigator();

export default function MainScreen(){
    return(
        <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen name='Login' component={Login} options={{headerShown : false}}></Stack.Screen>
                <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='Oder' component={App} ></Stack.Screen>
                <Stack.Screen name='Table' component={Table}></Stack.Screen>
                <Stack.Screen name='editTable' component={EditTable}></Stack.Screen>
                <Stack.Screen name='Cart' component={Cart} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='BillTable' component={BillTable}></Stack.Screen>
                <Stack.Screen name='BillTableDetail' component={BillTableDetail} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='CheckOder' component={CheckTableProduct}></Stack.Screen>
                <Stack.Screen name='CheckOderDetail' component={DetailCheckOder} ></Stack.Screen>
                <Stack.Screen name='PrintBill' component={PrintBill} ></Stack.Screen>
                <Stack.Screen name='TransforTable' component={TransforTable} ></Stack.Screen>
                <Stack.Screen name='TableCombine' component={TableCombine} ></Stack.Screen>
                <Stack.Screen name='SreenCombine' component={SreenCombine} ></Stack.Screen>
                <Stack.Screen name='CupTable' component={CupTable} ></Stack.Screen>
                <Stack.Screen name='ScreenCup' component={ScreenCup} ></Stack.Screen>
                <Stack.Screen name='StaffInfor' component={StaffInfor} options={{ headerShown: false }}></Stack.Screen>

                <Stack.Screen name='LoginAdmin' component={LoginAdmin} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='HomeQlScreen' component={HomeQlScreen} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='ListEditProduct' component={ListEditProduct} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='DetailProduct' component={DetailProduct} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='AddFood' component={AddPFood} options={{ headerShown: false }}></Stack.Screen>

                <Stack.Screen name='ListEditTable' component={ListEditTable}></Stack.Screen>
                <Stack.Screen name='DetailTable' component={DetailTable}></Stack.Screen>
                <Stack.Screen name='AddTable' component={AddTable}></Stack.Screen>

                <Stack.Screen name='EditType' component={EditType}></Stack.Screen>
                <Stack.Screen name='EditTypeDetail' component={EditTypeDetail}></Stack.Screen>
                <Stack.Screen name='AddType' component={AddType}></Stack.Screen>

                <Stack.Screen name='AreaScreen' component={AreaScreen} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='AddArea' component={AddArea} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='EditArea' component={EditArea} options={{ headerShown: false }}></Stack.Screen>
                
                <Stack.Screen name='ScreenSatff' component={ScreenSatff}></Stack.Screen>
                <Stack.Screen name='EditSatff' component={EditSatff}></Stack.Screen>
                <Stack.Screen name='AddStaff' component={AddStaff}></Stack.Screen>
                <Stack.Screen name='RevennueToDay' component={RevennueToDay} ></Stack.Screen>
                <Stack.Screen name='Revennue' component={Revennue1} ></Stack.Screen> 

                <Stack.Screen name='SalaryManagement' component={SalaryManagement} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='ListStaffSalary' component={ListStaffSalary} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='ListStaffSalaryDetail' component={ListStaffSalaryDetail} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='EmployeeSalary' component={EmployeeSalary} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name='EmployeeSalaryDetail' component={EmployeeSalaryDetail} options={{ headerShown: false }}></Stack.Screen>

        </Stack.Navigator>
    </NavigationContainer>
    )
}

