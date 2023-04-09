import React, { useEffect, useState } from 'react';
import { View, Button, Text, TouchableOpacity, Image, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useRoute} from '@react-navigation/native'

const RevennueToDay = ({navigation}) => {
    //const route = useRoute()
    const [items, setItems] = useState([])
    const [data, setData] = useState([])
    const [dataBill, setDataBill] = useState([])
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
    const [Month1,setMonth] = useState('')
    const [totalrevenue,setTotalRevenue] = useState('')

    const [RevenueDay,setRevenueDay] = useState([])
    const [RevenueMonth,setRevenueMonth] = useState([])
    const [RevenueTotal,setRevenueTotal] = useState([])

    const [BillDay,setBillDay] = useState([])
    const [BillMonth,setBillMonth] = useState([])
    const [BillTotal,setBillTotal] = useState([])
    useEffect(() => {
        getDataBill()
        getBill()
        CheckRevenue()
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

    const getBill = () => {
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
                setDataBill(tempData)
            });
    }
    const getDataBill = () => {
        firestore()
            .collection('DoanhThu')
            .get()
            .then(querySnapshot => {
                console.log('Total Doanh thu : ', querySnapshot.size);
                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('Doanh thu ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setData(tempData)
            });
    }
    const checkDate = (item) => {
        let datedata = new Date(item.seconds * 1000 + item.nanoseconds / 1000000)
        let data1 = datedata.getDate()
        let month = datedata.getMonth() + 1
        if(parseInt(month) == parseInt(dataModth) ){//trong thang
            if(parseInt(data1) >= parseInt(dataDate) && parseInt(data1) <= 31){
                return true
            }
        }
        if(parseInt(month) > parseInt(dataModth)&&parseInt(month) < parseInt(dataModthEnd)){//thang trong khoang
            return true
        }
        if(parseInt(month) == parseInt(dataModthEnd) ){//thang ket thuc
            if(parseInt(data1) <= parseInt(dataDateEnd)){
                return true
            }
        }
    }
    const FormatDate = (item) =>{
        let datedata = new Date(item.seconds * 1000 + item.nanoseconds / 1000000)
        let data1 = datedata.getDate()
        return data1 

    }
    const FormatMonth = (item) =>{
        let datedata = new Date(item.seconds * 1000 + item.nanoseconds / 1000000)
        let month = datedata.getMonth() + 1
        return month 

    }
    const FormatYear = (item) =>{
        let datedata = new Date(item.seconds * 1000 + item.nanoseconds / 1000000)
        let year = datedata.getFullYear()
        return year 

    }
    const Checkweek = (item) =>{
        let datedata = new Date(item.seconds * 1000 + item.nanoseconds / 1000000)
        let data = datedata.getDay()
        console.log(data)
    }
    const CheckBill = () => {
        let totalrevenueday = 0
        let totalrevenue = 0
        let tempData = 0
        let datadate = new Date()
        let data1 = datadate.getDate()
        let month = datadate.getMonth() + 1
        data.map(itm => {
            if (parseInt(FormatDate(itm.data.date)) ==parseInt(data1) && parseInt(FormatMonth(itm.data.date)) == parseInt(month)) {
                totalrevenueday = totalrevenueday + parseInt(itm.data.total)
            }
            if (parseInt(FormatMonth(itm.data.date)) == parseInt(month)) {
                tempData = tempData + parseInt(itm.data.total)
            }
            if (checkDate(itm.data.date) == true) {
                //tempData.push(itm)
                totalrevenue = totalrevenue + parseInt(itm.data.total)
            }
            
        })
        setMonth(tempData)
        setTotalRevenue(totalrevenue)
        setTotal(totalrevenueday)
        // console.log('view data ')
        // console.log(tempData)
        // setOldItems(tempData)
    }
    
    const CheckRevenue = () =>{
        let datadate = new Date()
        let data1 = datadate.getDate()
        let month = datadate.getMonth() + 1
        let RevenueDay = []
        let RevenueMonth = []
        let RevenueTotal = []
        data.map(itm =>{
            if(FormatDate(itm.data.date) == data1){
                RevenueDay.push(itm)
            }
            if(FormatMonth(itm.data.date) == month){
                RevenueMonth.push(itm)
            }
            RevenueTotal.push(itm)
        })
        
        setRevenueDay(RevenueDay)
        setRevenueMonth(RevenueMonth)
        setRevenueTotal(RevenueTotal)
    }
    const CheckRevenueDay = (id) =>{
        let check = false
        RevenueDay.map(itm =>{
            if(itm.data.idBill == id)
            {
                check = true
            }
        })
        return check
    }
    const CheckRevenueMonth = (id) =>{
        let check = false
        RevenueMonth.map(itm =>{
            if(itm.data.idBill == id)
            {
                check = true
            }
        })
        return check
    }
    const CheckRevenueTotal = (id) =>{
        let check = false
        RevenueTotal.map(itm =>{
            if(itm.data.idBill == id)
            {
                check = true
            }
        })
        return check
    }
    const getDataBillTitle = () =>{
        let BillDay = []
        let BillMonth = []
        let BillTotal = []
        dataBill.map(itm =>{
            if(CheckRevenueDay(itm.id) == true){
                BillDay.push(itm)
            }
            if(CheckRevenueMonth(itm.id) == true){
                BillMonth.push(itm)
            }
            if(CheckRevenueTotal(itm.id) == true){
                BillTotal.push(itm)
            }
        })
       
        setBillDay(BillDay)
        setBillMonth(BillMonth)
        setBillTotal(BillTotal)
    }
    const Format = (total) => {
        let x = total.toLocaleString('vi', { style: 'currency', currency: 'VND' });
        return x
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', margin: 10 ,backgroundColor:'#fff'}}>
            <View style={{marginTop:30}}>
                <Text style={{fontSize:25,fontWeight:'700'}}>Doanh Thu </Text>
            </View>
            <View style={{ flexDirection: 'row',alignItems:'center'}}>
                <Text style={{marginTop:20,fontSize:18,fontWeight:'700'}}>Từ </Text>
                <View style={{
                    width: '40%', height: 50, backgroundColor: '#fff', borderRadius: 10, flexDirection: 'row'
                    , marginTop: 20, alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginRight: 5, marginLeft: 10 }}>{selectDate}</Text>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Image source={require('../image/date.jpg')} style={{ width: 30, height: 30}}></Image>
                    </TouchableOpacity>


                </View>
               <Text style={{marginTop:20,fontSize:18,fontWeight:'700'}}>Đến </Text>
                <View style={{
                    width: '40%', height: 50, backgroundColor: '#fff', borderRadius: 10, flexDirection: 'row'
                    , marginTop: 20, alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginRight: 5, marginLeft: 10 }}>{selectDate1}</Text>
                    <TouchableOpacity onPress={() =>{showDatePickerEnd(),CheckRevenue()}}>
                        <Image source={require('../image/date.jpg')} style={{ width: 30, height: 30 }}></Image>
                    </TouchableOpacity>


                </View>
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
                    onPress={() => {CheckBill() ,getDataBillTitle()}}>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>Kiểm tra </Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '90%', alignItems: 'center', marginTop: 20 }}>
                <View style={styles.box}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../image/revenue.jpg')} style={{ width: 50, height: 50, marginLeft: 30 }}></Image>
                    </View>
                    <View style={{ justifyContent: 'center' ,width:180}}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 20,color:'#66CC00' }}>{Format(total)}</Text>
                        <Text style={styles.Texttitle}>Doanh thu hôm nay</Text>
                    </View>
                    <TouchableOpacity style={styles.btnclick} onPress={() => { navigation.navigate('Revennue', { data: BillDay , datarevenue: RevenueDay}) }}>
                        <Image source={require('../image/angle-right-solid.png')} style={{ width: 20, height: 20}}></Image>
                    </TouchableOpacity>
                </View>

                <View style={styles.box}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../image/revenue.jpg')} style={{ width: 50, height: 50, marginLeft: 30 }}></Image>
                    </View>
                    <View style={{ justifyContent: 'center' ,width:180}}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 20,color:'#66CC00' }}>{Format(Month1)}</Text>
                        <Text style={styles.Texttitle}>Doanh thu tháng này</Text>
                    </View>
                    <TouchableOpacity style={styles.btnclick} onPress={() => { navigation.navigate('Revennue', { data: BillMonth , datarevenue: RevenueMonth}) }}>
                        <Image source={require('../image/angle-right-solid.png')} style={{ width: 20, height: 20}}></Image>
                    </TouchableOpacity>
                </View>

                <View style={styles.box}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../image/revenue.jpg')} style={{ width: 50, height: 50, marginLeft: 30 }}></Image>
                    </View>
                    <View style={{ justifyContent: 'center' ,width:180}}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 20,color:'#66CC00' }}>{Format(totalrevenue)}</Text>
                        <Text style={styles.Texttitle}>Doanh thu tổng</Text>
                    </View>
                    <TouchableOpacity style={styles.btnclick} onPress={() => { navigation.navigate('Revennue', { data: BillTotal , datarevenue: RevenueTotal}) }}>
                        <Image source={require('../image/angle-right-solid.png')} style={{ width: 20, height: 20 }}></Image>
                    </TouchableOpacity>


                </View>

            </View>
           
            {/* <View style={{
                flexDirection: 'row', width: '90%', height: 50, alignItems: 'center',
                marginBottom: 20, marginLeft: 10
            }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>Total :</Text>
                <Text style={{ marginLeft: 180, fontSize: 20, fontWeight: '700', color: '#33CC66' }}>{Format(getTotal(olditems))}</Text>
            </View> */}
        </View>

    )
}

export default RevennueToDay
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
        elevation: 5,
        marginTop:10,
        alignItems:'center',
        flexDirection:'row'
    },
    Texttitle:{
        fontSize:15,
        fontWeight:'700',
        marginLeft:20,
        
    },
    btnclick:{
        width:30,
       
    }
})