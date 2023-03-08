import React from 'react';
import {
    Text, StyleSheet, View , FlatList,TouchableOpacity,SafeAreaView} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
const PrintBill = ({navigation}) =>{
    const route = useRoute()
    const [items,setItems] = useState([])
    const [total,setTotal] = useState(0)
    const [qtytotal,setQtyTotal] = useState('12')
    useEffect(() => {
        setItems(route.params.Cart)
       getTotal()
       getQty()
        console.log('Print Screen')
        console.log(route.params.Cart)
        console.log(route.params.name)
        
    }, [qtytotal])
    const FormatNumber = (number) =>{
        let x = number.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        return x  
    }
    const FormatNumber1 = (number) =>{
       let number1 = number * 1
        let x = number1.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        return x  
    }
    const getTotal = () =>{
        let Total = 0
        items.map(itm =>{
            let temp =  (itm.data.qty * itm.data.price)
            Total = Total + temp
        })
        console.log(Total)
        let x = Total.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        return x
    }
    const getTotaladd = () =>{
        let Total = 0
        items.map(itm =>{
            let temp =  (itm.data.qty * itm.data.price)
            Total = Total + temp
        })
        console.log(Total)
        //let x = Total.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        return Total
    }
    const getQty = () =>{
        let sl = 0
        items.map(itm => {
            let temp = itm.data.qty
            sl = sl + temp
        })
        return sl
    }
    const addItems = () =>{
        let datatime = new Date()
        console.log(datatime.toString())
        let qtyy = getQty()
        let totall = getTotaladd()
        firestore()
            .collection('DoanhThu')
            .add({
                idBill: route.params.id,
                qty: qtyy,
                total: totall,
                date: datatime
            })
            .then(() => {
                console.log('User added!');
            });
        firestore()
            .collection('table')
            .doc(route.params.idTable)
            .update({
                status: false,
            })
            .then(() => {
                console.log('User updated!');
            });
        firestore()
            .collection('billtable')
            .doc(route.params.id)
            .update({
                statusBill: false,
                statusProduct: false
            })
            .then(() => {
                console.log('User updated!');
            });
    } 
    return(
        <View style={styles.container}>
           <Text style={{fontSize:30 ,fontWeight:'700'}}>Cofe Lá Xanh</Text>
           <Text style={{fontSize:16 , fontWeight:'500',marginTop:20}}>KCN BẮC ĐÔNG PHÚ , TT Tân Phú</Text>
           <Text style={{fontSize:16 , fontWeight:'500',marginTop:20}}>0395671248</Text>
           <Text style={{fontSize:30 , fontWeight:'500',marginTop:20}}>HÓA ĐƠN BÀN</Text>
           
           <View style={styles.box}>
               <View style={{width :'40%' ,alignItems:'center'}}><Text style={styles.titletext}>Tên</Text></View>
               <View style={{width :'10%',alignItems:'center'}}><Text style={styles.titletext}>SL</Text></View>
               <View style={{width :'25%',alignItems:'center'}}><Text style={styles.titletext}>Giá</Text></View>
               <View style={{width :'25%',alignItems:'center'}}><Text style={styles.titletext}>Tổng</Text></View>
           </View>
           <SafeAreaView style={{height:220}}>
           <FlatList
           style={{width:'90%'}}
            data={items}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.box1}>
                            <View style={{width :'40%' ,alignItems:'center'}}><Text style={styles.titletext}>{item.data.name}</Text></View>
                            <View style={{width :'10%',alignItems:'center'}}><Text style={styles.titletext}>{item.data.qty}</Text></View>
                            <View style={{width :'25%',alignItems:'center'}}><Text style={styles.titletext}>{FormatNumber1(item.data.price)}</Text></View>
                            <View style={{width :'25%',alignItems:'center'}}><Text style={styles.titletext}>{FormatNumber(item.data.qty * item.data.price)}</Text></View>
                        </View>
                        )
                    }}
                >
                </FlatList>
            </SafeAreaView>
            <View style={{}}>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}><Text style={{ fontSize: 20, fontWeight: '700' }}>Tổng : </Text>
                    <Text style={{ marginLeft: '50%', fontSize: 20, fontWeight: '700', color: '#339933' }}>{getTotal()}</Text>
                    <Text>{qtytotal}</Text>
                </View>
                <View style={{ marginBottom: '10%', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Qúy khách vui lòng khiểm tra lại hóa đơn trước khi thanh toán.</Text>
                    <Text style={{ fontSize: 18 }}>Hẹn gặp lại quý khách lần sau </Text>
                </View>
                <TouchableOpacity style={{width:350,height:50 ,alignItems:'center',backgroundColor:'#33CC66',justifyContent:'center',borderRadius:10}}
                onPress ={() =>{
                    addItems()
                    navigation.navigate('Home')
                }}
                >
                    <Text>Xong</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default PrintBill

const styles = StyleSheet.create({
    container: {
        flex :1,  
        alignItems:'center',
        margin:10,
        backgroundColor:'#fff'
    },
    box:{
        width : '90%',
        flexDirection:'row',
        alignItems:'center',
       
        marginTop:10
    },
    box1:{
        width : '100%',
        flexDirection:'row',
        alignItems:'center',
        
        marginTop:10
    },
    titletext:{
        fontSize:18,
        fontWeight:'600'
    }
})