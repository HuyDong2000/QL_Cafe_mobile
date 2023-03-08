import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button, FlatList
} from 'react-native';
import { useRoute } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import { create } from 'react-test-renderer';
/* man chuyen ban   */
import { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore';

const Items = ({ navigation }) => {
    const route = useRoute()
    const [itemsOpen, setItemsOpen] = useState([]);
    const [itemsClose, setItemsClose] = useState([]);
    const [idTable, setIdTable] = useState('')
    const [nameTable, setNameTable] = useState('')
    const [statusBill, setStatusBill] = useState(true)
    const [clicked, setClicked] = useState(false);
    const [itemBill, setDataBill] = useState([])
    useEffect(() => {
        getItemsOpen();
        getItemsClose()
        getItemsBill();
        console.log(route.params.Cart)
        console.log(route.params.id)
        console.log(route.params.idBill)
    }, [])

    const getItemsOpen = () => {
        firestore()
        .collection('table')
        // Filter results
        .where('status', '==', true)
        // Limit results
        .get()
        .then(querySnapshot => {
            console.log('Total Table Open: ', querySnapshot.size);
            let tempData = []
            querySnapshot.forEach(documentSnapshot => {
                console.log('Table ID: ', documentSnapshot.id, documentSnapshot.data());
                tempData.push({
                    id: documentSnapshot.id,
                    data: documentSnapshot.data(),
                })
            });
            setItemsOpen(tempData)
        });
    }
    const getItemsClose = () =>{
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
    const getItemsBill = () => {
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
    //const billId = uuid.v4()
    const saveBillTable = (idTable, nameTable) => {
        firestore()
            .collection('billtable')
            .doc(route.params.idBill)
            .set({
                idTable: idTable,
                nameTable: nameTable,
                statusBill: statusBill,
                idBill: route.params.idBill,
                statusProduct: true,
                cart: route.params.Cart,
            })
            .then(() => {
                console.log('User added!');
            });
        console.log(statusBill)
        console.log(idTable)
        console.log(nameTable)
        console.log(route.params.idBill)
        firestore()
            .collection('table')
            .doc(idTable)
            .update({
                status: true
            })
            .then(() => {
                console.log('User updated!');
            });
        firestore()
            .collection('table')
            .doc(route.params.id)
            .update({
                status: false
            })
            .then(() => {
                console.log('User updated!');
            });
        }



    const checkTable = (item) => {
        let check = false
        let tempData = []
        tempData = itemBill
        tempData.map(itm => {
            if (itm.data.idTable == item.id) {
                check = true
            }
        })
        return check
    }
    return (
        <View style={{flex : 1 ,margin : 5 }}>
             <View style={{width:'90%' , height : 50 ,marginTop:5,  borderBottomWidth: 2 ,marginLeft : 10
            ,justifyContent : 'center'}}>
                <Text style={{fontSize : 20 , fontWeight :'700' }}>Chuyển Sang Bàn </Text>
            </View>
            <SafeAreaView style={{height : '60%'}}>
            <FlatList data={itemsClose}
                numColumns={2}
                renderItem={({ item, index }) => {
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
                                        //navigation.navigate('Oder',{id: billId}) 
                                    }}
                                >

                                    <Text style={{ fontSize: 18, fontWeight: '700' }}>Add </Text>
                                    <Image source={require('../image/cart-plus-solid.png')} style={{ width: 20, height: 20 }}></Image>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                }}
            >
            </FlatList>
            </SafeAreaView>
            

            <View style={{width: '90%' , height : 50 , alignItem:'center' , justifyContent : 'center' ,backgroundColor:'#3399FF' ,marginLeft : 20,marginTop:10}}>
                <TouchableOpacity
                style={{alignItems:'center' }}
                onPress={() =>{navigation.navigate('Home')}}
                >
                    <Text style={{alignItems:'center'}}>Xong</Text>
                </TouchableOpacity>
            </View>
        </View>
        

    )
            
}

export default Items;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    box: {
        width: 130,
        height: 110,
        margin: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5
    },

})
//navigation.navigate('Oder') ,