/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import MyTab from './src/component/myTab.js'
import Screen from './src/component/NavigationScreen.js'
import addTable from './src/component/addTable.js'
import Vidu from './src/component/vidu.js'
import editTable from './src/component/editTable.js'
import HomeQlScreen from './src/component/HomeQlScreen.js'
import AddFood from './src/component/AddFood.js';
import table from './src/component/Table'

import EditProduct from './src/component/EditProduct.js'
import ScreenQl from './src/component/NavigationQlScreen.js'
import billtable from './src/component/BillTable.js'
import PrintBill from './src/component/PrintBill.js'
import TransferTable from './src/component/TransferTable.js'
import TableCombine from './src/component/TableCombine.js'
import Home from './src/component/HomeScreen.js'

import Revennue from './src/component/Revennue.js'
import AddStaff from './src/component/AddStaff.js'
import ScreenSatff from './src/component/screenStaff.js'
import Login from './src/component/Login';


import EmployeeSalary from './src/component/EmployeeSalary.js'
import SalaryManagement from './src/component/SalaryManagement.js'
import AreaScreen from './src/component/areaScreen.js'
import RevennueToDay from './src/component/RevenueToDay.js'
import Print from './src/component/PrintBill.js'

import StaffData from './src/component/StaffInfor.js'
AppRegistry.registerComponent(appName, () => Screen);
