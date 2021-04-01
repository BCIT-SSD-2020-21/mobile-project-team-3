import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {marketBuy, marketSell} from "../../network";

import axios from 'axios';
import { FINNHUB_API } from '@env';


const BuySellScreen = ({ route }) => {
  const uid = "kulveer@gmail.com"
  const { symbol, price } = route.params;
  const [graph, setGraph] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState("");
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(price)
  const [myCash, setMyCash] = useState(50000) /* '50000' has to be modified to each user's cash from database */
  
  
  const graphAPI = async () => {
    // GET QUOTE
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=1&from=1615298999&to=1615302599&token=${FINNHUB_API}`
      );
      console.log('API RESPONSE:', response.data);
      setGraph(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  
  graphAPI()

  const line = {

    datasets: [
      {
        // data: [2, 4, 6, 7, 9, 4],
        data: graph.o.slice(0,50)
      },
    ],
  };

  const onBuyOrSellButtonClicked = async() => {
    if (type === "Buy") {
      await marketBuy(symbol, price, count, uid)
     setMyCash((myCash - total.toFixed(2)).toFixed(2));
     setModalVisible(!modalVisible); 
     setCount(1); setTotal(price)
    }
    else if (type === "Sell") {
      await marketSell(symbol, price, count, uid)
      setMyCash((myCash - (-total.toFixed(2))).toFixed(2))
      setModalVisible(!modalVisible); 
      setCount(1); setTotal(price)
    }
  }

  const addButtonClicked = () => {
    const newCount = count + 1
    const newTotal = total + price
    setCount(newCount)
    setTotal(newTotal)
  }
  const minusButtonClicked = () => {
    const newCount = count - 1
    const newTotal = total - price
    setCount(newCount)
    setTotal(newTotal)
  }

  const DisplayUserCash = () => {
    if(type == "Buy"){
      return(
    <View style={styles.TextView}>
    <Text style={styles.modalText}>Cash </Text>
    <Text style={styles.modalText}>${  (myCash - total.toFixed(2) ).toFixed(2) }</Text>
  </View>
      )
    }
    if(type == "Sell") {
      return(
        <View style={styles.TextView}>
        <Text style={styles.modalText}>Cash </Text>
        <Text style={styles.modalText}>${  (myCash - (-total.toFixed(2)) ).toFixed(2) }</Text>
      </View>
          )
    }
  }

  return (
  
    <SafeAreaView style={styles.container} >
       <ScrollView style={styles.scrollView}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>{symbol}</Text>
        <Text style={styles.priceHeader}>{price.toFixed(2)} USD</Text>
      </View>

      {/* <View>
      <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => graphAPI()}
          >
            <Text 
            style={styles.viewBtnText}
            
            >View Graph</Text>
          </TouchableOpacity>
      </View> */}

      <View>
        <LineChart
          data={line}
          width={Dimensions.get('window').width - 80}
          height={220}
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: '#30444E',
            backgroundGradientFrom: '#30444E',
            backgroundGradientTo: '#30444E',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}

          style={{
            marginVertical: '5%',
            borderRadius: 16
          }}
        />
      </View>
      
      <Modal
        animationType="slide"
        transparent={false}
        opacity={0.5}
        visible={modalVisible}
        backdropOpacity={0.5}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView} >
          <View style={styles.modalView} backdropOpacity={0.5}>
            <View style={styles.TextView}>
              <Text style={styles.modalText}>{type}</Text>
              <Text style={styles.modalText}>{total.toFixed(2)} USD</Text>
            </View>
            <View style={styles.TextView}>
              <Text style={styles.modalText}>Qty</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={addButtonClicked}
              >
                <FontAwesome name="plus-circle" size={30} color="white" />
              </TouchableOpacity>
              <Text style={styles.modalText}>{count}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={minusButtonClicked}
              >
                <FontAwesome name="minus-circle" size={30} color="white" />
              </TouchableOpacity>
            </View>



            {/* <TouchableOpacity
          style={[styles.sellBtn, styles.btn]}
          onPress={() => {DisplayUserCash}}>
          <Text name="arrow-up" size={40} color="white">Checking Expected Cash</Text>
        </TouchableOpacity> */}
            {DisplayUserCash()}
          

            <View style={styles.sellBuyBtnContainer}>
              <TouchableOpacity
                style={[styles.buyBtn, styles.btn]}
                onPress={onBuyOrSellButtonClicked}
              >
                <Text style={styles.textStyle}>{type}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.closeBtn, styles.btn]}
                onPress={() => { setModalVisible(!modalVisible); setCount(1); setTotal(price) }}
              >
                <FontAwesome name="close" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.btnContainer}>
        <Text style={styles.text}>Buy</Text>
        <TouchableOpacity
          style={[styles.buyBtn, styles.btn]}
          onPress={() => { setModalVisible(true); setType("Buy") }}>
          <FontAwesome name="arrow-down" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <Text style={styles.text}>Sell</Text>
        <TouchableOpacity
          style={[styles.sellBtn, styles.btn]}
          onPress={() => { setModalVisible(true); setType("Sell") }}>
          <FontAwesome name="arrow-up" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer}>
        <Text style={styles.Cashtext}>My Cash</Text>
        <Text style={styles.Cashtext}>${myCash}</Text>
        {/* <TouchableOpacity
          style={[styles.sellBtn, styles.btn]}
          onPress={() => { setModalVisible(true); setType("Sell") }}>
          <FontAwesome name="arrow-up" size={40} color="white" />
        </TouchableOpacity> */}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '10%',
    flexDirection: 'column',
    backgroundColor: '#22343C',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35
  },
  Cashtext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop:10
    
  },
  priceHeader: {
    color: '#3DD598',
    fontSize: 35
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: '#30444E',
    borderRadius: 16,
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 10
  },
  btn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: 55,
    marginLeft: '10%',
  },
  buyBtn: {
    backgroundColor: '#FF565E'
  },
  sellBtn: {
    backgroundColor: '#FFC542'
  },
  closeBtn: {
    backgroundColor: '#3DD598'
  },
  qtyBtn: {
    alignSelf: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: '#22343C',

  },
  modalView: {
    margin: 20,
    width: '80%',
    height: '50%',
    backgroundColor: '#30444E',
    borderRadius: 20,
    padding: '10%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  TextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '4%'
  },
  sellBuyBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20%'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  }


});
export default BuySellScreen;
