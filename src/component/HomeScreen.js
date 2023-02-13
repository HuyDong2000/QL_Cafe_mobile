import React, { Component } from 'react';
import {
    Text, View, Image, TouchableOpacity} from 'react-native';
export default class HomeAdmin extends Component {
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
                    }} 
                    onPress={()=>this.props.navigation.navigate('Table')}
                    >
                        <Text style={{ fontSize: 16 }}>Oder </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: '50%', height: 60, margin: 10, padding: 10, backgroundColor: '#fff'
                        , borderRadius: 6
                        
                    }} onPress={()=>this.props.navigation.navigate('Table')}>
                        <Text>Đơn Hàng </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: '50%', height: 60, margin: 10, padding: 10, backgroundColor: '#fff'
                        , borderRadius: 6
                    }}
                    onPress={()=>this.props.navigation.navigate('Pay')}>
                        <Text>Thanh Toán </Text>
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