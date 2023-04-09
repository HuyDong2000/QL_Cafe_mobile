/*man hinh quan ly ban */
import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button, FlatList,Alert
} from 'react-native';
import { create } from 'react-test-renderer';

import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';

const EditTable = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [dataarea,setDataArea] = useState([])
    const [select,setSelect] = useState('Select Items')
    const [selectOpen,setSelectOpen] = useState('Select Items')
    const [tableClose,setTableClose] = useState([])
    const [clicked, setClicked] = useState(false);
    const [itemsClose, setItemsClose] = useState([]);
    useEffect(() => {
        getItems();
        getItemsArea()
        getItemsClose()
    }, [])
    const getItems = () => {
        firestore()
            .collection('table')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setItems(tempData)
            });
    }
    const getItemsClose = () =>{
        firestore()
        .collection('table')
        // Filter results
        //.where('status', '==', false)
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
    const Removingdata = (docId) => {
        firestore()
            .collection('table')
            .doc(docId)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
    }
    const dataTableClose = (id) =>{
        let tempData = []
        itemsClose.map(itm => {
          if(itm.data.idArea == id){
            tempData.push(itm)
          }
        })
        setTableClose(tempData)
       
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
    const Confirm = (id) =>{
        Alert.alert("Details","Do you want to delete this item?",[
            {text: "OK" , onPress: ()=>{Removingdata(id)}},
            {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style: 'cancel' }
        ])
    }
    return (
        <View style={styles.container}>
            <View style={{  alignItems: 'center' ,justifyContent:'center'}}>
                <View style={{
                    flexDirection: 'row', alignItems:'center', width:'100%', height: 50, elevation: 1 
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('HomeQlScreen')
                        }}
                    >
                        <Image source={require('../image/back.png')} style={{ width: 30, height: 30, marginLeft:30}}></Image>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 30 }}>EditTable</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AddTable')
                        }}
                    >
                        <Image source={require('../image/add-outline.png')} style={{ width: 40, height: 40, marginLeft: '58%' }}></Image>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <Text style={{ fontSize: 30, fontWeight: '700' }}> Quản lý bàn </Text>
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
                            onPress={()=>{
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
            <SafeAreaView style={styles.titleSafeAreaView}>
                <FlatList data={tableClose}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.box}>
                                <View style={{ width: 200, alignSelf: 'center', margin: 10, padding: 5 }}>
                                    <Text>{item.data.name}</Text>
                                    
                                </View>
                                <View style={{ flexDirection: 'row-reverse', flex: 1, alignSelf: 'center', marginLeft: 10 }}>
                                    <TouchableOpacity style={{ padding: 5 }}
                                        onPress={() => {
                                            navigation.navigate('DetailTable', {
                                                data: item.data,
                                                id: item.id,
                                            })
                                        }}
                                    >
                                        <Image source={require('../image/brush-outline.png')}
                                            style={{ width: 30, height: 30 }}></Image>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ padding: 5 }}
                                        onPress={() => { Confirm(item.id) }}
                                    >
                                        <Image source={require('../image/close-circle-outline.png')}
                                            style={{ width: 30, height: 30 }}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                >
                </FlatList>
            </SafeAreaView>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={{
                    width: '90%', height: 60, elevation: 2, backgroundColor: '#33CCFF', marginBottom: 20
                    , alignItems: 'center', justifyContent: 'center',borderRadius:10, 
                }}
                    onPress={() => getItems()}
                >
                    <Text style={{fontSize:20,fontWeight:'700'}}>Refresh</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default EditTable;
const styles = StyleSheet.create({
    titleSafeAreaView: {
        flex: 1,
        height: 180,
        marginTop: 10,
        marginBottom: 10,
    },
    container: {
        flex: 1,
       
    },
    box: {
        width: '80%',
        height: 80,
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        borderRadius:10,
        borderWidth:1
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
})