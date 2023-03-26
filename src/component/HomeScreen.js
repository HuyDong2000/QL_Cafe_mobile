import React, { Component } from 'react';
import {
    Text, View, Image, TouchableOpacity , StyleSheet} from 'react-native';
    import {useEffect,useState} from 'react'
    import {useRoute} from '@react-navigation/native'
const Home = ({navigation})=>{
    const route = useRoute()
    useEffect(() => {
        console.log(route.params.id)
    }, [])
    return (
        <View style={{
            flex: 1, backgroundColor: '#fff', paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 20,
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <Image source={require('../image/home.png')} style={{ width: 30, height: 30, marginLeft: 5 }}></Image>
                <Text style={{ fontSize: 22, fontWeight: '700', marginLeft: 30 }}>Home</Text>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Login') }}
                >
                    <Image source={require('../image/logout.jpg')} style={{ width: 30, height: 30, marginLeft: 160 }}></Image>
                </TouchableOpacity>
               
            </View>
            <View style={{ alignItems: 'center' , marginTop : 60}}>
                <Text style={{color: '#009966',fontSize: 30 , fontWeight:'800'}}>Cafe Lá Xanh </Text>
                <Image source={require('../image/logo.jpg')} style={{width:'50%',height:250}}></Image>
            </View>
            <View style={styles.container}>
                <View style={styles.btnBox}>
                <TouchableOpacity style={styles.box}
                    onPress={() => { navigation.navigate('Table') }}
                >
                    <Text style={styles.titleText}> Gọi Món </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box}
                 onPress={() => { navigation.navigate('CheckOder') }}
                >
                    <Text style={styles.titleText}>Món Đã Gọi</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.btnBox}>
                <TouchableOpacity style={styles.box}
                    onPress={() => { navigation.navigate('BillTable') }}
                >
                    <Text style={styles.titleText}> Thanh Toán </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.box}
                onPress={() => { navigation.navigate('StaffInfor' , {id : route.params.id})}}
                >
                    <Text style={styles.titleText}>Staff Manager</Text>
                </TouchableOpacity>
                </View>
               
            </View>
           
        </View>
    )
}
export default Home;
const styles = StyleSheet.create({
    container: {    
        margin:5,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:10,
        height:270,
        
    },
    btnBox:{
        flexDirection : 'row',
        width:'90%',
        justifyContent:'center',
    },
    box: {
        width: '50%',
        height:110,
        backgroundColor:'#fff',
        borderRadius:10,
        elevation:8,
        alignItems: 'center',
        justifyContent: 'center',
        margin:5,
        
    },
    titleText:{
        fontSize: 20,
        fontWeight: '700',
    }
})
