import React, { useEffect, useState } from 'react';
import { View, Button, Text, TouchableOpacity, Image, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const Revennue = () => {
    const [items, setItems] = useState([])
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [olditems, setOldItems] = useState([])
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
        getData()
        getDataBill()
        CheckBill()
    }, [count])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const showDatePickerEnd = () => {
        setDatePickerVisibility1(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        setCount(count + 1)
    };
    const hideDatePickerEnd = () => {
        setDatePickerVisibility1(false)
        setCount(count + 1)
    };
    const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);

        const dt = new Date(date)
        const x = dt.toISOString().split('T')
        const x1 = x[0].split('-')
        let date01 = parseInt(x1[2]) + 1
        console.log(x1[2] + '/' + x1[1] + '/' + x1[0])
        setSelectData(x1[2] + '/' + x1[1] + '/' + x1[0])
        setDataDate(x1[2])
        setDataModth(x1[1])
        setDataYear(x1[0])
        hideDatePicker();

        // console.warn("A date has been picked: ", date01);
    };
    const handleConfirmEnd = (date) => {
        //console.warn("A date has been picked: ", date);
        const dt = new Date(date)
        const x = dt.toISOString().split('T')
        const x1 = x[0].split('-')
        let date01 = parseInt(x1[2]) + 1
        console.log(x1[2] + '/' + x1[1] + '/' + x1[0])
        setSelectData1(x1[2] + '/' + x1[1] + '/' + x1[0])
        setDataDateEnd(x1[2])
        setDataModthEnd(x1[1])
        setDataYearEnd(x1[0])
        hideDatePickerEnd();
    };

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
        console.log('cart')
        let total = 0
        datat.map(itm => {
            total = total + itm.data.qty * itm.data.price
        })
        return total
    }
    const getTotal1 = () => {
        let dt = 0
        if (olditems.length > 0) {
            olditems.map(itm => {
                dt = dt + parseInt(itm.total)
            })
            console.log('daonh thu tong ')
            console.log(dt)
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
        <View style={{ flex: 1, alignItems: 'center', margin: 10 }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: '700' }}>Doanh Thu</Text>
            </View>
            <View style={{
                width: '60%', height: 50, backgroundColor: '#fff', borderRadius: 10, flexDirection: 'row'
                , marginTop: 20, alignItems: 'center'
            }}>
                <Text style={{ fontSize: 18, fontWeight: '700', marginRight: 20, marginLeft: 20 }}>{selectDate}</Text>
                <TouchableOpacity onPress={showDatePicker}>
                    <Image source={require('../image/date.jpg')} style={{ width: 30, height: 30, marginLeft: 30 }}></Image>
                </TouchableOpacity>


            </View>
            <View style={{
                width: '60%', height: 50, backgroundColor: '#fff', borderRadius: 10, flexDirection: 'row'
                , marginTop: 20, alignItems: 'center'
            }}>
                <Text style={{ fontSize: 18, fontWeight: '700', marginRight: 20, marginLeft: 20 }}>{selectDate1}</Text>
                <TouchableOpacity onPress={showDatePickerEnd}>
                    <Image source={require('../image/date.jpg')} style={{ width: 30, height: 30, marginLeft: 30 }}></Image>
                </TouchableOpacity>


            </View>

            <View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                <DateTimePickerModal
                    isVisible={isDatePickerVisible1}
                    mode="date"
                    onConfirm={handleConfirmEnd}
                    onCancel={hideDatePickerEnd}
                />
                <TouchableOpacity style={{
                    backgroundColor: '#3399CC', width: 320, height: 50, marginTop: 10, alignItems: 'center', justifyContent: 'center',
                    borderRadius: 10
                }}
                    onPress={() => { getdata1(), getTotal1(), setCount(count + 1) }}>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>Kiem Tra</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={{ width: '100%', marginTop: 10, height: 330 }}>
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
                <Text style={{ fontSize: 20, fontWeight: '700' }}>Total :</Text>
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