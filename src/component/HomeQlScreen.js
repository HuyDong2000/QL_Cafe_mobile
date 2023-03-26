import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button, FlatList
} from 'react-native';


const HomeQlScreen = ({ navigation }) => {
    return (

        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,elevation:1,width:'100%',height:50}}>
                <Image source={require('../image/home.png')} style={{ width: 30, height: 30 ,marginLeft:30}}></Image>
                <Text style={{ fontSize: 22, fontWeight: '700', marginLeft: 30 }}>Home</Text>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Login') }}
                >
                    <Image source={require('../image/logout.jpg')} style={{ width: 30, height: 30, marginLeft: 160 }}></Image>
                </TouchableOpacity>

            </View>
            <View style={{flex:1,justifyContent:'center'}}>
                <View style={{  alignItems: 'center'}}>

                    <View style={{ flexDirection: 'row' }}>
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
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.box}
                            onPress={() => { navigation.navigate('EditType') }}
                        >
                            <Text style={styles.titleText}>Quản lý loại món</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}
                            onPress={() => { navigation.navigate('ScreenSatff') }}
                        >
                            <Text style={styles.titleText}>Quản lý nhân viên </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.box}
                            onPress={() => { navigation.navigate('AreaScreen') }}
                        >
                            <Text style={styles.titleText}>Quản lý khu vực  </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}
                            onPress={() => { navigation.navigate('SalaryManagement') }}
                        >
                            <Text style={styles.titleText}>Quản lý lương </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{
                        width: '85%',
                        height: 90,
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderRadius: 10,
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        borderWidth: 1,
                        elevation: 2
                    }}
                        onPress={() => { navigation.navigate('RevennueToDay') }}
                    >
                        <Text style={styles.titleText}>Quản lý doanh thu </Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    )
}
export default HomeQlScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 400,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
       
    },
    box: {
        width: 150,
        height: 90,
        alignSelf: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 1,
        elevation: 2
    },
    titleText: {
        fontSize: 20,
        fontWeight: '700',
    }

})