import React from 'react'
import {
    Text, View, Image, TouchableOpacity, StyleSheet,FlatList
} from 'react-native';
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native'
const BillTable = ({navigation}) => {
    const [items,setData] = useState([])
    const [dataarea,setDataArea] = useState([])
    const [clicked, setClicked] = useState(false);
    const [select,setSelect] = useState('Select Items')
    const [dataTableArea,setDataTableArea] = useState([])
    const [TableArea,setTableArea] = useState([])
    const [TableOpen,setTableOpen] = useState([])
    const [DataList,setDataList] = useState([])
    useEffect(() =>{
        getData()
        getItemsArea()
        getItemsOpen()
    },[])
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
      const getItemsOpen = () => {
        firestore()
        .collection('table')
        // Filter results
        .where('status', '==', true)
        // Limit results
        .get()
        .then(querySnapshot => {
            console.log('Total Table Open: ', querySnapshot.size);
            let tempData = []
            querySnapshot.forEach(documentSnapshot => {
                console.log('Table ID: ', documentSnapshot.id, documentSnapshot.data());
                tempData.push({
                    id: documentSnapshot.id,
                    data: documentSnapshot.data(),
                })
            });
            setTableArea(tempData)
        });
    }
    const getData = () => {
        firestore()
            .collection('billtable')
            // Filter results
            .where('statusBill', '==', true)
            // Limit results
            .get()
            .then(querySnapshot => {
                console.log('Total Bill: ', querySnapshot.size);
                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('Bill ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setData(tempData)
            });
    }
    const getTotal = (datat) =>{
        let total = 0
        datat.map(itm => {
            total = total + itm.data.qty * itm.data.price
        })
        let x = total.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        return x   
    }
    const CheckArea = (id) =>{
        let check = false
        TableOpen.map(itm => {
            if(itm.id == id){
                check = true
                console.log('ban trong khu ')
                console.log(itm.data.name)
            }
        })
        return check
    }
    const CheckIdTable = (id) =>{
        let tempData = []
        items.map(itm =>{
            if(CheckArea(itm.data.idTable)){
                tempData.push(itm)
            }
        })
        setDataList(tempData)
       
    }

    // load data 
    const dataTable = (id) =>{
        let tempData = []
        TableArea.map(itm => {
          if(itm.data.idArea == id){
            tempData.push(itm)
            console.log(itm.data.name)
          }
        })
        
        setTableOpen(tempData)
      }
    return (
        <View style={{flex: 1}}>
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
                                //setIdArea(item.id)
                                setClicked(false)
                                dataTable(item.id)
                               
                            }}>
                                <Text>{item.data.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>) : null}
            <TouchableOpacity style={styles.typeBtnSearch}
            onPress = {() =>{CheckIdTable()}}
            >
                <Text style = {{fontSize:18,fontWeight:'700',marginLeft:5}}>Tìm kiếm </Text>
                <Image source={require('../image/search.jpg')} style={{width:30,height:30 }}>
                </Image>
            </TouchableOpacity>
            <FlatList
                data={DataList}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.container}>
                        
                                <View style={styles.box}>
                                    <View style={{ justifyContent: 'center', width: '40%', marginLeft: 30 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '700' }}>{item.data.nameTable}</Text>
                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row-reverse', alignSelf: 'center', marginLeft: 30 }}>
                                        <TouchableOpacity
                                         onPress={() => { navigation.navigate('BillTableDetail', { id: item.id }) }}
                                        >
                                        <Image source={require('../image/angle-right-solid.png')}
                                            style={{ width: 20, height: 20, marginTop: 4, marginRight: 10 }}></Image>
                                        </TouchableOpacity>
                                       
                                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#009966',marginRight:10 }}>{'$ '+getTotal(item.data.cart)}</Text>

                                    </View>
                                </View>

                        </View>
                    )
                }}
            />
            {/* <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={{
                    width: '90%', height: 50, backgroundColor: '#3399FF', marginBottom: 10, alignItems: 'center', justifyContent: 'center'
                    , borderRadius: 10
                }}
                    onPress={() => { getData()}}
                >
                    <Text style={{fontSize: 20 , fontWeight : '700'}}>Refresh</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}
export default BillTable;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    box: {
        width: '90%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 10,
        flexDirection:'row',
    },
    dropdownArea: {
        elevation: 2,
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
      typeBtn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor:'#fff'
    },
    typeBtnSearch: {
        width: '40%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor:'#fff'

    },
})

{/* <View style={styles.container}>
            <View style={styles.box}>
                <View style={{justifyContent:'center',width : '50%' , marginLeft:30}}>
                    <Text style={{fontSize: 20 , fontWeight:'700'}}>Ban 1</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:50 , alignSelf:'center'}}>
                    <Text style={{fontSize:20 , fontWeight:'700'}}>$700</Text>
                    <Image source={require('../image/angle-right-solid.png')} 
                    style={{width:20,height:20,marginTop :4,marginLeft:10}}></Image>
                </View>
            </View>
        </View> */}