/*man hinh quan ly ban */
import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button, FlatList,Alert
} from 'react-native';
import { create } from 'react-test-renderer';

import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';

const ListStaffSalary = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [oldData, setoldData] = useState([]);
    useEffect(() => {
        getItems();
    }, [])
    const getItems = () => {
        firestore()
            .collection('Satff')
            .get()
            .then(querySnapshot => {
                console.log('Total Satff: ', querySnapshot.size);
                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('Satff ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setItems(tempData)
                setoldData(tempData)
            });
    }
    const Removingdata = (docId) => {
        firestore()
            .collection('product')
            .doc(docId)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
    }
    const onSearch = (text) =>{
        if(text ==''){
            setItems(oldData)
        }else{let tempData = items.filter(item =>{
            return item.data.name.toUpperCase().indexOf(text.toUpperCase())>-1
        })
        setItems(tempData)}
        
    }
    const Confirm = (id) =>{
        Alert.alert("Details","Do you want to delete this item?",[
            {text: "OK" , onPress: ()=>{Removingdata(id)}},
            {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style: 'cancel' }
        ])
    }
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{color: '#1C1C1C',fontSize: 30}}>DANH SÁCH NHÂN VIÊN </Text>
            </View>
            <SafeAreaView style={styles.titleSafeAreaView}>
                <View style={{
                    width: '90%', backgroundColor: '#fff', height: 50, marginTop: 15, marginLeft: 20, borderRadius: 10, alignItems: 'center', flexDirection: 'row'
                    , borderWidth: 2
                }}>
                    <Image source={require('../image/search.jpg')} style={{ width: 30, height: 30, marginLeft: 10 }}></Image>
                    <TextInput
                        placeholder='Search ... '
                        onChangeText={txt => { onSearch(txt) }}
                    >

                    </TextInput>
                </View>
                <FlatList data={items}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.box}>
                                <View style={{ width: 300, alignSelf: 'center',flexDirection:'row' }}>
                                    <View style={{width: '60%', margin:10,marginLeft:10}}>
                                        <Text style={{fontSize: 18,fontWeight : '700'}}>{item.data.name}</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{fontSize: 18,color:'green',fontWeight:'700'}}>
                                                {item.data.Date}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row-reverse', flex: 1, alignSelf: 'center', marginLeft: 10 }}>
                                    <TouchableOpacity style={{ padding: 5 }}
                                        onPress={() => {
                                            navigation.navigate('ListStaffSalaryDetail', {
                                                id: item.id,
                                                name: item.data
                                            })
                                        }}
                                    >
                                        <Image source={require('../image/angle-right-solid.png')}
                                            style={{ width: 20, height: 20 }}></Image>
                                    </TouchableOpacity>

                                    
                                </View>
                            </View>
                        )
                    }}
                >
                </FlatList>
            </SafeAreaView>
            <View style={{ alignItems: 'center', width: '90%', flexDirection: 'row-reverse' }}>
                <TouchableOpacity style={{
                    width: '90%', height: 40, elevation: 2, backgroundColor: '#99CCFF', marginBottom: 10
                    , alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                }}
                    onPress={() => getItems()}
                >
                    <Text>Reset</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ListStaffSalary;
const styles = StyleSheet.create({
    titleSafeAreaView: {
        flex: 1,
        height: 180,
        marginTop: 10,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        paddingTop : 50,
        paddingHorizontal: 20,
        paddingBottom : 20,
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
   
})