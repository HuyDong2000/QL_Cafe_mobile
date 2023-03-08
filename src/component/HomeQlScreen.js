import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button , FlatList
} from 'react-native';


const HomeQlScreen =({ navigation }) =>{
    return(
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{color: '#009966',fontSize: 30 , fontWeight:'800',marginBottom:10}}>Cafe Lá Xanh </Text>
                <Image source={require('../image/logo.jpg')} style={{width: 350,height:250}}></Image>
            </View>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.box}
            onPress={() => { navigation.navigate('ListEditTable') }}
            >
                <Text style={styles.titleText}> Quản lý bàn </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}
            onPress={() => { navigation.navigate('ListEditProduct') }}
            >
                <Text style={styles.titleText}> Quản lý món </Text>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.box}
            onPress={() => { navigation.navigate('EditType') }}
            >
                <Text style={styles.titleText}>Quản lý loại món</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}
             onPress={() => { navigation.navigate('ScreenSatff') }}
            >
                <Text style={styles.titleText}>Quản lý nhần viên </Text>
            </TouchableOpacity>
            </View>
           
            <TouchableOpacity style={{
                width: 300,
                height: 90,
                alignSelf: 'center',
                backgroundColor: '#fff',
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                borderWidth:1
            }}
                onPress={() => { navigation.navigate('Revennue') }}
            >
                <Text style={styles.titleText}>Doanh Thu </Text>
            </TouchableOpacity>

        </View>
    )
}
export default HomeQlScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 400,
        paddingTop : 50,
        paddingHorizontal: 20,
        paddingBottom : 20, 
        justifyContent: 'center',
        alignItems:'center',
        
    },
    box: {
        width: 150,
        height: 90,
        alignSelf: 'center',
        elevation: 4,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin:5,
        borderWidth:2,
        elevation:2
    },
    titleText:{
        fontSize: 20,
        fontWeight: '700',
    }

})