import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Image, TextInput, KeyboardAvoidingView, ScrollView,Alert
    , TouchableOpacity
} from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { callExpression } from '@babel/types';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import storage from '@react-native-firebase/storage';
const StaffInfor = ({ navigation }) => {
    const route = useRoute()
    const [check, setCheck] = useState(false)
    const [DataStaff, setDataStaff] = useState([])
    const [Name, setName] = useState('')
    const [Date, setDate] = useState('')
    const [address, setaddress] = useState('')
    const [phonenumber, setphonenumber] = useState('')
    const [imageData,setImageData] = useState(null)
    const [clicked, setClicked] = useState(true)
    const [status,setStatus] = useState(false)
    const [count,setCount] = useState(0)
    const [checkinfor,setCheckinfor] = useState('')
    useEffect(() => {
        getCartItem()
    }, [count])
    const getCartItem = async () => {
       // const bill = await firestore().collection('Satff').doc(route.params.id).get()
        const bill = await firestore().collection('Satff').doc('FTSyK4rF5uX3bmipTKXe').get()
        console.log(bill._data)
        setDataStaff(bill._data)
        setName(bill._data.name)
        setDate(bill._data.Date)
        setaddress(bill._data.address)
        setphonenumber(bill._data.phonenumber)
        setStatus(bill._data.status)
        console.log('status')
        console.log(bill._data.status)
        console.log('link anh ')
        console.log(bill._data.imageUrl)
        setImageData({assets: [{uri: bill._data.imageUrl}],})
       
    }
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
            //setCount(count + 1)
        }
    }
    const uploadImage = async () => {
        const reference = storage().ref(imageData.assets[0].fileName);
        const pathToFile = imageData.assets[0].uri;
        // uploads file
        await reference.putFile(pathToFile);
        const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
        console.log(url)
        upLoadItem(url)
    }

    const upLoadItem = (url) =>{
        firestore()
            .collection('Satff')
            .doc('FTSyK4rF5uX3bmipTKXe')
            .update({
                name: Name,
                address: address,
                phonenumber: phonenumber,
                imageUrl: url + '',
                status: status,
                Date: Date
            })
            .then(() => {
                console.log('Satff update!');
            });
    }
    const Confirm = () =>{
        Alert.alert("Thông báo","Xác định cập nhật",[
            {text: "OK" , onPress: ()=>{uploadImage()}},
            {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style: 'cancel' }
        ])
    }
    const Confirminfor = (err) =>{
        console.log(checkinfor)
        Alert.alert("Thông báo",err,[
            {text: "OK" , onPress: ()=>{CheckInfor()}},
            {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style: 'cancel' }
        ])
    }
    const CheckInfor = () =>{
        let err= ''
        if(Name == '' || Date == '' || phonenumber==''|| address ==''){
            if(Name == '')
            {
                err = 'Chưa nhập họ tên '
                setCheckinfor(err)
            }
            if(Date == ''){
                err = 'Chưa nhập ngày sinh'
                setCheckinfor(err)
            }
            if(phonenumber == ''){
                err = 'Chưa nhập số điện thoại'
                setCheckinfor(err)
            }
            if(address == ''){
                err = 'Chưa nhập điện chỉ'
                setCheckinfor(err)
            }
            Confirminfor(err)
            
        }else{
            Confirm()
        }
       
    }
    return (
        <View style={styles.container}>
            <View style={{
                width: '90%', height: 50, flexDirection: 'row', alignItems: 'center'
                , marginLeft: 20, marginTop: 5
            }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <Image source={require('../image/back.png')} style={{ width: 25, height: 25, marginLeft: 5 }}>
                    </Image>
                </TouchableOpacity>

                <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 40 }}>Staff Information</Text>

            </View>
           
                 <View style={{
                    width: 150, height: 150, borderRadius: 70, elevation: 2, backgroundColor: '#fff'
                    , alignItems: 'center', justifyContent: 'center', marginTop: 30
                }}>
                    <Image source={{uri:imageData.assets[0].uri}} style={{ width: 150, height: 150, borderRadius: 70 }}></Image>
                </View>
           
           
            {clicked  ? (null ):( <TouchableOpacity style={{width:100 , height:50,alignItems:'center',borderRadius:10,justifyContent:'center'}}
            onPress={() =>{requestCameraPermission()}}
            >
            <Text style={{fontSize:18,fontWeight:'500'}}>Chọn ảnh </Text>
        </TouchableOpacity>)}
           

            <View style={{ height: 20, flexDirection: 'row-reverse', width: '90%', marginTop: 15 }}>
                <TouchableOpacity onPress={() => { setClicked(!clicked) ,  getCartItem()}} style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                    <Image source={require('../image/edit.png')} style={{ width: 20, height: 20, marginLeft: 5 }}></Image>
                    <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 5 }}>Sửa</Text>
                </TouchableOpacity>

            </View>
            <View style={{ width: '90%', height: 50, borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: '800' }}>Thông tin cá nhân </Text>
            </View>
            {clicked ? ( <View style={{ alignItems: 'stretch', marginTop: 10 }}>
                <Text style={styles.texttitle}>{Name}</Text>
                <Text style={styles.texttitle}>{Date}</Text>
                <Text style={styles.texttitle}>{address}</Text>
                <Text style={styles.texttitle}>{phonenumber}</Text>
            </View>):( 
                <ScrollView>
            <View style={{ alignItems: 'center', marginTop: 10 ,width:'90%'}}>
            <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={Name}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setDate}
                        value={Date}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setaddress}
                        value={address}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setphonenumber}
                        value={phonenumber}
                    />
                    <View style={{width:'90%',alignItems:'center'}}>

                    <TouchableOpacity style={{width:200,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'#33CCFF',
                borderRadius:10,marginTop:20,marginBottom:20
                }}
                onPress={() => {CheckInfor()}}>
                        <Text>Cập nhật </Text>
                    </TouchableOpacity>
                    </View>
                    
            </View>
            </ScrollView>
            )}
           

        </View>

    )


}
export default StaffInfor
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',


    },
    texttitle: {
        fontSize: 18,
        fontWeight: '800',
        marginTop: 5,
    },
    input: {
        width: 200,
        height: 50,
        margin: 5,
        padding: 10,
        borderBottomWidth : 1
      },
})