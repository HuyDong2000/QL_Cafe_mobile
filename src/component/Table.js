import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button
} from 'react-native';
import { create } from 'react-test-renderer';
/* man hinh ban  */
export default class ListTable extends Component{
    render(){
        return(
            <View style={styles.Componet}>
                <View style={styles.header}>
                    <Text style={styles.Testtitle}>Ban</Text>
                </View>
                <ScrollView>
                    <View style={{
                        flexDirection: 'row', flex: 1, flexWrap: "wrap", backgroundColor: '#CC9900', width: '90%', margin: 10,
                        alignSelf: 'center',
                    }}>
                        <View style={styles.box}>
                            <Text style={{ marginTop: 20, fontSize: 16, }}>Ban</Text>
                            <TouchableOpacity style={{
                                height: 30, width: 80, borderRadius: 10, backgroundColor: '#FFFF99',
                                marginTop: 10, alignItems: "center", justifyContent: 'center'
                            }} onPress={()=>this.props.navigation.navigate('Oder')}><Text>Them Mon </Text></TouchableOpacity>
                            <TouchableOpacity style={{
                                height: 30, width: 80, borderRadius: 10, backgroundColor: '#FFFF99',
                                marginTop: 10, alignItems: "center", justifyContent: 'center'
                            }}><Text>Sua</Text></TouchableOpacity>
                        </View>
                        <View style={styles.box}></View>
                        <View style={styles.box}></View>
                        <View style={styles.box}></View>
                        <View style={styles.box}></View>
                        <View style={styles.box}></View>
                        <View style={styles.box}></View>
                        <View style={styles.box}></View>
                        <View style={styles.box}></View>

                    </View>
                </ScrollView>
                <View style={styles.header}>
                    <Text style={styles.Testtitle}></Text>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    Componet: {
        flex: 1,
        backgroundColor: '#CC9900',
        alignContent: 'flex-start',

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

    },
    Testtitle: {
        alignSelf: 'center',
        fontSize: 20,
    },
    box: {
        padding: 10,
        margin: 10,
        marginLeft: 20,
        width: '40%',
        height: 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        //flexDirection:'row-reverse'/*canh tu phai sang trai cho cac the trong views */
        
    },
    titleimage: {
        width: 90,
        height: 80,
        borderRadius: 10,
    }
})