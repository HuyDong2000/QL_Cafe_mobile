/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './src/component/Login.js';
import Home from './src/component/HomeScreen.js';
import Table from './src/component/Table.js';
import editListPay from './src/component/editListPay.js'
import homeAdmin from   './src/component/homeAdmin.js'
import screenStaff from './src/component/screenStaff.js'
import editStaff from './src/component/editStaff.js'
import MyTab from './src/component/myTab.js'
import Screen from './src/component/NavigationScreen.js'
import addTable from './src/component/addTable.js'
AppRegistry.registerComponent(appName, () => addTable);
