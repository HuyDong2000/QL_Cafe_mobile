import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native'

import firestore from '@react-native-firebase/firestore';

import {useEffect,useState} from 'react'



const AddType = ({ navigation }) => {
    //const [id, setid] = useState('');
    const [name, setname] = useState('');
    const getData = async () => {
        const table = await firestore().collection('table').get();
        console.log(table.docs)
    }
    const addIteam = () => {
        firestore()
            .collection('type')
            .add({
                
                name: name,
            })
            .then(() => {
                console.log('User added!');
            });
    }
    return (
        <View style={{ flex: 1 ,justifyContent:'center'}}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image
                    source={{ uri: 'https://media.istockphoto.com/id/120231825/vi/vec-to/v%E1%BA%BD-m%E1%BB%99t-chi%E1%BA%BFc-l%C3%A1-m%C3%A0u-xanh-l%C3%A1-c%C3%A2y-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=1024x1024&w=is&k=20&c=eeMzAtsJn6dylfQe9hiRFRQvJQkm0Lsn9InadKPmFYw=' }}
                    style={{
                        width: '50%',
                        height: 100,
                        resizeMode: 'contain',  
                    }}
                />
            </View>
            <View style={{ width: '90%', height: 150, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ alignItems: 'center', fontSize: 20 }}>Add Type </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
           
                <TextInput
                    style={{ width: '80%', height: 60, backgroundColor: '#CCCCCC', fontSize: 15, borderRadius: 10,marginTop:10 ,paddingLeft:20}}
                    placeholder="Ten Ban "
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
export default AddType;