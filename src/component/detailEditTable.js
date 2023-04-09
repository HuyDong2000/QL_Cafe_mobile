import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet ,Image ,FlatList} from 'react-native'

import firestore from '@react-native-firebase/firestore';

import {useEffect,useState} from 'react'
import {useRoute} from '@react-navigation/native'
/* man hinh edit table  */

const DetailEditTable = ({ navigation }) => {
    const route = useRoute()
    const [id, setid] = useState(route.params.data.id);
    const [name, setname] = useState(route.params.data.name);
    const [dataarea,setDataArea] = useState([])
    const [clicked,setClicked] = useState(false)
    const [select,setSelect] = useState('Select Items')
    const [idArea,setIdArea] = useState('')
    useEffect(() => {
        getItemsArea()
    }, [])
    const uploadItem = () => {
        firestore()
            .collection('table')
            .doc(route.params.id)
            .update({
                name: name,
                idArea: idArea,
            })
            .then(() => {
                console.log('User updated!');
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
        <View style={styles.container}>
           
            <View style={{ width: '90%', height: 150, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ alignItems: 'center', fontSize: 40 }}>Edit Bàn  </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
           
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Tên Bàn "
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

                <TouchableOpacity style={styles.pickBtn}
                onPress={()=>{
                   uploadItem();
                   navigation.navigate('EditTable');
                    
                }}>
                    <Text style={{ alignItems: 'center', justifyContent: 'center' }}>UpDate</Text>
                </TouchableOpacity>


            </View>
        </View>

    )
}
export default DetailEditTable;
const styles = StyleSheet.create({
    container:{
        flex:1
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