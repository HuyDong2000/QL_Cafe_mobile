import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity
} from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
const StaffInfor = ({ navigation }) => {
    const route = useRoute()
    const [check, setCheck] = useState(true)
    const [DataStaff, setDataStaff] = useState([])
    const [Name, setName] = useState('')
    const [Date, setDate] = useState('')
    const [address, setaddress] = useState('')
    const [phonenumber, setphonenumber] = useState('')
    const [clicked, setClicked] = useState(true)
    useEffect(() => {
        getCartItem()
    }, [])
    const getCartItem = async () => {
        const bill = await firestore().collection('Satff').doc(route.params.id).get()
        console.log(bill._data)
        setDataStaff(bill._data)
        setName(bill._data.name)
        setDate(bill._data.Date)
        setaddress(bill._data.address)
        setphonenumber(bill._data.phonenumber)
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
                width: 250, height: 250, borderRadius: 70, elevation: 2, backgroundColor: '#fff'
                , alignItems: 'center', justifyContent: 'center', marginTop: 30
            }}>
                <Image source={require('../image/logo.jpg')} style={{ width: 200, height: 200, borderRadius: 70 }}></Image>
            </View>

            <View style={{ height: 20, flexDirection: 'row-reverse', width: '90%', marginTop: 15 }}>
                <TouchableOpacity onPress={() => { setClicked(!clicked) }} style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
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
            </View>):( <View style={{ alignItems: 'stretch', marginTop: 10 }}>
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
            </View>)}
           

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
        height: 50,
        margin: 5,
        padding: 10,
        borderBottomWidth : 1
      },
})