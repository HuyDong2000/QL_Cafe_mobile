import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList,ScrollView,Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import {useRoute} from '@react-navigation/native'
const AddStaff = () => {
    const route = useRoute()
    const [status,setStatus] = useState(route.params.data.status)
    const [name,setName]=useState(route.params.data.name)
    const [address,setAddress] = useState(route.params.data.address)
    const [phonenumber,setPhonenumber] = useState(route.params.data.phonenumber)
    const [userName,setUserName] = useState(route.params.data.userName)
    const [passwork,setPasswork] = useState(route.params.data.passwork)
    const [date,setDate] = useState(route.params.data.Date)
    useEffect(() => {
       
    }, [])
    const onAddItems = () =>{
        firestore()
            .collection('Satff')
            .add({
                name: name,
                address: address,
                phonenumber: phonenumber,
                status: status,
                userName: userName,
                passwork: passwork,
                Date: date
            })
            .then(() => {
                console.log('User added!');
            });
    }
    return (
        <ScrollView>
        <View style={styles.container}>
           
            <TextInput placeholder='Họ tên ' style={styles.inputStyle} 
            value={name}
            onChangeText={text => setName(text)}
            ></TextInput>
            <TextInput placeholder='Địa chỉ ' style={styles.inputStyle}
            value={address}
            onChangeText={text => setAddress(text)}
            ></TextInput>
            <TextInput placeholder='Số điện thoại ' style={styles.inputStyle}
            value = {phonenumber}
            onChangeText={text => setPhonenumber(text)}
            >
            
            </TextInput>
            <TextInput placeholder='Ngày sinh  ' style={styles.inputStyle}
            value = {date}
            onChangeText={text => setDate(text)}
            ></TextInput>
            <TextInput placeholder='Tài khoản  ' style={styles.inputStyle}
            value = {userName}
            onChangeText={text => setUserName(text)}
            >
            </TextInput>
            <TextInput placeholder='Mật khẩu ' style={styles.inputStyle}
            value = {passwork}
            onChangeText={text => setPasswork(text)}
            >
            </TextInput>
            {status ? (<Text style={styles.headerText}>Quản lý </Text>):(<Text style={styles.headerText}>Nhân viên</Text>)}
            <View style={{flexDirection:'row',width:'90%',alignItems:'center',justifyContent:'center'}}>
                
                <TouchableOpacity style={{width:'100%',backgroundColor:'#33CCFF',height:50,borderRadius:10,alignItems:'center',justifyContent:'center'}}
                onPress={() => {setStatus(!status) ,console.log(status)}}
                >
                    <Text>Chức vụ </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.pickBtn}
            onPress={()=>{onAddItems(),Alert.alert('Thông báo ' , 'Thêm thành công ')}}
            >
                <Text>Upload</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    )
}

export default AddStaff;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    header: {
        height: 60,
        width: '100%',
        backgroundColor: '#fff',
        elevation: 5,
        paddingLeft: 20,
        justifyContent: 'center',
        alignItems:'center',
    },
    headerText: {
        fontSize: 25,
        fontWeight: '800',
    },
    inputStyle: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 30,
        alignSelf: 'center',
    },
    pickBtn: {
        width: '90%',
        height: 50,
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor:'#33CCFF'
    },
    typeBtn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    dropdownArea: {
        elevation: 5,
        marginTop: 20,
        height: 150,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    typeItem: {
        width: '85%',
        height: 50,
        borderBottomWidth: 0.2,
        borderBottomColor: '#8e8e8e',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    imageStyle:{
        width:'90%',
        height: 100,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    }
})