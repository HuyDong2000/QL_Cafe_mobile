import React, { useEffect, useState } from 'react';
import { View, Button, Text, TouchableOpacity ,Image,StyleSheet,FlatList,SafeAreaView} from 'react-native';

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
  const [clicked, setClicked] = useState(false);
  const [dataarea,setDataArea] = useState([])
  const [select,setSelect] = useState('Select Items')
  const [idArea,setIdArea] = useState('')
  const [itemsClose, setItemsClose] = useState([]);
  const [tableClose,setTableClose] = useState([])
 
  // create bucket storage reference to not yet existing image
  useEffect(() => {
    getItemsArea()
    getItemsClose()
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
const getItemsArea = () => {
  firestore()
      .collection('area')
      .get()
      .then(querySnapshot => {
          console.log('Total area: ', querySnapshot.size);
          let tempData = []
          querySnapshot.forEach(documentSnapshot => {
              console.log('Area ID: ', documentSnapshot.id, documentSnapshot.data());
              tempData.push({
                  id: documentSnapshot.id,
                  data: documentSnapshot.data(),
              })
          });
          setDataArea(tempData)
          
      });
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
  const getItemsClose = () =>{
    firestore()
    .collection('table')
    // Filter results
    .where('status', '==', false)
    // Limit results
    .get()
    .then(querySnapshot => {
        console.log('Total Table Close: ', querySnapshot.size);
        let tempData = []
        querySnapshot.forEach(documentSnapshot => {
            console.log('Table ID: ', documentSnapshot.id, documentSnapshot.data());
            tempData.push({
                id: documentSnapshot.id,
                data: documentSnapshot.data(),
            })
        });
        setItemsClose(tempData)
    });
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
  const dataTableClose = (id) =>{
    let tempData = []
    itemsClose.map(itm => {
      if(itm.data.idArea == id){
        tempData.push(itm)
      }
    })
    console.log('Table truoc ')
    console.log(itemsClose)
    console.log('id')
    console.log(id)
    console.log('Table')
    console.log(tempData)
    setTableClose(tempData)
   
  }
  return (
    <View style={{flex:1 , alignItems:'center'}}>
       <TouchableOpacity style={styles.typeBtn}
                onPress={() => {
                    setClicked(!clicked)
                }}
            >
                <Text>{select}</Text>
                {clicked ? (
                    <Image source={require('../image/up-arrow.png')} style={{ width: 20, height: 20 }}></Image>
                ) : (
                    <Image source={require('../image/down.png')} style={{ width: 20, height: 20 }}></Image>
                )}

            </TouchableOpacity>
            {clicked ? (<View style={styles.dropdownArea}>
                <FlatList data={dataarea}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.typeItem}
                            onPress={()=>{
                                setSelect(item.data.name)
                                setIdArea(item.id)
                                setClicked(false)
                                dataTableClose(item.id)
                                
                            }}>
                                <Text>{item.data.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>) : null}
            <SafeAreaView style={{width:'90%',height:'40%',backgroundColor:'red'}}>
            <FlatList data={tableClose}
                numColumns={2}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.container}>
                            <View style={styles.box}>
                                <Text style={{ fontSize: 20, fontWeight: '700' }}>{item.data.name}</Text>
                                <TouchableOpacity style={{
                                    height: 40, width: 100, borderRadius: 10, backgroundColor: '#FFFF99',
                                    marginTop: 10, alignItems: "center", justifyContent: 'center', flexDirection: 'row',
                                }}
                                    // onPress={() => {
                                    //     if (checkTable(item) == true) {
                                    //         let idBill = ''
                                    //         let tempData = []
                                    //         tempData = itemBill
                                    //         tempData.map(itm => {
                                    //             if (itm.data.idTable == item.id) {
                                    //                  idBill = itm.id
                                    //             }
                                    //         })
                                    //         navigation.navigate('Oder', { id: idBill })
                                    //     } else {
                                    //         console.log('flase')
                                    //         saveBillTable(item.id, item.data.name),
                                    //             navigation.navigate('Oder', { id: billId })
                                    //     }

                                    //     //saveBillTable(item.id,item.data.name),
                                    //     //navigation.navigate('Oder',{id: billId}) 
                                    // }}
                                >

                                    <Text style={{ fontSize: 18, fontWeight: '700' }}>Add </Text>
                                    <Image source={require('../image/cart-plus-solid.png')} style={{ width: 20, height: 20 }}></Image>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                }}
            >
            </FlatList>
            </SafeAreaView>
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

const styles = StyleSheet.create({
  pickBtn: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
},
typeBtn: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
},
dropdownArea: {
  elevation: 5,
  marginTop: 20,
  height: 100,
  alignSelf: 'center',
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 10,
},
typeItem: {
  width: '85%',
  height: 50,
  borderBottomWidth: 0.2,
  borderBottomColor: '#8e8e8e',
  alignSelf: 'center',
  justifyContent: 'center',
},
dropdownArea: {
  elevation: 5,
  marginTop: 20,
  height: 150,
  alignSelf: 'center',
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 10,
},
container: {
  flex: 1,
  alignItems: 'center',
},
box: {
  width: 150,
  height: 150,
  margin: 10,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  elevation: 5
},
})