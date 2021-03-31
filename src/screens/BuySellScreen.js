import React, { useState }  from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Modal} from 'react-native';
import { LineChart } from 'react-native-chart-kit';


const BuySellScreen = () => {
    const symbol="TSLA";
    const price = 1233;
    const [modalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState("");
    const [count, setCount] =  useState(1);
    const line = {
        datasets: [
            {
                data: [2, 4, 6, 7, 9, 4],
            },
        ],
    };

    const onBuyOrSellButtonClicked =() =>{
        if (type==="Buy"){
        console.log("Buy clicked")
        }
        else if (type==="Sell"){
            console.log("Sell clicked")
            }
    }

    const addButtonClicked = () => {
        const newCount= count+1
        setCount(newCount)
    }
    const minusButtonClicked = () => {
        const newCount= count-1
        setCount(newCount)
    }
    
    return (
    <SafeAreaView style={styles.container} >
        <View style={styles.headerContainer}>
            <Text style={styles.text}>{symbol}</Text>
            <Text style={styles.priceHeader}>{price} USD</Text>
            </View>
            <View>
                <LineChart
                data={line}
                width={Dimensions.get('window').width -80}
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
        backdropOpacity= {0.5}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView} >
          <View style={styles.modalView} backdropOpacity= {0.5}>
              <View style={styles.TextView}>
            <Text style={styles.modalText}>{type}</Text>
            <Text style={styles.modalText}>{price} USD</Text>
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
            <View style={styles.sellBuyBtnContainer}>
            <TouchableOpacity 
              style={[styles.buyBtn,styles.btn]}
              onPress={onBuyOrSellButtonClicked}
            >
              <Text style={styles.textStyle}>{type}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={[styles.closeBtn, styles.btn]}
              onPress={() => setModalVisible(!modalVisible)}
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
                    onPress={() => {setModalVisible(true); setType("Buy")}}>
                        <FontAwesome name="arrow-down" size={40} color="white" />
                        </TouchableOpacity>
                        </View>
                        <View style={styles.btnContainer}>
                            <Text style={styles.text}>Sell</Text>
                            <TouchableOpacity 
                            style={[styles.sellBtn, styles.btn]} 
                            onPress={() => {setModalVisible(true); setType("Sell")}}>
                                <FontAwesome name="arrow-up" size={40} color="white" />
                                </TouchableOpacity>
                                </View>
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
                                    fontSize: 40
                                },
                                priceHeader: {
                                    color: '#3DD598',
                                    fontSize: 40
                                },
                                headerContainer:{
                                    flexDirection: 'row',
                                    justifyContent:'space-between'
                                },
                                btnContainer:{
                                    flexDirection: 'row',
                                    backgroundColor: '#30444E',
                                    borderRadius: 16,
                                    justifyContent: 'space-between',
                                    padding: 20,
                                    marginVertical: 10
                                },
                                btn:{
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '20%',
                                    height: 60,
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
                                qtyBtn:{
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
                                  TextView:{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      marginVertical: '4%'
                                  },
                                  sellBuyBtnContainer:{
                                      flexDirection: 'row',
                                      justifyContent:'center',
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
