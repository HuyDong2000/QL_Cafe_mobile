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
        <View style={{ flex: 1 }}>
           
            <View style={{ width: '90%', height: 150, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ alignItems: 'center', fontSize: 40 }}>Thêm khu vực  </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
           
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Tên khu vực  "
                    placeholderTextColor="#003f5c"
                    value={name}
                    onChangeText={txt => setname(txt)}
                />
                <TouchableOpacity style={styles.pickBtn}
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        width: '100%',
        backgroundColor: '#fff',
        elevation: 5,
        paddingLeft: 20,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700',
    },
    inputStyle: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 30,
        alignSelf: 'center',
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
        backgroundColor:'#33CCFF'
    },
    typeBtn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
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
    typeItem: {
        width: '85%',
        height: 50,
        borderBottomWidth: 0.2,
        borderBottomColor: '#8e8e8e',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    imageStyle:{
        width:'90%',
        height: 100,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    }
})