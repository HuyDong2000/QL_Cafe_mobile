import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button
} from 'react-native';

export default class editStaff extends Component{
    render(){
        return(
            <View style={{flex:1,width:'90%',backgroundColor:'red',alignSelf:'center'}}>
                 <View style={{
                    alignItems: 'center',
                    width: '90%',
                    height: 50,
                    backgroundColor: '#CC9900',
                    marginTop: 10,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'center',
                    marginBottom: 5,
                }}>
                    <Text style={{ fontSize: 20 }}>Cafe la xanh</Text>
                    <Image source={require('../image/cafe-outline.png')} style={{ width: 30, height: 30, margin: 5 }}></Image>
                </View>
                <ScrollView >

                <View style={{width:'90%' , height:500 , backgroundColor:'#fff', justifyContent:'center', alignSelf:'center', }}>
                <View style={{
                    width: '90%', height: 60, flexDirection: 'row', backgroundColor: '#fff',
                    alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginTop: 10,
                  
                }}>
                   
                    <Text>Ho Ten : </Text>
                    <TextInput style={{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        width:'60%',
                    }}></TextInput>
                    
                </View>
                <View style={{
                    width: '90%', height: 60, flexDirection: 'row', backgroundColor: '#fff',
                    alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginTop: 10,
                    
                }}>
                   
                    <Text>Ngay Sinh : </Text>
                    <TextInput style={{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        width:'60%',
                    }}></TextInput>
                    
                </View>
                <View style={{
                    width: '90%', height: 60, flexDirection: 'row', backgroundColor: '#fff',
                    alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginTop: 10
                }}>
                    <Text>Dia Chi : </Text>
                    <TextInput style={{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        width:'60%',
                    }}></TextInput>
                </View>
                <View style={{
                    width: '90%', height: 60, flexDirection: 'row', backgroundColor: '#fff',
                    alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginTop: 10
                }}>
                    <Text>So DT : </Text>
                    <TextInput style={{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        width:'60%',
                    }}></TextInput>
                </View>
                <View style={{
                    width: '90%', height: 60, flexDirection: 'row', backgroundColor: '#fff',
                    alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginTop: 10
                }}>
                    <Text>Tai Khoan : </Text>
                    <TextInput style={{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        width:'60%',
                            }}></TextInput>
                        </View>
                    </View>
                </ScrollView>


                <TouchableOpacity >
                    <View style={{
                    alignItems: 'center',
                    width: '90%',
                    height: 50,
                    backgroundColor: '#CC9900',
                    marginTop: 10,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'center',
                    marginBottom: 5,}}
                    >
                        <Text style={{ fontSize: 20 }}>ok</Text>
                        <Image source={require('../image/cafe-outline.png')} style={{ width: 30, height: 30, margin: 5 }}></Image>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}