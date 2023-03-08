import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button, FlatList
} from 'react-native';
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native'
import Modal from 'react-native-modal'
/* man gop ban   */

const Items = ({ navigation }) => {
    const route = useRoute()
    const [banChuyen,setBanChuyen] = useState('')
    const [itemsClose, setItemsClose] = useState([]);
    const [itemBill, setDataBill] = useState([])
    const [banDuocChuyen,setBanDuocChuyen] = useState('')
    const [total,setTotal] = useState('')
    useEffect(() => {
        getItemsClose()
        getIdBill()
        setBanDuocChuyen(route.params.idBill)//ban duoc chuyen mon
        console.log(route.params.idBill)
    }, [])

    const getItemsClose = () => {
        firestore()
            .collection('table')
            // Filter results
            .where('status', '==', true)
            // Limit results
            .get()
            .then(querySnapshot => {
                console.log('Total Table Close: ', querySnapshot.size);
                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('Table ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setItemsClose(tempData)
            });
    }
    const getIdBill = (id) => {
        firestore()
            .collection('billtable')
            // Filter results
            .where('statusBill', '==', true)
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
                setDataBill(tempData)
            });
    }
    const checkIdBill = (id) => {
        itemBill.map(itm => {
            if (itm.data.idTable == id){
                console.log('idBill')
                console.log(itm.data.idBill)
                setBanChuyen(itm.data.idBill)
            }       
        })

    }
    // const getTotalItems = async() =>{
    //     const billq = await firestore().collection("billtable").doc(banChuyen).get();
    //     let total = billq._data.cart.length
    //     console.log(billq._data.cart)
    //     setTotal(total)
    // }
    const checkTable = (item) => {
        let check = false
        let tempData = []
        tempData = itemBill
        if (route.params.id == item) {
            check = true
            console.log('Id Table')
            console.log(route.params.id)
        }
        return check
    }
    return (
        <View style={{ flex: 1, margin: 5 }}>
            <View style={{
                width: '90%', height: 50, marginTop: 5, borderBottomWidth: 2, marginLeft: 10
                , justifyContent: 'center'
            }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>Chon ban can gop </Text>
            </View>

            <SafeAreaView style={{ height: '80%' }}>
                <FlatList data={itemsClose}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        {
                            if (checkTable(item.id) == false) {
                                return (
                                    <View style={styles.container}>

                                        <View style={styles.box}>
                                            <Text style={{ fontSize: 20, fontWeight: '700' }}>{item.data.name}</Text>
                                            <TouchableOpacity style={{
                                                height: 40, width: 100, borderRadius: 10, backgroundColor: '#FFFF99',
                                                marginTop: 10, alignItems: "center", justifyContent: 'center', flexDirection: 'row',
                                            }}
                                                onPress={() => {
                                                   
                                                    //saveBillTable(item.id,item.data.name)
                                                    navigation.navigate('SreenCombine',{banDuocChuyen: banDuocChuyen , banChuyen: banChuyen}) 
                                                }}
                                            >

                                                <Text style={{ fontSize: 18, fontWeight: '700' }}>Add </Text>
                                                <Image source={require('../image/cart-plus-solid.png')} style={{ width: 20, height: 20 }}></Image>
                                            </TouchableOpacity>
                                            <View style={{
                                                width: '90%', height: 50, marginTop: 5, borderBottomWidth: 2, marginLeft: 10
                                                , justifyContent: 'center'
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => { checkIdBill(item.id)
                                                }
                                                }
                                                >
                                                    <Text style={{ fontSize: 20, fontWeight: '700' }}>Check </Text>
                                                </TouchableOpacity>

                                            </View>

                                        </View>
                                    </View>
                                )
                            }
                        }

                    }}
                >
                </FlatList>
            </SafeAreaView>
        </View>


    )

}

export default Items;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection:'row'

    },
    box: {
        width: 150,
        height: 250,
        margin: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5
    },

})
//navigation.navigate('Oder') ,