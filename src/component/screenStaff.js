/*man hinh chi nhan vien */
import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button
} from 'react-native';
import { create } from 'react-test-renderer';

export default class homeAdmin extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff', width: '100%' }}>
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
                <View style={{ alignItems: 'center', width: '90%', backgroundColor: '#fff', flexDirection: 'row-reverse' }}>
                    <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 50, elevation: 4 }}>
                        <Image source={require('../image/add-outline.png')} style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 5, marginLeft: 2 }}>
                        </Image>
                    </TouchableOpacity>

                </View>
                <View style={{ alignItems: 'center', width: '90%', backgroundColor: '#fff', backgroundColor: '#fff', height: '70%', marginTop: 5 }}>
                    <View style={styles.viewcomponent}>
                        <Image source={{ uri: 'https://4.bp.blogspot.com/-zHosO7gB3r4/WKZw-sPFR-I/AAAAAAAAHl4/jNM7TUGzj2kTtHgFi37xHME7qqEFIx2agCLcB/s1600/L1008881.jpg' }}
                            style={styles.Image}></Image>
                        <View style={{ width: 120 }}><Text style={styles.title}>CaFe Nha Trang chuyen cmnr </Text>
                            <Text style={styles.title}>Gia : 18.000</Text>
                        </View>
                        <View style={{ width: 120, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ padding: 5 }}>
                                <Image source={require('../image/brush-outline.png')}
                                    style={{ width: 30, height: 30 }}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ padding: 5 }}>
                                <Image source={require('../image/close-circle-outline.png')}
                                    style={{ width: 30, height: 30 }}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#fff', width: '100%' }}>

                </View>
                <TouchableOpacity style={styles.header}>
                    <View >
                        <Text>OK </Text>
                    </View>
                </TouchableOpacity>

            </View>

        )

    }
}
const styles = StyleSheet.create({
    viewcomponent: {
        width: '90%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center',
        elevation: 3,
        flexDirection: 'row',
        paddingLeft: 10,

    },
    Image: {
        width: 90,
        height: 100,
        borderRadius: 10,
    },
    header: {
        alignItems: 'center',
        width: '90%',
        height: 50,
        backgroundColor: '#CC9900',
        marginTop: 10,
        alignSelf: 'center',
        //elevation: 3,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',/*canh giua cho the trong view*/
        marginBottom: 5,

    },
    title: {
        marginLeft: 10,
        marginTop: 15,
    },
})