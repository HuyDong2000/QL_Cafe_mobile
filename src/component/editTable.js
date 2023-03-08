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
    useEffect(() => {
        getItems();
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
    const Removingdata = (docId) => {
        firestore()
            .collection('table')
            .doc(docId)
            .delete()
            .then(() => {
                console.log('User deleted!');
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
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={{ uri: 'https://media.istockphoto.com/id/120231825/vi/vec-to/v%E1%BA%BD-m%E1%BB%99t-chi%E1%BA%BFc-l%C3%A1-m%C3%A0u-xanh-l%C3%A1-c%C3%A2y-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=1024x1024&w=is&k=20&c=eeMzAtsJn6dylfQe9hiRFRQvJQkm0Lsn9InadKPmFYw=' }}
                    style={{
                        width: '50%',
                        height: 100,
                        resizeMode: 'contain',
                        margin: 30,
                    }}
                />
            </View>
            <View style={{ alignItems: 'center', width: '90%', flexDirection: 'row-reverse' }}>
                <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 50, elevation: 2 }}
                    onPress={() => { navigation.navigate('AddTable') }}
                >
                    <Image source={require('../image/add-outline.png')} style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 5, marginLeft: 2 }}>
                    </Image>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.titleSafeAreaView}>
                <FlatList data={items}
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
        backgroundColor:'#fff'
    },
    box: {
        width: '80%',
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        borderRadius:10,
        borderWidth:2
    },
})