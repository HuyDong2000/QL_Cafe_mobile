import React, { Component } from 'react';
import {
    Text, View, Image, TouchableOpacity , StyleSheet} from 'react-native';

const HomeAdmin = ({navigation})=>{
    return (            
        <View style={{flex:1, backgroundColor:'#fff'}}>
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
                
                <TouchableOpacity style={styles.box}>
                    <Text style={styles.titleText}>Staff Manager</Text>
                </TouchableOpacity>
                </View>
               
            </View>
           
        </View>
    )
}
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
export default HomeAdmin;