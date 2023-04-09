/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import  React , {Component} from 'react'
 import {Text , StyleSheet , View , Image,TextInput,KeyboardAvoidingView , ScrollView
 ,TouchableOpacity} from 'react-native'
 import firestore from '@react-native-firebase/firestore';

import { useEffect, useState } from 'react'
 
const LoginAdmin = ({navigation}) =>{
  const [Name, setName] = useState('')
  const [Password, setPassword] = useState('')
  const [CheckName, setChechName] = useState(false)
  const [CheckPassword, setCheckPassword] = useState(false)
  const [ErrName,setErrName] = useState('')
  const [ErrPassword,setErrPassword] = useState('')
  const Login = () =>{
    if(Name == 'htt'  && Password == '123'){
      console.log(Name)
      console.log(Password)
      navigation.navigate('HomeQlScreen')
    }else{
      if(Name.length <= 0){
         setErrName('Nhập tên đăng nhập ')
          setChechName(true)
      }
      else{
        if(Name != 'htt'){
          setErrName('Sai tên đăng nhập ')
          setChechName(true)
        }
      }  
      if(Password.length <= 0){
          setErrPassword('Nhập mật khẩu ')
          setCheckPassword(true)
      }else{
        if(Password != '123'){
          setErrPassword('Sai mật khẩu ')
          setCheckPassword(true)
        }
      }
    }
  }
  return(
     <ScrollView
       keyboardShouldPersistTaps="handled"
       contentContainerStyle={{
         flex: 1,
         justifyContent: 'center',
         alignContent: 'center',
       }}>
         <View style={{flex:1 , backgroundColor:'#fff',justifyContent:'center'}}>
       <View style={{alignItems:'center'}}>
         <KeyboardAvoidingView enabled>
           <View style={{marginBottom:30 ,alignItems:'center'}}>
             <Image source={require('../image/logo.jpg')}
             
             style={{width:'70%',height:200}}></Image>
           </View>
           <View style={{marginBottom:30,marginLeft:10}}>
             <Text style={{fontSize:40,fontWeight:'700',color:'#000000'}}>Login Manage</Text>
           </View>
           {CheckName == true && (<View style={{ flexDirection: 'row-reverse' }}>
              <Text style={{ marginRight: 20 ,color:'red'}}>{ErrName}</Text></View>) }

            <View style={styles.SectionStyle}>
              <Image source={require('../image/user.jpg')}
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 10,
                  marginBottom: 2
                }}
              ></Image>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"  
                onChangeText={txt => {setName(txt),setChechName(false)}}
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            {CheckPassword == true && (<View style={{ flexDirection: 'row-reverse' }}>
              <Text style={{ marginRight: 20 ,color:'red'}}>{ErrPassword}</Text></View>) }

            <View style={styles.SectionStyle}>
              <Image source={require('../image/passwork.jpg')}
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 10,
                  marginBottom: 2
                }}
              ></Image>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                onChangeText={txt => {setPassword(txt),setCheckPassword(false)}}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
           <View style={{alignItems: 'center',marginTop:20}}>
           <TouchableOpacity
             style={styles.buttonStyle}
             activeOpacity={0.5}
             onPress={()=>{Login()}}
             >
             <Text style={styles.buttonTextStyle}>LOGIN </Text>
           </TouchableOpacity>
           
           </View>
           
         </KeyboardAvoidingView>
       </View>
       </View>
     </ScrollView>
  
   )
}

export default LoginAdmin;
 const styles = StyleSheet.create({
   container:{
     backgroundColor: 'rgb(32,53,70)',
     flex : 1,
     alignItems: 'center',
     justifyContent : 'center',
   },
   logo:{
     width :128,
     height :56,
   },
   mainBody: {
     flex: 1,
     backgroundColor: '#fff',
   },
   SectionStyle: {
     flexDirection: 'row',
     height: 50,
     borderRadius:20,
     borderColor:'#333333',
     borderWidth:1.5,
     margin:10,
     justifyContent:'center',
     alignItems:'center',
     width:'90%',
   },
   inputStyle: {
     flex: 1,
     paddingLeft: 15,
     paddingRight: 15,
     fontSize:18,
     
   },
   buttonTextStyle: {
     color: '#FFFFFF',
     paddingVertical: 10,
     fontSize: 16,
   },
   buttonStyle: {
    backgroundColor:'#33CCFF',
    width:'90%',
    height:50,
    alignItems:'center',
    borderRadius:10,
    elevation:2,
    justifyContent:'center',
   },
   registerTextStyle: {
     color: '#FFFFFF',
     textAlign: 'center',
     fontWeight: 'bold',
     fontSize: 14,
     alignSelf: 'center',
     padding: 10,
   },
 })