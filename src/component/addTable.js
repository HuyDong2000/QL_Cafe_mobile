import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet ,Image,FlatList,SafeAreaView} from 'react-native'

import firestore from '@react-native-firebase/firestore';

import {useEffect,useState} from 'react'



const AddTable = ({ navigation }) => {
    //const [id, setid] = useState('');
    const [name, setname] = useState('');
    const [dataarea,setDataArea] = useState([])
    const [idArea,setIdArea] = useState('')
    const [clicked,setClicked] = useState(false)
    const [select,setSelect] = useState('Select Items')
    useEffect(() => {
        getItemsArea()
    }, [])

    const getData = async () => {
        const table = await firestore().collection('table').get();
        console.log(table.docs)
    }
    const addIteam = () => {
        firestore()
            .collection('table')
            .add({
                name: name,
                idArea: idArea,
            })
            .then(() => {
                console.log('User added!');
            });
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
    return (
        <View style={{ flex: 1 ,margin:10}}>
           
            <View style={{ width: '90%', height: 150, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ alignItems: 'center', fontSize: 20 }}>THÊM BÀN </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
           
                <TextInput
                    style={{ width: '90%', height: 60, fontSize: 15, borderRadius: 10,marginTop:10 ,paddingLeft:20,borderWidth:1}}
                    placeholder="Tên bàn "
                    placeholderTextColor="#003f5c"
                    value={name}
                    onChangeText={txt => setname(txt)}
                />
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
                                setIdArea(item.id)
                                setClicked(false)
                                
                            }}>
                                <Text>{item.data.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>) : null}
                <TouchableOpacity style={{ width: '90%', height: 60, backgroundColor: '#0099FF', borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}
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
export default AddTable;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    box: {
        width: 150,
        height: 150,
        margin: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5
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
})
//navigation.navigate('Oder') ,