import React, { Component } from 'react';
import {
    Text, StyleSheet, View, SafeAreaView, StatusBar, Image, TextInput, KeyboardAvoidingView, ScrollView
    , TouchableOpacity, Button
} from 'react-native'
import { create } from 'react-test-renderer';

/* Man hinh thanh toan */
export default class ListPay extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.Testtitle}>Cafe La Xanh </Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.viewcomponent}>
                        <Image source={{ uri: 'https://4.bp.blogspot.com/-zHosO7gB3r4/WKZw-sPFR-I/AAAAAAAAHl4/jNM7TUGzj2kTtHgFi37xHME7qqEFIx2agCLcB/s1600/L1008881.jpg' }}
                            style={styles.Image}></Image>
                        <View style={{ width: 120 }}><Text style={styles.title}>CaFe Nha Trang chuyen cmnr </Text>
                            <Text style={styles.title}>Gia : 18.000</Text>
                        </View>
                        <View style={{ width: 120, padding: 10, flexDirection: 'row' , alignItems :'center', justifyContent:'center'}}>
                            <TouchableOpacity style = {{padding : 5}}>
                            <Image source={require('../image/add-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity>
                            <Text style = {{padding : 10 , backgroundColor : '#DDDDDD'}}>10</Text>
                            <TouchableOpacity style ={{padding:5}}>
                            <Image source={require('../image/remove-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity> 
                        </View>
                    </View>

                    <View style={styles.viewcomponent}>
                        <Image source={{ uri: 'https://4.bp.blogspot.com/-zHosO7gB3r4/WKZw-sPFR-I/AAAAAAAAHl4/jNM7TUGzj2kTtHgFi37xHME7qqEFIx2agCLcB/s1600/L1008881.jpg' }}
                            style={styles.Image}></Image>
                        <View style={{ width: 120 }}><Text style={styles.title}>CaFe Nha Trang chuyen cmnr </Text>
                            <Text style={styles.title}>Gia : 18.000</Text>
                        </View>
                        <View style={{ width: 120, padding: 10, flexDirection: 'row' , alignItems :'center', justifyContent:'center'}}>
                            <TouchableOpacity style = {{padding : 5}}>
                            <Image source={require('../image/add-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity>
                            <Text style = {{padding : 10 , backgroundColor : '#DDDDDD'}}>10</Text>
                            <TouchableOpacity style ={{padding:5}}>
                            <Image source={require('../image/remove-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity> 
                        </View>
                    </View>

                    <View style={styles.viewcomponent}>
                        <Image source={{ uri: 'https://4.bp.blogspot.com/-zHosO7gB3r4/WKZw-sPFR-I/AAAAAAAAHl4/jNM7TUGzj2kTtHgFi37xHME7qqEFIx2agCLcB/s1600/L1008881.jpg' }}
                            style={styles.Image}></Image>
                        <View style={{ width: 120 }}><Text style={styles.title}>CaFe Nha Trang chuyen cmnr </Text>
                            <Text style={styles.title}>Gia : 18.000</Text>
                        </View>
                        <View style={{ width: 120, padding: 10, flexDirection: 'row' , alignItems :'center', justifyContent:'center'}}>
                            <TouchableOpacity style = {{padding : 5}}>
                            <Image source={require('../image/add-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity>
                            <Text style = {{padding : 10 , backgroundColor : '#DDDDDD'}}>10</Text>
                            <TouchableOpacity style ={{padding:5}}>
                            <Image source={require('../image/remove-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity> 
                        </View>
                    </View>

                    <View style={styles.viewcomponent}>
                        <Image source={{ uri: 'https://4.bp.blogspot.com/-zHosO7gB3r4/WKZw-sPFR-I/AAAAAAAAHl4/jNM7TUGzj2kTtHgFi37xHME7qqEFIx2agCLcB/s1600/L1008881.jpg' }}
                            style={styles.Image}></Image>
                        <View style={{ width: 120 }}><Text style={styles.title}>CaFe Nha Trang chuyen cmnr </Text>
                            <Text style={styles.title}>Gia : 18.000</Text>
                        </View>
                        <View style={{ width: 120, padding: 10, flexDirection: 'row' , alignItems :'center', justifyContent:'center'}}>
                            <TouchableOpacity style = {{padding : 5}}>
                            <Image source={require('../image/add-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity>
                            <Text style = {{padding : 10 , backgroundColor : '#DDDDDD'}}>10</Text>
                            <TouchableOpacity style ={{padding:5}}>
                            <Image source={require('../image/remove-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity> 
                        </View>
                    </View>

                    <View style={styles.viewcomponent}>
                        <Image source={{ uri: 'https://4.bp.blogspot.com/-zHosO7gB3r4/WKZw-sPFR-I/AAAAAAAAHl4/jNM7TUGzj2kTtHgFi37xHME7qqEFIx2agCLcB/s1600/L1008881.jpg' }}
                            style={styles.Image}></Image>
                        <View style={{ width: 120 }}><Text style={styles.title}>CaFe Nha Trang chuyen cmnr </Text>
                            <Text style={styles.title}>Gia : 18.000</Text>
                        </View>
                        <View style={{ width: 120, padding: 10, flexDirection: 'row' , alignItems :'center', justifyContent:'center'}}>
                            <TouchableOpacity style = {{padding : 5}}>
                            <Image source={require('../image/add-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity>
                            <Text style = {{padding : 10 , backgroundColor : '#DDDDDD'}}>10</Text>
                            <TouchableOpacity style ={{padding:5}}>
                            <Image source={require('../image/remove-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity> 
                        </View>
                    </View>

                    <View style={styles.viewcomponent}>
                        <Image source={{ uri: 'https://4.bp.blogspot.com/-zHosO7gB3r4/WKZw-sPFR-I/AAAAAAAAHl4/jNM7TUGzj2kTtHgFi37xHME7qqEFIx2agCLcB/s1600/L1008881.jpg' }}
                            style={styles.Image}></Image>
                        <View style={{ width: 120 }}><Text style={styles.title}>CaFe Nha Trang chuyen cmnr </Text>
                            <Text style={styles.title}>Gia : 18.000</Text>
                        </View>
                        <View style={{ width: 120, padding: 10, flexDirection: 'row' , alignItems :'center', justifyContent:'center'}}>
                            <TouchableOpacity style = {{padding : 5}}>
                            <Image source={require('../image/add-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity>
                            <Text style = {{padding : 10 , backgroundColor : '#DDDDDD'}}>10</Text>
                            <TouchableOpacity style ={{padding:5}}>
                            <Image source={require('../image/remove-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity> 
                        </View>
                    </View>

                    <View style={styles.viewcomponent}>
                        <Image source={{ uri: 'https://4.bp.blogspot.com/-zHosO7gB3r4/WKZw-sPFR-I/AAAAAAAAHl4/jNM7TUGzj2kTtHgFi37xHME7qqEFIx2agCLcB/s1600/L1008881.jpg' }}
                            style={styles.Image}></Image>
                        <View style={{ width: 120 }}><Text style={styles.title}>CaFe Nha Trang chuyen cmnr </Text>
                            <Text style={styles.title}>Gia : 18.000</Text>
                        </View>
                        <View style={{ width: 120, padding: 10, flexDirection: 'row' , alignItems :'center', justifyContent:'center'}}>
                            <TouchableOpacity style = {{padding : 5}}>
                            <Image source={require('../image/add-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity>
                            <Text style = {{padding : 10 , backgroundColor : '#DDDDDD'}}>10</Text>
                            <TouchableOpacity style ={{padding:5}}>
                            <Image source={require('../image/remove-outline.png')}
                                style = {{width : 30, height : 30}}></Image>
                            </TouchableOpacity> 
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style ={{marginBottom : 5}}>
                <View style={styles.header}>
                    <Text style={styles.Testtitle}>Thanh Toan</Text>
                </View>
                </TouchableOpacity>
               
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'stretch',
    },
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
    title: {
        marginLeft: 10,
        marginTop: 15,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 15,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        //paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
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
})