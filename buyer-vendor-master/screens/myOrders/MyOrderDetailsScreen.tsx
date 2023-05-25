import { useNavigation , useRoute } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { Button ,Text , View , StyleSheet , Dimensions , ScrollView, Alert} from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderModel } from "../../models/orders/OrderModel";

const MyOrderDetailsScreen:FC = () => {
        const route = useRoute<any>()
        const selectedCardObject: OrderModel = route.params.item
        const navigation = useNavigation<any>()

        useEffect(() => {
          navigation.setOptions({
            title: route.params.item.name
          })
        
          
        }, [])
        

    return (
        <View style={styles.view}>
        <ScrollView style={styles.motherView}>

            <View style={styles.firstView}>
                

                <View >
                    <Text style={styles.firstTitle}>Order & Account Information</Text>
                    <Divider style={styles.dividerStyle} /> 
                </View>

                <View>
                 <Text style={styles.orderNumberTitle}>
                    Order  (The order confirmation email was sent)
                </Text>
                </View>

                <View style={styles.viewWithBackground}>
                <Text style={styles.text}> Order Date  </Text>
                <Text style={styles.priceText}> {selectedCardObject.order_date.toString()} </Text>
                </View>

                <View style={styles.viewNoBackground}>
                <Text style={styles.text}> Order Status  </Text>
                <Text style={styles.priceText}> {selectedCardObject.status} </Text>
                </View>

                <View style={styles.viewWithBackgroundPurchased}>
                <Text style={styles.text}> Purchased From  </Text>
                <Text style={styles.purchasedText}> {selectedCardObject.purchase_point} </Text>
                </View>   
            

            </View>

            <View style={styles.secondView}>

                <Text style={styles.secondTitle}> Order Totals </Text>

                <View style={styles.viewWithBackground}>
                <Text style={styles.text}> Subtotal </Text>
                <Text style={styles.priceText}> {selectedCardObject.subtotal} $</Text>
                </View>

                <View style={styles.viewNoBackground}>
                <Text style={styles.text}> Shipping & Handling  </Text>
                <Text style={styles.priceText}> {selectedCardObject.shipping_handling} $</Text>
                </View>

                <View style={styles.viewWithBackground}>
                <Text style={styles.text}> Wallet Amount  </Text>
                <Text style={styles.priceText}> {selectedCardObject.wallet_amount} $</Text>
                </View>

                <View style={styles.viewNoBackground}>
                <Text style={styles.textBold}> Grand Total  </Text>
                <Text style={styles.priceTextBold}> {selectedCardObject.grand_total} $ </Text>
                </View>

                <View style={styles.viewNoBackground}>
                <Text style={styles.textBold}> Total Paid  </Text>
                <Text style={styles.priceTextBold}>{selectedCardObject.total_paid} $</Text>
                </View>

                <View style={styles.viewNoBackground}>
                <Text style={styles.textBold}> Total Refunded  </Text>
                <Text style={styles.priceTextBold}>{selectedCardObject.total_refunded} $</Text>
                </View>

                <View style={styles.viewNoBackground}>
                <Text style={styles.textBold}> Total Due  </Text>
                <Text style={styles.priceTextBold}> {selectedCardObject.total_due} $</Text>
                </View>
            </View>
 

        </ScrollView>

        <SafeAreaView style={styles.buttonView}>
            <View style={styles.basicViewStyle}>
        <Button  title = "Ready" onPress={()=> Alert.alert("Order is Ready")} />
        </View>
        <Divider style={styles.dividerStyle2}/>
        <View style={styles.basicViewStyle}>
        <Button title = "Delivered" onPress={()=> Alert.alert("Order Has Been Delivered")} />
        </View>
        </SafeAreaView>           
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        paddingRight:10,
        paddingLeft:10,
        backgroundColor:"white"
    },
    motherView:{
        flex:2
    },
    firstView:{
        flex:1
    },
    firstTitle:{  
        paddingLeft:10,
        paddingVertical:10,
        fontSize:19,
        justifyContent:"center",
        alignItems:"center"
    },
    orderNumberTitle:{
        fontSize:15,
        paddingLeft:10,
        paddingTop:10,
        fontWeight:"bold"
    },
    secondView:{
        flex:1
    },
    buttonView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    purchasedText:{
        fontSize:15,
        paddingRight:20,
        textAlign:"right"
    },
    secondTitle:{
        fontSize:19,
        paddingBottom:10,
        marginTop:50,
        paddingLeft:10,   
        fontWeight:"600"
    },
    viewWithBackground:{
        padding:10, 
        height:40,
        width:Dimensions.get('window').width,
        flexDirection:"row",
        backgroundColor:"#e7e7e7",
        borderRadius:5
    },
    viewWithBackgroundPurchased:{
        padding:10,
        height:90,
        width:Dimensions.get('window').width,
        flexDirection:"row",
        backgroundColor:"#e7e7e7",
        borderRadius:5
        
    },
    viewNoBackground:{
        padding:10,
        height:40,
        width:Dimensions.get('window').width,
        flexDirection:"row",
    },
    text:{
        flex:1,
        fontSize:15,
    },
    textBold:{
        flex:1,
        fontSize:15,
        fontWeight:"bold"
    },
    priceText:{
        flex:1,
        fontSize:15,
        paddingRight:20,
        textAlign:"right",
    },
    priceTextBold:{
        flex:1,
        fontSize:15,
        fontWeight:"bold",
        paddingRight:20,
        textAlign:"right",
    },
    dividerStyle:{
        height:0.4
    },
    dividerStyle2:{
        width:1,
        height:20
    },
    basicViewStyle:{
        flex:1
    }

    
})

export default MyOrderDetailsScreen