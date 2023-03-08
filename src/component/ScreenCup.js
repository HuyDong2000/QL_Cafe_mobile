import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native'

const ScreenCup = ({navigation}) => {
    const route = useRoute()
    const [itemsOpen, setItemsOpen] = useState([])
    const [itemsClose, setItemsClose] = useState([])
    const [check,setCheck] = useState(0)
    useEffect(() => {
        getItemsBill()
    }, [check])
    const getItemsBill = async () => {
        const bill = await firestore().collection('billtable').doc(route.params.banCanTach).get()
        setItemsOpen(bill._data.cart)
        console.log('Cart ')
        console.log(bill._data.cart)
    }
    const updateStatus = async(item , index) =>{
       const bill = await firestore().collection("billtable").doc(route.params.banDuocTach).get();
        //console.log(route.params.banDuocTach)
        console.log(bill._data.cart)
        let tempData = []
        tempData = bill._data.cart
        // if(tempData.length > 0){
        //     let existing = false
        //     tempData.map(itm => {
        //         if(item.id == item.id){
        //             existing = true
        //             itm.data.qty = item.data.qty
        //         }
        //     })
        //     if(existing = false){
        //         tempData.push(item)
        //     }
        //     console.log(tempData)
        //     firestore().collection('billtable').doc(route.params.banDuocTach).update({
        //         cart: tempData
        //     })
        // }else{
            //tempData.push(item)
       // }
        if (tempData.length > 0) {
            let existing = false
            tempData.map(itm => {
                if (itm.id == item.id) {
                    existing = true
                    itm.data.qty = itm.data.qty + item.data.qty
                }
            })
            if (existing == false) {
                tempData.push(item)
            }
            firestore().collection('billtable').doc(route.params.banDuocTach).update({
                cart: tempData
            })
        } else {
            tempData.push(item)
        }
        console.log(tempData)
        firestore().collection('billtable').doc(route.params.banDuocTach).update({
            cart: tempData
        })
       
        const billq = await firestore().collection("billtable").doc(route.params.banCanTach).get();
        console.log(billq._data.cart)
        let tempData1 = []
        tempData1 = billq._data.cart
        tempData1.splice(index,item.data.qty)
        firestore().collection('billtable').doc(route.params.banCanTach).update({
            cart: tempData1
          })
    }
    const updateData = async() =>{
        const billq = await firestore().collection("billtable").doc(route.params.banChuyen).get();
        console.log(billq._data.cart.length)
        if(billq._data.cart.length > 0){
            navigation.navigate('Home')
            //console.log(billq._data.idTable)
        }else{
            let id = billq._data.idTable
            firestore()
                .collection('table')
                .doc(id)
                .update({
                    status: false,
                })
                .then(() => {
                    console.log('User updated!');
                });
            firestore()
                .collection('billtable')
                .doc(route.params.banChuyen)
                .delete()
                .then(() => {
                  console.log('User deleted!');
                });
            //console.log(billq._data.idTable)
            navigation.navigate('Home')
        }
    }
    return (
        <View style={{ flex: 1, margin: 10, alignItems: 'center' }}>
            <View style={{ width: '90%' }}>
                
            </View>
            <View style={{ width: '90%', height: '80%' }}>
                <SafeAreaView>
                    <FlatList
                        data={itemsOpen}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.box}>
                                    <View style={{ width: 200, alignSelf: 'center', flexDirection: 'row' }}>
                                        <Image source={{ uri: item.data.imageUrl }}
                                            style={styles.itemImage}
                                        />
                                        <View style={{ width: '60%', margin: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.data.name}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 18, color: 'green', fontWeight: '700' }}>
                                                    {'$' + item.data.qty}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.addRemoveViewL}>
                                        <TouchableOpacity style={[styles.addToCartBtn, { width: 30, justifyContent: 'center', alignItems: 'center' }]}
                                            onPress={() => { setCheck(check +1) , updateStatus(item,index)}}
                                        >
                                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>+</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            )
                        }}
                    >

                    </FlatList>
                </SafeAreaView>
                <TouchableOpacity style={{
                    width: '100%', height: 50, backgroundColor: '#00CCCC', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 10
                }}
                onPress={() =>{getItemsBill()}}
                >
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '100%', height: 50, backgroundColor: '#00CCCC', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 10,marginTop:10
                }}
                onPress ={() =>{
                    navigation.navigate('Home')
                }}
                >
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>Xong</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ScreenCup

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    btnTab: {
        width: 100,
        elevation: 4,
        backgroundColor: '#fff',
        marginTop: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },
    btnText: {
        fontSize: 16,
        fontWeight: '700'
    },
    box: {
        width: '90%',
        height: 100,
        alignSelf: 'center',
        flexDirection: 'row',
        elevation: 4,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,

    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        margin: 5,
    },
    titleSafeAreaView: {
        flex: 1,
        height: 180,
        marginTop: 10,
        marginBottom: 10,
    },
    addRemoveViewL: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30

    },
    addToCartBtn: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    dropdownArea: {
        elevation: 5,
        marginTop: 5,
        height: 200,
        width: '40%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 30,
        
        
    },
    typeItem: {
        width: '85%',
        height: 50,
        borderBottomWidth: 0.2,
        borderBottomColor: '#8e8e8e',
        alignSelf: 'center',
        justifyContent: 'center',
    },
})