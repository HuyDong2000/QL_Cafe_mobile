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
 
 


 export default class Login extends Component{
   render(){
     return(
      <View style={styles.mainBody}>
       <ScrollView
         keyboardShouldPersistTaps="handled"
         contentContainerStyle={{
           flex: 1,
           justifyContent: 'center',
           alignContent: 'center',
         }}>
         <View>
           <KeyboardAvoidingView enabled>
             <View style={{alignItems: 'center'}}>
               <Image
                 source={{uri : 'https://media.istockphoto.com/id/120231825/vi/vec-to/v%E1%BA%BD-m%E1%BB%99t-chi%E1%BA%BFc-l%C3%A1-m%C3%A0u-xanh-l%C3%A1-c%C3%A2y-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=1024x1024&w=is&k=20&c=eeMzAtsJn6dylfQe9hiRFRQvJQkm0Lsn9InadKPmFYw='}}
                 style={{
                   width: '50%',
                   height: 100,
                   resizeMode: 'contain',
                   margin: 30,
                 }}
               />
             </View>
             <View style={styles.SectionStyle}>
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
             
             <TouchableOpacity
               style={styles.buttonStyle}
               activeOpacity={0.5}
               onPress={()=>this.props.navigation.navigate('Home')}
               >
               <Text style={styles.buttonTextStyle}>LOGIN</Text>
             </TouchableOpacity>
             <Text
               style={styles.registerTextStyle}
               >
               New Here ? Register
             </Text>
           </KeyboardAvoidingView>
         </View>
       </ScrollView>
     </View>
     )
   }
 }
 const styles = StyleSheet.create({
   container:{
     backgroundColor: 'rgb(32,53,70)',
     flex : 1,
     alignItems: 'center',
     justifyContent : 'center',
   },
   logoContainer:{
     alignItems :'center',
     justifyContent :'center',
     flex:1,
 
   },
   logo:{
     width :128,
     height :56,
   },
   title:{
     color:'#f7c774',
     fontSize : 18,
     textAlign : 'center',
     marginTop : 5 ,
     opacity : 0.9,
   },
   infoContainer:{
     position :'absolute',
     left : 0,
     right: 0,
     bottom: 0,
     height: 200,
     padding:20,
     backgroundColor:'red'
   },
   
   mainBody: {
     flex: 1,
     justifyContent: 'center',
     backgroundColor: '#307ecc',
     alignContent: 'center',
   },
   SectionStyle: {
     flexDirection: 'row',
     height: 40,
     marginTop: 20,
     marginLeft: 35,
     marginRight: 35,
     margin: 10,
   },
   inputStyle: {
     flex: 1,
     color: 'white',
     paddingLeft: 15,
     paddingRight: 15,
     borderWidth: 1,
     borderRadius: 30,
     borderColor: '#dadae8',
   },
   buttonTextStyle: {
     color: '#FFFFFF',
     paddingVertical: 10,
     fontSize: 16,
   },
   buttonStyle: {
     backgroundColor: '#7DE24E',
     borderWidth: 0,
     color: '#FFFFFF',
     borderColor: '#7DE24E',
     height: 40,
     alignItems: 'center',
     borderRadius: 30,
     marginLeft: 35,
     marginRight: 35,
     marginTop: 20,
     marginBottom: 25,
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