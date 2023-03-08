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
 
 
const Login = ({navigation}) =>{
  
  return(
    <View style={{flex:1 , backgroundColor:'#fff'}}>
     <ScrollView
       keyboardShouldPersistTaps="handled"
       contentContainerStyle={{
         flex: 1,
         justifyContent: 'center',
         alignContent: 'center',
       }}>
       <View style={{alignItems:'center'}}>
         <KeyboardAvoidingView enabled>
           <View style={{marginBottom:30 ,alignItems:'center'}}>
             <Image source={require('../image/logo.jpg')}
             
             style={{width:'70%',height:200}}></Image>
           </View>
           <View style={{marginBottom:30,marginLeft:10}}>
             <Text style={{fontSize:40,fontWeight:'700',color:'#000000'}}>Login</Text>
           </View>
            <View style={styles.SectionStyle}>
              <Image source={require('../image/user.jpg')}
                style={{
                  width: 30,
                  height: 30,
                  marginLeft:10,
                  marginBottom:2
                }}
              ></Image>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"

                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Image source={require('../image/passwork.jpg')}
                style={{
                  width: 30,
                  height: 30,
                  marginLeft:10,
                  marginBottom:2
                }}
              ></Image>
              <TextInput
               style={styles.inputStyle}
              
               placeholder="Enter Password" //12345
               placeholderTextColor="#8b9cb5"
               keyboardType="default"
               
               
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
             onPress={()=>navigation.navigate('Home')}
             >
             <Text style={styles.buttonTextStyle}>LOGIN</Text>
           </TouchableOpacity>
           <Text
             style={styles.registerTextStyle}
             >
             New Here ? Register
           </Text>
           </View>
           
         </KeyboardAvoidingView>
       </View>
     </ScrollView>
   </View>
   )
}

export default Login;
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
     borderWidth:1,
     margin:10,
     justifyContent:'center',
     alignItems:'center',
     width:'90%',
   },
   inputStyle: {
     flex: 1,
     color: 'white',
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