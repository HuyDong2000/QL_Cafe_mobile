import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native'

import firestore from '@react-native-firebase/firestore';

import {useEffect,useState} from 'react'
import {useRoute} from '@react-navigation/native'
import EditType from "./EditType";
/* man hinh edit Type  */

const EditTypeDetail = ({ navigation }) => {
    const route = useRoute()
    const [id, setid] = useState(route.params.data.id);
    const [name, setname] = useState(route.params.data.name);

    const uploadItem = () => {
        firestore()
            .collection('type')
            .doc(route.params.id)
            .update({
                name: name,
            })
            .then(() => {
                console.log('User updated!');
            });
    }
    return (
        <View style={{ flex: 1 }}>
            
            <View style={{ width: '90%', height: 150, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ alignItems: 'center', fontSize: 40 , fontWeight:'700'}}>Sửa loại món  </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Tên loại món "
                    placeholderTextColor="#003f5c"
                    value={name}
                    onChangeText={txt => setname(txt)}
                />
                <TouchableOpacity style={styles.pickBtn}
                onPress={()=>{
                   uploadItem();
                   navigation.navigate('EditType');
                    
                }}>
                    <Text style={{ alignItems: 'center', justifyContent: 'center' }}>UpDate</Text>
                </TouchableOpacity>


            </View>
        </View>

    )
}
export default EditTypeDetail;
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