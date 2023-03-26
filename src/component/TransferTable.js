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
    const [tableClose, setTableClose] = useState([])
    const [dataarea,setDataArea] = useState([])
    const [select,setSelect] = useState('Select Items')

    useEffect(() => {
        getItemsOpen();
        getItemsClose()
        getItemsBill();
        getItemsArea()
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
    const dataTableClose = (id) => {
        let tempData = []
        itemsClose.map(itm => {
            if (itm.data.idArea == id) {
                tempData.push(itm)
            }
        })
        setTableClose(tempData)

    }
    return (
        <View style={{ flex: 1, margin: 5 }}>
            <View style={{
                width: '90%', height: 50, marginTop: 5, borderBottomWidth: 2, marginLeft: 10
                , justifyContent: 'center'
            }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>Chuyển Sang Bàn </Text>
            </View>
            <TouchableOpacity style={styles.typeBtn}
                onPress={() => {
                    setClicked(!clicked)
                }}
            >
                <Text>{select}</Text>
                {clicked ? (
                    <Image source={require('../image/up-arrow.png')} style={{ width: 20, height: 20 }}></Image>
                ) : (
                    <Image source={require('../image/down.png')} style={{ width: 20, height: 20 }}></Image>
                )}

            </TouchableOpacity>
            {clicked ? (<View style={styles.dropdownArea}>
                <FlatList data={dataarea}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.typeItem}
                                onPress={() => {
                                    setSelect(item.data.name)
                                    //setIdArea(item.id)
                                    setClicked(false)
                                    dataTableClose(item.id)

                                }}>
                                <Text>{item.data.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>) : null}
            <SafeAreaView style={{ height: '70%' }}>
                <FlatList data={tableClose}
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

                                            saveBillTable(item.id, item.data.name)
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


            <View style={{ width: '90%', height: 50, alignItem: 'center', justifyContent: 'center', backgroundColor: '#3399FF', marginLeft: 20, marginTop: 10 }}>
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <Text style={{ alignItems: 'center' }}>Xong</Text>
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
    pickBtn: {
        width: '90%',
        height: 50,
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    typeBtn: {
        width: '90%',
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
        height: 100,
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
    dropdownArea: {
        elevation: 5,
        marginTop: 20,
        height: 150,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
    },

})
//navigation.navigate('Oder') ,