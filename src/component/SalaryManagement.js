import  React , {Component} from 'react'
 import {Text , StyleSheet , View , Image,TextInput,KeyboardAvoidingView , ScrollView
 ,TouchableOpacity} from 'react-native'
 import { useEffect, useState } from 'react'

 const SalaryManagement = ({ navigation }) =>{
     return( 
         <View style={{flex:1,margin:10,alignItems:'center'}}>
             
             <View>
             <Text style={{fontSize:30,fontWeight:'700',marginTop:30}}>QUẢN LÝ LƯƠNG</Text>
             </View>
             <View style={{ flex: 1, marginTop:150 }}>
                 <TouchableOpacity style={styles.btnClick}
                onPress={()=>navigation.navigate('EmployeeSalary')}
                 >
                     <Text style={styles.textTitle}>Chấm công </Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.btnClick} 
                  onPress={()=>navigation.navigate('ListStaffSalary')}
                 >
                     <Text style={styles.textTitle}>Quản lý lương </Text>
                 </TouchableOpacity>
             </View>
            
         </View>
        
     )
     

 }
 export default SalaryManagement
 const styles = StyleSheet.create({
     btnClick:{
         width:300,
         height:50,
         alignItems:'center',
         justifyContent:'center',
         backgroundColor:'#00CCCC',
         marginTop:20,
         borderRadius:10
     },
     textTitle:{
         fontSize:18,
         fontWeight:'700',
     }
 })