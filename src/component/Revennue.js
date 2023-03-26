import React, { useEffect, useState } from 'react';
import { View, Button, Text, TouchableOpacity, Image, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRoute } from '@react-navigation/native'

const Revennue = () => {
    const route = useRoute()
    const [items, setItems] = useState([])
    const [data, setData] = useState([])
    const [data1, setData1] = useState(route.params.data)
    const [olditems, setOldItems] = useState(route.params.datarevenue)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [selectDate, setSelectData] = useState('Select date')
    const [selectDate1, setSelectData1] = useState('Select date')
    const [dataDate, setDataDate] = useState('')
    const [dataModth, setDataModth] = useState('')
    const [dataYear, setDataYear] = useState('')

    const [dataDateEnd, setDataDateEnd] = useState('')
    const [dataModthEnd, setDataModthEnd] = useState('')
    const [dataYearEnd, setDataYearEnd] = useState('')
    const [count, setCount] = useState(0)
    const [total, setTotal] = useState('')
    useEffect(() => {
       
        getTotal1()
    }, [count])
    const getData = () => {
        firestore()
            .collection('DoanhThu')
            .get()
            .then(querySnapshot => {
                console.log('Total Doanh Thu : ', querySnapshot.size);
                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('DoanhThu ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setItems(tempData)

            });

    }
    const getDataBill = () => {
        firestore()
            .collection('billtable')
            .get()
            .then(querySnapshot => {
                console.log('Total Bill: ', querySnapshot.size);
                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('Bill ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setData(tempData)
            });
    }
    const checkDate = (item) => {
        // let date = new Date()
        // let datenew = date.getDate()
        // let monthnew = date.getMonth() + 1
        let datedata = new Date(item.seconds * 1000 + item.nanoseconds / 1000000)
        let data1 = datedata.getDate()
        let month = datedata.getMonth() + 1
        if ((parseInt(data1) >= parseInt(dataDate) && parseInt(dataModth) == parseInt(month))
            && (parseInt(data1) <= parseInt(dataDateEnd) && parseInt(dataModthEnd) == parseInt(month))) {
            console.log(new Date(item.seconds * 1000 + item.nanoseconds / 1000000))
            return true
        } else {
            console.log('null')
        }
    }
    const CheckBill = () => {
        let tempData = []
        items.map(itm => {
            if (checkDate(itm.data.date) == true) {
                tempData.push(itm.data)
            }
        })
        console.log(tempData)
        setOldItems(tempData)
    }
    const getBill = (item) => {
        let check = false
        olditems.map(itm => {
            if (itm.idBill == item) {
                // console.log(itm.idBill)
                check = true
            }
            // console.log('api')
            // console.log(itm.idBill)
            // console.log(item)
        })
        return check
    }
    const getdata1 = () => {
        let tempData = []
        data.map(itm => {
            if (getBill(itm.id) == true) {
                console.log(itm.id)
                tempData.push(itm)
            } else {
                // console.log('null')
                // console.log(itm.id)
                // console.log(olditems)
                //console.log(getBill(itm.id))
                console.log(getBill(itm.id))
            }
        })
        setData1(tempData)
    }
    const getTotal = (datat) => {
       
        let total = 0
        datat.map(itm => {
            total = total + itm.data.qty * itm.data.price
        })
        return total
    }
    const getTotal1 = () => {
        let dt = 0
        let tempData = []
        tempData = route.params.datarevenue
        if (tempData.length > 0) {
            tempData.map(itm => {
                dt = dt + parseInt(itm.data.total)
            })
            
            setTotal(dt)
        }
        // console.log('tong doanh thu')
        // console.log(dt)
        // setTotal(dt)
    }
    const Format = (total) => {
        let x = total.toLocaleString('vi', { style: 'currency', currency: 'VND' });
        return x
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', margin: 5 ,backgroundColor:'#fff'}}>
            <View style={{ alignItems: 'center',marginTop:30,marginBottom:30 }}>
                <Text style={{ fontSize: 30, fontWeight: '700' }}>Doanh Thu</Text>
            </View>
            <SafeAreaView style={{ width: '100%', marginTop: 10, height: '75%' }}>
                <FlatList
                    data={data1}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.container}>

                                <View style={styles.box}>
                                    <View style={{ justifyContent: 'center', width: '40%', marginLeft: 30 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '700' }}>{item.data.nameTable}</Text>
                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row-reverse', alignSelf: 'center', marginLeft: 30 }}>
                                        <TouchableOpacity
                                            onPress={() => { navigation.navigate('BillTableDetail', { id: item.id }) }}
                                        >
                                            <Image source={require('../image/angle-right-solid.png')}
                                                style={{ width: 20, height: 20, marginTop: 4, marginRight: 10 }}></Image>
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#009966', marginRight: 10 }}>{'$ ' + Format(getTotal(item.data.cart))}</Text>

                                    </View>
                                </View>
                            </View>
                        )
                    }
                    }
                />
            </SafeAreaView>
            <View style={{
                flexDirection: 'row', width: '90%', height: 50, alignItems: 'center',
                marginBottom: 20, marginLeft: 10
            }}>
                <Text style={{ fontSize: 20, fontWeight: '700' ,marginLeft:10}}>Total :</Text>
                <Text style={{ marginLeft: 180, fontSize: 20, fontWeight: '700', color: '#33CC66' }}>{Format(total)}</Text>
            </View>
        </View>

    )
}

export default Revennue

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    box: {
        width: '90%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 10,
        flexDirection: 'row',


    }
})