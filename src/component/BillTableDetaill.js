import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native'
import Modal from 'react-native-modal'
const BillTableDetail = ({navigation}) => {
    const isFocused = useIsFocused()
    const [cartList, setCartList] = useState([])
    const route = useRoute()
    const [clicked, setClicked] = useState(false);
    const [nameTable,setNameTable] = useState('')
    const [count,setCount] = useState(0)
    useEffect(() => {
        getCartItem()
        
    }, [count])
  
    const addItem = async (item) => {
       
        const bill = await firestore().collection('billtable').doc(route.params.id).get()
        let tempData = []
        tempData = bill._data.cart
        tempData.map(itm => {
            if (itm.id == item.id) {
                itm.data.qty = itm.data.qty + 1
            }
        })
        firestore().collection('billtable').doc(route.params.id).update({
            cart: tempData
        })
        setCount(count + 1)
       
    }
    const removeItem = async (item) => {
        
        const bill = await firestore().collection('billtable').doc(route.params.id).get()
        let tempData = []
        tempData = bill._data.cart
        tempData.map(itm => {
            if (itm.id == item.id) {
                itm.data.qty = itm.data.qty - 1
            }
        })
        firestore().collection('billtable').doc(route.params.id).update({
            cart: tempData
        })
        setCount(count + 1)
       
    }
    const deleteItem = async (item) => {
        const bill = await firestore().collection('billtable').doc(route.params.id).get()
        let tempData = []
        tempData = bill._data.cart
        tempData.splice(index, 1)
        firestore().collection('billtable').doc(route.params.id).update({
            cart: tempData
        })
        setCount(count + 1)
    }
    const getCartItem = async () => {
        const bill = await firestore().collection('billtable').doc(route.params.id).get()
        setCartList(bill._data.cart)
        setNameTable(bill._data.idTable)
        console.log('Cart ')
        console.log(bill._data.cart)
    }
    const ThanhToan = () => {
        firestore()
            .collection('billtable')
            .doc(route.params.id)
            .update({
                statusBill: false,
            })
            .then(() => {
                console.log('Thanh toan thanh cong');
            });
            navigation.navigate('BillTable')
    }
    const handleModal = () => setClicked(() => !clicked);
    return (
        <View style={styles.container}>
            <View style={{
                width: '90%', height: 50, flexDirection: 'row', alignItems: 'center'
                , marginLeft: 20, marginTop: 5
            }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('BillTable') }}
                >
                    <Image source={require('../image/back.png')} style={{ width: 25, height: 25, marginLeft: 5 }}>
                    </Image>
                </TouchableOpacity>

                <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 40 }}>BillTableDetail</Text>

                {/* <TouchableOpacity
                    onPress={() => { setClicked(true) }}
                >
                    <Image source={require('../image/dots.png')} style={{ width: 25, height: 25, marginLeft: 130 }}>
                    </Image>
                </TouchableOpacity> */}
                <View >
                {/* <Modal isVisible ={clicked}
                style={{marginBottom : '120%',marginLeft : '60%' , width : 350 , height : 250}}
                >
                  <View style={styles.dropdownArea}>
                        <TouchableOpacity style={styles.typeItem}
                        onPress = {() =>{
                            
                            setClicked(false)
                            navigation.navigate('TransforTable', { Cart: cartList , id: nameTable ,idBill: route.params.id})
                        }}
                            
                        >
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>Chuyển Bàn </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.typeItem}
                        onPress = {() =>{
                            
                            setClicked(false)
                            navigation.navigate('TableCombine', { Cart: cartList , id: nameTable ,idBill: route.params.id})
                        }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>Gộp Bàn </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.typeItem}
                        onPress={() =>{
                            setClicked(false)
                            navigation.navigate('CupTable',{ Cart: cartList , id: nameTable ,idBill: route.params.id})
                        }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>Tách Bàn </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.typeItem}
                        onPress={() =>{setClicked(false)}}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '500' }}> Thoát </Text>
                        </TouchableOpacity>
                    </View>
               
                </Modal> */}
                </View>
            </View>
           
            <SafeAreaView style={styles.titleSafeAreaView}>
                <FlatList data={cartList}
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
                                                {'$' + item.data.price}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.addRemoveViewL}>
                                    <TouchableOpacity style={[styles.addToCartBtn, { width: 30, justifyContent: 'center', alignItems: 'center' }]}
                                        onPress={() => {
                                            if (item.data.qty > 1) {
                                                removeItem(item)
                                            } else {
                                                deleteItem(item)
                                            }
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 15, fontWeight: '700' }}>{item.data.qty}</Text>
                                    <TouchableOpacity style={[styles.addToCartBtn, { width: 30, justifyContent: 'center', alignItems: 'center' }]}
                                        onPress={() => { addItem(item) }}
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
            
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={{width:'90%',height:50,backgroundColor:'#3399FF',marginBottom:10,alignItems:'center',justifyContent:'center'
            ,borderRadius:10}}
           // onPress={() =>{ThanhToan()}}
            onPress={() => { navigation.navigate('PrintBill', { Cart: cartList , id : route.params.id , idTable: nameTable}) }}
            >
                    <Text style={{fontSize : 20 , fontWeight:'700'}}>Thanh Toán </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default BillTableDetail;

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
        marginTop: 5,
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