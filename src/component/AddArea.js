import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native'

import firestore from '@react-native-firebase/firestore';

import {useEffect,useState} from 'react'



const AddArea = ({ navigation }) => {
    //const [id, setid] = useState('');
    const [name, setname] = useState('');
    const getData = async () => {
        const table = await firestore().collection('table').get();
        console.log(table.docs)
    }
    const addIteam = () => {
        firestore()
            .collection('area')
            .add({
                name: name,
            })
            .then(() => {
                console.log('User added!');
            });
        navigation.navigate('AreaScreen')
    }
    return (
        <View style={{ flex: 1 ,justifyContent:'center'}}>
           
            <View style={{ width: '90%', height: 150, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ alignItems: 'center', fontSize: 20 }}>THÊM KHU VỰC </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
           
                <TextInput
                    style={{ width: '80%', height: 60, fontSize: 15, borderRadius: 10,marginTop:10 ,paddingLeft:20,borderWidth:1}}
                    placeholder="Tên khu vực  "
                    placeholderTextColor="#003f5c"
                    value={name}
                    onChangeText={txt => setname(txt)}
                />
                <TouchableOpacity style={{ width: '80%', height: 60, backgroundColor: '#0099FF', borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}
                onPress={()=>{
                    if( name !== ''){
                        addIteam()
                    }else{
                        alert("Please Enter Data")
                    }
                    
                }}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}
export default AddArea;