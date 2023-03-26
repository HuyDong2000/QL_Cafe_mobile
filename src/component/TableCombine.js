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
    const [clicked, setClicked] = useState(false);
    const [tableClose, setTableClose] = useState([])
    const [dataarea,setDataArea] = useState([])
    const [select,setSelect] = useState('Select Items')
    useEffect(() => {
        getItemsClose()
        getIdBill()
        getItemsArea()
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
                <Text style={{ fontSize: 20, fontWeight: '700' }}>Chọn bàn cần gộp </Text>
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
            <SafeAreaView >
                <FlatList data={tableClose}
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
                                            <View style={{ height: 40, width: 100, borderRadius: 10, backgroundColor: '#FFFF99',
                                                marginTop: 10, alignItems: "center", justifyContent: 'center', flexDirection: 'row',}}>
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
        height: 150,
        margin: 10,
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