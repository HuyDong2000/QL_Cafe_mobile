import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native'
import NavigationQlScreen from './NavigationQlScreen';
const DetailCheckOder = ({navigation}) => {
    const isFocused = useIsFocused()
    const [cartList, setCartList] = useState([])
    const route = useRoute()
    useEffect(() => {
        getCartItem()
    }, [isFocused])
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
        getCartItem()
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
        getCartItem()
    }
    const deleteItem = (item) => {

    }
    const getCartItem = async () => {
        const bill = await firestore().collection('billtable').doc(route.params.id).get()
        setCartList(bill._data.cart)
        
    }
    const assertOder = () => {
        firestore()
            .collection('billtable')
            .doc(route.params.id)
            .update({
                statusProduct: false,
            })
            .then(() => {
                console.log('Đã hoàn thành');
            });
            navigation.navigate('Home')
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.titleSafeAreaView}>
                <FlatList data={cartList}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.box}>
                                <View style={{ width: 250, alignSelf: 'center', flexDirection: 'row' ,alignItems:'center'}}>
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
                                    <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.data.qty}</Text>
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
            onPress={() =>{assertOder()}}
            >
                    <Text>Hoàn Thành</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default DetailCheckOder;

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
    }

})