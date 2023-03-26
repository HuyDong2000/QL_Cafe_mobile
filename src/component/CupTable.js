import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button, FlatList
} from 'react-native';
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native'
import uuid from 'react-native-uuid'
/* man tach ban   */

const CupTable = ({ navigation }) => {
    const route = useRoute()
    const [banChuyen,setBanChuyen] = useState('')
    const [itemsClose, setItemsClose] = useState([]);
    const [itemBill, setDataBill] = useState([])
    const [banDuocChuyen,setBanDuocChuyen] = useState('')
    const [total,setTotal] = useState('')
    const [statusBill, setStatusBill] = useState(true)
    useEffect(() => {
        getItemsClose()
        getIdBill()
        setBanDuocChuyen(route.params.idBill)//ban can tach
        console.log(route.params.idBill)
    }, [])

    const getItemsClose = () => {
        firestore()
            .collection('table')
            // Filter results
            .where('status', '==', false)
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
    const billId = uuid.v4()
    const saveBillTable = (idTable, nameTable) => {
        firestore()
            .collection('billtable')
            .doc(billId)
            .set({
                idTable: idTable,
                nameTable: nameTable,
                statusBill: statusBill,
                idBill: billId,
                statusProduct: true,
                cart: [],
            })
            .then(() => {
                console.log('User added!');
            });
        console.log(statusBill)
        console.log(idTable)
        console.log(nameTable)
        console.log(billId)
        firestore()
            .collection('table')
            .doc(idTable)
            .update({
                status: true
            })
            .then(() => {
                console.log('User updated!');
            });
    }
    return (
        <View style={{ flex: 1, margin: 5 }}>
            <View style={{
                width: '90%', height: 50, marginTop: 5, borderBottomWidth: 2, marginLeft: 10
                , justifyContent: 'center'
            }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>Tách sang bàn </Text>
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
                                                   
                                                    saveBillTable(item.id,item.data.name)
                                                    navigation.navigate('ScreenCup',{banCanTach: banDuocChuyen , banDuocTach: billId}) 
                                                }}
                                            >

                                                <Text style={{ fontSize: 18, fontWeight: '700' }}>Add </Text>
                                                <Image source={require('../image/cart-plus-solid.png')} style={{ width: 20, height: 20 }}></Image>
                                            </TouchableOpacity>

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

export default CupTable;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection:'row'

    },
    box: {
        width: 150,
        height: 150,
        margin: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5
    },

})
//navigation.navigate('Oder') ,