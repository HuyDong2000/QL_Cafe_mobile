import React, { useEffect, useState } from 'react';
import { View, Button, Text, TouchableOpacity ,Image} from 'react-native';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Vidu = () => {
  const [datedata, setdatedata] = useState([])
  const [selectDate,setSelectData] = useState('Select date')
  const [dataDate,setDataDate] = useState('')
  const [dataModth,setDataModth] = useState('')
  const [dataYear,setDataYear] = useState('')
  // create bucket storage reference to not yet existing image
  useEffect(() => {
   
    getItems()
    // console.log(date)
}, [])
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    const dt = new Date(date)
    const x = dt.toISOString().split('T')
    const x1 = x[0].split('-')
    console.log(x1[2] + '/' + x1[1] + '/' + x1[0])
    setSelectData(x1[2] + '/' + x1[1] + '/' + x1[0])
    setDataDate(x1[2])
    setDataModth(x1[1])
    setDataYear(x1[0])
    hideDatePicker();
  };

  const sosanh = () => {
    firestore()
      .collection('data')
      // Filter results
      .where('datedata', '<=', date)
      // Limit results
      .get()
      .then(querySnapshot => {
        console.log('Total date: ', querySnapshot.size);
        let tempData = []
        querySnapshot.forEach(documentSnapshot => {
            console.log('Date ID: ', documentSnapshot.id, documentSnapshot.data());
            tempData.push({
                id: documentSnapshot.id,
                data: documentSnapshot.data(),
            })
        });
        setdatedata(tempData)
      });
  }
  const getItems = () => {
    firestore()
        .collection('date')
        .get()
        .then(querySnapshot => {
            console.log('Total date: ', querySnapshot.size);
            let tempData = []
            querySnapshot.forEach(documentSnapshot => {
                console.log('Date ID: ', documentSnapshot.id, documentSnapshot.data());
                tempData.push({
                    id: documentSnapshot.id,
                    data: documentSnapshot.data(),
                })
            });
            setdatedata(tempData)
            
        });
        console.log('Time')
        console.log(datedata)
}
  const addtime = () => {
    let datatime = new Date()
    console.log(datatime.toString())
    firestore()
      .collection('date')
      .add({
        date: datatime
      })
      .then(() => {
        console.log('User added!');
      });
  }
  const ChuyenDoi = () =>{
    // datedata.map(item =>{ 
    //   let dataObj = item.data.date.nanoseconds
    //   let op = item.data.date.seconds
      
    //   let dataDate = new Date(op * 1000 + dataObj/1000000)
    //   console.log(dataDate)
    //   if(date >= dataDate){
    //     console.log(dataDate)
        
    //   }
      
    
    // })

    let date = new Date()
    let datenew = date.getDate()
    let monthnew = date.getMonth()+1
    datedata.map(item =>{ 
      let date = new Date(item.data.date.seconds * 1000 + item.data.date.nanoseconds/1000000)
      let data1 = date.getDate()
      let month = date.getMonth()+1
      //console.log(parseInt(data1))
      //console.log(parseInt(datenew))
     // console.log(data1 + 'month' + month )
     // console.log('date to day' + datenew + 'month' + monthnew)
       if(parseInt(data1) > parseInt(datenew) && parseInt(monthnew) == parseInt(month)){
         console.log( new Date(item.data.date.seconds * 1000 + item.data.date.nanoseconds/1000000))  
     }else{
         console.log('null')
     }
    })
    
  }
  const checkTT = () =>{
    datedata.map(item => {
      let dt = new Date(item.data.date.seconds * 1000 + item.data.date.nanoseconds/1000000)
      if(parseInt(dataDate) < parseInt(dt.getDate())) {
        console.log(dt.getDate())
      }else{
        console.log('null')
      }
    })
  }
  return (
    <View style={{flex:1 , alignItems:'center'}}>
      <View style={{flexDirection:'row',width:'90%',height:50,borderRadius:10,elevation:5,alignItems:'center'}}>
        <Text style={{marginLeft:30}}>Ngay bat dau : </Text>
        <Text>{selectDate}</Text>
        <TouchableOpacity
        onPress={showDatePicker}
        >
          <Image source={require('../image/logo.jpg')} style={{width:30,height:30}}></Image>
        </TouchableOpacity>
      </View>
    <Button title={selectDate} onPress={showDatePicker} />
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
    <TouchableOpacity onPress={checkTT}> 
      <Text>Check</Text>
    </TouchableOpacity>
  </View>
  );
}
export default Vidu