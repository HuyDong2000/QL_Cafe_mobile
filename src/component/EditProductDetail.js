import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList,ScrollView } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import {useRoute} from '@react-navigation/native'

const EditProductDetail = () => {
    const route = useRoute()
    const [selectType, setSelectType] = useState('Select Type')
    const [clicked, setClicked] = useState(false);
    const [items, setItems] = useState([]);
    const [imageData,setImageData] = useState({assets: [{uri: route.params.data.imageUrl}],})
    const [name,setName] = useState(route.params.data.name)
    const [price,setPrice] = useState(route.params.data.price)
    const [idType,setIdType] = useState(route.params.data.idType)
    const [imageUrl,setImageUrl] = useState('')
    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Cool Photo App Camera Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
            openGallery()
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };
    const openGallery = async () =>{
        const result = await launchImageLibrary({mediaType: 'photo'})
        if(result.didCancel){

        }
        else{
            console.log(result);
            setImageData(result)
        }
    }
    // const uploadImage = async () => {
    //     const reference = storage().ref(imageData.assets[0].fileName);
    //     const pathToFile = imageData.assets[0].uri;
    //     // uploads file
    //     await reference.putFile(pathToFile);
    //     const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
    //     console.log(url)
    //     upLoadItem(url)
    // }

    const upLoadItem = () =>{
        firestore()
        .collection('product')
        .doc(route.params.id)
        .update({
            name: name,
            price: price,
            idType: idType,
            imageUrl: route.params.data.imageUrl + '',
        })
        .then(() => {
          console.log('User updated!');
        });
    }
    useEffect(() => {
        getItems();
    }, [])
    const getItems = () => {
        firestore()
            .collection('type')
            .get()
            .then(querySnapshot => {
                console.log('Total type: ', querySnapshot.size);
                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log(' ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setItems(tempData)
            });
    }

    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Edit Product</Text>
            </View>
            {imageData  != null ? ( <Image source={{uri: imageData.assets[0].uri }}
            style={styles.imageStyle}/>):null}
            <TextInput placeholder='Enter Item Name' style={styles.inputStyle} 
            value={name}
            onChangeText={text => setName(text)}
            ></TextInput>
            <TextInput placeholder='Enter Item Price' style={styles.inputStyle}
            value={price}
            onChangeText={text => setPrice(text)}
            ></TextInput>
            <TextInput placeholder='Enter Item Image URL' style={styles.inputStyle}></TextInput>
            <TouchableOpacity style={styles.typeBtn}
                onPress={() => {
                    setClicked(!clicked)
                }}
            >
                <Text>{selectType}</Text>
                {clicked ? (
                    <Image source={require('../image/up-arrow.png')} style={{ width: 20, height: 20 }}></Image>
                ) : (
                    <Image source={require('../image/down.png')} style={{ width: 20, height: 20 }}></Image>
                )}

            </TouchableOpacity>
            {clicked ? (<View style={styles.dropdownArea}>
                <FlatList data={items}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.typeItem}
                            onPress={()=>{
                                setSelectType(item.data.name)
                                setIdType(item.id)
                                setClicked(false)
                            }}>
                                <Text>{item.data.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>) : null}

            <Text style={{ alignSelf: 'center', marginTop: 40 }}>OR</Text>
            <TouchableOpacity style={styles.pickBtn}
            onPress={()=>{requestCameraPermission()}}
            >
                <Text>Pick Image From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickBtn}
            onPress={()=>{upLoadItem()}}
            >
                <Text>Upload</Text>
            </TouchableOpacity>
        </View>
       
    )
}

export default EditProductDetail;
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