import React from 'react'
import {
    Text, View, Image, TouchableOpacity, StyleSheet,FlatList
} from 'react-native';
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native'
/*
    Màn hình Check món đã gọi :  
    + Check món đã gọi đã hoàn thành chưa 
    + Xác nhận món các món đã gọi đã được hoàn thành 
*/ 
const CheckTableProduct = ({navigation}) => {
    const [items,setData] = useState([])

    useEffect(() =>{
        getData()
    },[])
    const getData = () => {
        firestore()
            .collection('billtable')
            // Filter results
            .where('statusProduct', '==', true)
            // Limit results
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
    const getTotal = (datat) =>{
        console.log('cart')
        let total = 0
        datat.map(itm => {
            total = total + itm.data.qty * itm.data.price
        })
        let x = total.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        return x
        
       
        
    }
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={items}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.container}>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('CheckOderDetail', { id: item.id }) }}
                            >
                                <View style={styles.box}>
                                    <View style={{ justifyContent: 'center', width: '40%', marginLeft: 30 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '700' }}>{item.data.nameTable}</Text>
                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row-reverse', alignSelf: 'center', marginLeft: 30 }}>
                                        <Image source={require('../image/angle-right-solid.png')}
                                            style={{ width: 20, height: 20, marginTop: 4, marginRight: 10 }}></Image>
                                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#009966' }}>{'$' + getTotal(item.data.cart)}</Text>

                                    </View>
                                </View>

                            </TouchableOpacity>

                        </View>
                    )
                }}
            />
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={{
                    width: '90%', height: 50, backgroundColor: '#3399FF', marginBottom: 10, alignItems: 'center', justifyContent: 'center'
                    , borderRadius: 10
                }}
                    onPress={() => { getData()}}
                >
                    <Text style={{fontSize: 20 , fontWeight : '700'}}>Refresh</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CheckTableProduct;
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
        flexDirection:'row',
        

    }
})

{/* <View style={styles.container}>
            <View style={styles.box}>
                <View style={{justifyContent:'center',width : '50%' , marginLeft:30}}>
                    <Text style={{fontSize: 20 , fontWeight:'700'}}>Ban 1</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:50 , alignSelf:'center'}}>
                    <Text style={{fontSize:20 , fontWeight:'700'}}>$700</Text>
                    <Image source={require('../image/angle-right-solid.png')} 
                    style={{width:20,height:20,marginTop :4,marginLeft:10}}></Image>
                </View>
            </View>
        </View> */}