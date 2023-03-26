import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList,ScrollView,Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import {useRoute} from '@react-navigation/native'
const EmployeeSalaryDetail = ({ navigation }) => {
    const route = useRoute()
    const [status,setStatus] = useState(route.params.data.status)
    const [name,setName]=useState(route.params.data.name)
    const [address,setAddress] = useState(route.params.data.address)
    const [phonenumber,setPhonenumber] = useState(route.params.data.phonenumber)
    const [userName,setUserName] = useState(route.params.data.userName)
    const [passwork,setPasswork] = useState(route.params.data.passwork)
    const [date,setDate] = useState(route.params.data.Date)
    const [salary,setSalary] = useState('')
    const [clicked, setClicked] = useState(false);
    const [dataarea,setDataArea] = useState([])
    const [select,setSelect] = useState('Select Items')
    const [idArea,setIdArea] = useState('')
    useEffect(() => {
        getItemsArea()
    }, [])
    const onAddItems = () =>{
        let luong = 0
        luong = salary * 60000
        let datatime = new Date()
        console.log(datatime.toString())
        firestore()
            .collection('salary')
            .add({
                idStaff: route.params.id,
                idArea: idArea,
                salary: luong,
                date: datatime,
            })
            .then(() => {
                console.log('User added!');
            });
            navigation.navigate('SalaryManagement')
    }
    const getItemsArea = () => {
        firestore()
            .collection('area')
            .get()
            .then(querySnapshot => {
                console.log('Total area: ', querySnapshot.size);
                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('Area ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setDataArea(tempData)
                
            });
      }
    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>CHẤM CÔNG </Text>
            </View>
            <View style={{marginTop:10 , width:'90%'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.textInfort}>Họ tên : </Text>
                    <Text style={styles.textInfort}>{name}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',width:'80%'}}>
                    <Text style={styles.textInfort}>Địa chỉ : </Text>
                    <Text style={styles.textInfort}>{address}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.textInfort}>Số dt    : </Text>
                    <Text style={styles.textInfort}>{phonenumber}</Text>
                </View>
               
               <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Text style={styles.textInfort}>Khu trực : </Text>
                <TouchableOpacity style={styles.typeBtn}
                onPress={() => {
                    setClicked(!clicked)
                }}
            >
                <Text>{select}</Text>
                {clicked ? (
                    <Image source={require('../image/up-arrow.png')} style={{ width: 20, height: 20,marginLeft:50 }}></Image>
                ) : (
                    <Image source={require('../image/down.png')} style={{ width: 20, height: 20,marginLeft:50 }}></Image>
                )}

            </TouchableOpacity>
           
            </View>
            {clicked ? (<View style={styles.dropdownArea}>
                <FlatList data={dataarea}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.typeItem}
                            onPress={()=>{
                                setSelect(item.data.name)
                                setIdArea(item.id)
                                setClicked(false)
                                
                                
                            }}>
                                <Text>{item.data.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>) : null}
            
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.textInfort}>Số giờ làm : </Text>
                        <TextInput style={styles.inputStyle}
                            value={salary}
                            onChangeText={text => setSalary(text)}
                            keyboardType="numeric"
                        ></TextInput>
                </View>
            </View>
            
           
            
           
            <TouchableOpacity style={styles.pickBtn}
            onPress={()=>{onAddItems(),Alert.alert('Thông báo ' , 'Thành công ')}}
            >
                <Text style={{fontSize:20,fontWeight:'700'}}>Xong</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EmployeeSalaryDetail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        margin:10,
       
    },
    header: {
        height: 60,
        width: '100%',
        paddingLeft: 20,
        justifyContent: 'center',
        alignItems:'center',
    },
    headerText: {
        fontSize: 25,
        fontWeight: '800',
    },
    inputStyle: {
        width: '30%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop:10,
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
        marginTop: 40,
        backgroundColor:'#33CCFF'
    },
    typeBtn: {
        width: '50%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 10,
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
        width: 200,
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
    },
    textInfort:{
        fontSize:20,
        fontWeight:'700',
        margin:10,
        marginTop:10
    },
})