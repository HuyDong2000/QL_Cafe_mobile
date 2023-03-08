import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image ,TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native'


const MyTabOder = ({navigation}) => {

  const [items, setItems] = useState([]);
  const [itemsCafe, setItemsCafe] = useState([])
  const [itemsNuocNgot, setItemsNuocNgot] = useState([])
  const [itemsNuocEp, setItemsNuocEp] = useState([])
  const [idType, setIdType] = useState('')
  const [oldData,setoldData] = useState([])
  const route = useRoute()
  
  useEffect(() => {
    getItemsCafe()
    getItemsNuocEp()
    getItemsNuocNgot()

  }, [])
  const getItemsCafe = (idType) => {
    firestore()
      .collection('product')
      .where('idType', '==', '3Mevg94AlCAQK4YFa2Gh')
      .get()
      .then(querySnapshot => {
        console.log('Total product Cafe: ', querySnapshot.size);
        let tempData = []
        querySnapshot.forEach(documentSnapshot => {
          console.log('Product ID: ', documentSnapshot.id, documentSnapshot.data());
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          })
        });
        setItemsCafe(tempData)
      });
  }

  const getItemsNuocNgot = (idType) => {
    firestore()
      .collection('product')
      .where('idType', '==', 'Xf0BgLmLYedhEbt1ZL19')
      .get()
      .then(querySnapshot => {
        console.log('Total product Nuoc Ngot: ', querySnapshot.size);
        let tempData = []
        querySnapshot.forEach(documentSnapshot => {
          console.log('Product ID: ', documentSnapshot.id, documentSnapshot.data());
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          })
        });
        setItemsNuocNgot(tempData)
      });
  }


  const getItemsNuocEp = (idType) => {
    firestore()
      .collection('product')
      .where('idType', '==', 'hn9QcgI9jmy1KQUgy1m8')
      .get()
      .then(querySnapshot => {
        console.log('Total product Nuoc Ep : ', querySnapshot.size);
        let tempData = []
        querySnapshot.forEach(documentSnapshot => {
          console.log('Product ID: ', documentSnapshot.id, documentSnapshot.data());
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          })
        });
        setItemsNuocEp(tempData)
      });
  }
  
  const onAddToCart = async (item , index) => {
    const bill = await firestore().collection("billtable").doc(route.params.id).get();
    console.log(bill._data.cart)
    let tempData = []
    tempData = bill._data.cart
    if(tempData.length > 0){
      let existing = false
      tempData.map(itm => {
        if(itm.id == item.id){
          existing = true
          itm.data.qty = itm.data.qty + 1
        }
      })
      if(existing == false){
        tempData.push(item)
      }
      firestore().collection('billtable').doc(route.params.id).update({
        cart: tempData
      })
    }else{
      tempData.push(item)
    }
    console.log(tempData)
    firestore().collection('billtable').doc(route.params.id).update({
      cart: tempData
    })
  }
  const onSearch = (text) =>{
    if(text ==''){
        setItems(oldData)
    }else{let tempData = items.filter(item =>{
        return item.data.name.toUpperCase().indexOf(text.toUpperCase())>-1
    })
    setItems(tempData)}
    
}
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', width:360, height: 60 ,borderBottomWidth:2}}>
        <TouchableOpacity style={styles.btnTab}
          onPress={() => {
            console.log('Click Button Cafe')
            setItems(itemsCafe)
            setoldData(itemsCafe)
          }}
        >
          <Text style={styles.btnText}>Cafe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTab}
          onPress={() => {

            console.log('Click Button Nuoc Ngot')
            setItems(itemsNuocNgot)
            setoldData(itemsNuocNgot)

          }}
        >
          <Text style={styles.btnText}>Nước ngọt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTab}
          onPress={() => {
            console.log('Click Button Nuoc Ep ')
            setItems(itemsNuocEp)
            setoldData(itemsNuocEp)
          }}
        >
          <Text style={styles.btnText}>Nước ép</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width:'90%', backgroundColor: '#fff', height: 50 ,marginTop:15,marginLeft:20,borderRadius:10,alignItems:'center',flexDirection:'row'
    ,borderWidth:2}}>
        <Image source={require('../image/search.jpg')}style={{width:30,height:30,marginLeft:10}}></Image>
        <TextInput 
        placeholder='Search ... '
        onChangeText={txt => {onSearch(txt)}}
        >

        </TextInput>
        </View>

      <SafeAreaView style={styles.titleSafeAreaView}>
        <FlatList data={items}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.box}>
                <View style={{ width: 200, alignSelf: 'center', flexDirection: 'row' }}>
                  <Image source={{ uri: item.data.imageUrl }}
                    style={styles.itemImage}
                  />
                  <View style={{ width: '60%', margin: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.data.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 18, color: 'green', fontWeight: '700' }}>
                        {'$' + item.data.price}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row-reverse', flex: 1, alignSelf: 'center', marginLeft: 10 }}>
                  <TouchableOpacity style={{
                    marginRight: 15, width: 70, height: 40, backgroundColor: '#99CCFF', alignItems: 'center'
                    , justifyContent: 'center', borderRadius: 30
                  }}
                  onPress={()=>{onAddToCart(item,index)}}
                  >
                    <Text>Add</Text>
                  </TouchableOpacity>

                </View>
              </View>
            )
          }}
        >
        </FlatList>
      </SafeAreaView>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={{
          width: '90%', height: 50
          , alignItems: 'center', borderRadius: 10, backgroundColor: '#33CCFF', justifyContent: 'center'
        }}
        onPress = {() => {navigation.navigate('Cart',{id: route.params.id})}}
        >
          <Text style={styles.btnText}>Xac Nhan</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default MyTabOder;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor:'#fff'
  },
  btnTab: {
    width: 100,
    backgroundColor: '#fff',
    marginTop: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'

  },
  btnText: {
    fontSize: 20,
    fontWeight: '600'
  },
  box: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    elevation: 4,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,

  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  titleSafeAreaView: {
    flex: 1,
    height: 180,
    marginTop: 10,
    marginBottom: 10,
  },

})