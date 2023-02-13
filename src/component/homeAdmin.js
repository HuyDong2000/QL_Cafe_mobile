import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button
} from 'react-native';
import { create } from 'react-test-renderer';

export default class homeAdmin extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#fff', width: '100%' }}>
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
                    marginBottom : 5,
                }}>
                    <Text style={{ fontSize: 20 }}>Cafe la xanh</Text>
                    <Image source={require('../image/cafe-outline.png')} style={{ width: 30, height: 30, margin: 5 }}></Image>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#CC9900', width: '90%' }}>
                    <TouchableOpacity style={{
                        width: '50%', height: 60, margin: 10, padding: 10, backgroundColor: '#fff', elevation: 3
                        , borderRadius: 6
                    }}>
                        <Text style={{ fontSize: 16 }}>QL Nhan Vien </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: '50%', height: 60, margin: 10, padding: 10, backgroundColor: '#fff'
                        , borderRadius: 6
                    }}>
                        <Text>QL Ban </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: '50%', height: 60, margin: 10, padding: 10, backgroundColor: '#fff'
                        , borderRadius: 6
                    }}>
                        <Text>QL Mon </Text>
                    </TouchableOpacity>
                </View>
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
                    <Text></Text>
                </View>
            </View>

        )
    }
}