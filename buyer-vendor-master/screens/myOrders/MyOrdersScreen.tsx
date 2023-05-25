import { View, Text, StyleSheet,  Image, Dimensions } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Card,  Divider,  Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../src/redux/ReduxStore';
import OrderReducer from '../../src/redux/reducers/OrderReducer';
import { GetOrdersRequestModel } from '../../models/orders/GetOrdersRequestModel';
import { OrderModel } from '../../models/orders/OrderModel';
import NavigationConstants from '../../navigation/NavigationConstants';
import { BaseArrayResponseModel } from '../../models/common/BaseArrayResponseModel';



const MyOrdersScreen: FC = () => {
  const navigation = useNavigation<any>()
  const dispatch = useDispatch<any>()
  const [isLoading, setIsLoading] = useState<boolean>();

  const { orders } = useSelector((state: ApplicationState) => state.orderReducer)

  useEffect(() => {
    const request: GetOrdersRequestModel = {
      vendor_id: 1
    }
    const fetchOrders = async () => {
      setIsLoading(true);
      await dispatch(OrderReducer.getOrders(request))
      setIsLoading(false)
    }
      fetchOrders();
  }, [])

  const RenderFlatListItem = (item: OrderModel) => (

    <Card onPress={(_) => navigation.navigate(NavigationConstants.myOrderDetails, { item })}
      style={styles.card}>

      <View style={styles.viewStyle}>
        <View>
          <Image style={styles.image} source={{
            uri: 'https://picsum.photos/200'
          }}></Image>
        </View>
        <View style={styles.ItemContainer}>
          <View>
            <Text style={styles.orderName}> {item.increment_id}</Text>
            <Divider style={styles.dividerStyle} />
          </View>

          <View>
            <Text style={styles.orderNumber}>Status : {item.status}</Text>
          </View>

          <View style={styles.orderPrice}>
            <Text>Price : {item.price}</Text>
          </View>

          <View>
            <Text style={styles.orderDate}>Purchase Point : {item.purchase_point}</Text>
          </View>

          <View style={styles.orderStatus}>
            <Text>{' '}</Text>
          </View>


        </View>
      </View>
    </Card>
  )

  return (
    
    <View style={styles.basicViewStyle}>
      <View style={styles.buttonView}>
        <Button style={styles.button} textColor='black' icon='swap-vertical' mode='text' onPress={() => navigation.navigate(NavigationConstants.myOrdersSortBy,)}>
          Sort by
        </Button>
        <Divider style={styles.divider} />
        <Button style={styles.button} textColor='black' icon='filter-outline' mode='text' onPress={() => navigation.navigate(NavigationConstants.myOrdersFilter, {})}>
          Filters
        </Button>
      </View>

      {
        orders?.data &&
        <FlatList
          data={orders!.data}
          keyExtractor={it=>String(it.id)}
          renderItem={it => RenderFlatListItem(it.item.attributes)}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
  },
  buttonView: {
    width: Dimensions.get('window').width - 10,
    marginVertical: 5,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
    flex: 5,
    color: 'black',
    borderRadius: 5,
  },
  divider: {
    width: 1,
    height: 35
  },
  activityIndicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: "white",
    height: 160,
    margin: 3,
    padding: 5,
    flexDirection: "column"
  },
  viewStyle: {
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10
  },
  ItemContainer: {
    flex: 1,
  },
  orderName: {
    paddingBottom: 5,
    marginTop: 5,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "500",
    justifyContent: "center",

  },
  orderNumber: {
    paddingTop: 10,
    fontSize: 13,
    marginLeft: 10,
  },
  orderPrice: {
    fontSize: 13,
    padding: 5,
    marginTop: 5,
    marginHorizontal: 5,
    width: 220,
    backgroundColor: "#e7e7e7",
    borderRadius: 5
  },
  orderDate: {
    fontSize: 13,
    padding: 5,
    marginTop: 5,
    marginHorizontal: 5,
  },
  orderStatus: {
    fontSize: 13,
    padding: 5,
    marginTop: 5,
    marginHorizontal: 5,
    width: 220,
    backgroundColor: "#e7e7e7",
    borderRadius: 5
  },
  dividerStyle:{
    height: 0.9
  },
  basicViewStyle:{
    flex:1
  }

})

export default MyOrdersScreen