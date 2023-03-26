import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native'

import firestore from '@react-native-firebase/firestore';

import {useEffect,useState} from 'react'
import {useRoute} from '@react-navigation/native'


const EditArea = ({ navigation }) => {
    //const [id, setid] = useState('');
    const route = useRoute()
    const [id, setid] = useState(route.params.data.id);
    const [name, setname] = useState(route.params.data.name);

    const uploadItem = () => {
        firestore()
            .collection('area')
            .doc(route.params.id)
            .update({
                id: id,
                name: name,
            })
            .then(() => {
                console.log('User updated!');
            });
            navigation.navigate('AreaScreen')
    }
    return (
        <View style={{ flex: 1 ,justifyContent:'center'}}>
           
            <View style={{ width: '90%', height: 150, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ alignItems: 'center', fontSize: 20 }}>EDIT KHU VỰC </Text>
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
                        uploadItem()
                    }else{
                        alert("Please Enter Data")
                    }
                    
                }}>
                    <Text>Xong</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}
export default EditArea;