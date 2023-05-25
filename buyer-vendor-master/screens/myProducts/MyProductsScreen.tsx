import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Card, Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import NavigationConstants from '../../navigation/NavigationConstants';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../src/redux/ReduxStore';
import ProductReducer from '../../src/redux/reducers/ProductReducer';
import { GetProductsRequestModel } from '../../models/products/GetProductsRequestModel';
import { ProductsModel } from '../../models/products/ProductsModel';
import { BaseDataModel } from '../../models/common/BaseDataModel';
import i18n from '../../i18n/Translations';
import ByrImage from '../../components/ByrImage';


const MyProductsScreen: FC = () => {

  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const { products } = useSelector((state: ApplicationState) => state.productReducer)

  useEffect(() => {
    const request: GetProductsRequestModel = {
      vendor_id: 4
    }
    const fetchProducts = async () => {
      await dispatch(ProductReducer.getProducts(request));
    }

    fetchProducts();
  }, [])

  const onSelectItem = (item: BaseDataModel<ProductsModel>) => {
    var productId = item.id
    navigation.navigate(NavigationConstants.productDetail, { productId, presentation: 'modal' })
  }


  const Item = (item: BaseDataModel<ProductsModel>) => (
    <Card onPress={(_) => onSelectItem(item)} style={styles.card}>
      <View style={styles.cardViewRow}>
        <ByrImage images={item.attributes.images} style={{
          marginRight: 5,
          height: 120,
          width: 120,
          borderRadius: 10,
        }}></ByrImage>
        <View style={styles.cardViewColumn}>
          <Text style={styles.title} numberOfLines={2} >{item.attributes.name}</Text>
          <Text style={styles.sku}>{item.attributes.vendor_sku}</Text>
          <Text style={styles.status}>{i18n.t("productsScreen.status")}: {item.attributes.status}</Text>
          <View style={styles.cardViewRow}>
            <Text style={styles.stock}>{i18n.t("productsScreen.stock")}: {item.attributes.stock}</Text>
            <Text style={styles.price}>{item.attributes.price}$</Text>
          </View>
        </View>
      </View>
    </Card>

  );


  return (
    <View style={styles.view}>
      <View style={styles.buttonView}>
        <Button style={styles.button} textColor='black' icon='swap-vertical' mode='text' onPress={() => navigation.navigate(NavigationConstants.myProductsSortBy)}>
          {i18n.t("productsScreen.sortBy")}
        </Button>
        <Divider style={styles.divider} />
        <Button style={styles.button} textColor='black' icon='filter-outline' mode='text' onPress={() => navigation.navigate(NavigationConstants.myProductsFilter, {})}>
          {i18n.t("productsScreen.filters")}
        </Button>
      </View>
      <FlatList
        style={styles.flatList}
        data={products?.data}
        renderItem={({ item }) => Item(item)}
        keyExtractor={item => item.attributes.createdAt}
      />
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
  divider: {
    width: 1,
    height: 35
  },
  button: {
    flex: 5,
    color: 'black',
    borderRadius: 5,
  },
  flatList: {
    flex: 1,
  },
  card: {
    margin: 3,
    padding: 5,
    height: 130,
    width: Dimensions.get('window').width - 10,
    backgroundColor: 'white'

  },
  cardViewRow: {
    flexDirection: 'row',

  },
  cardViewColumn: {
    flexDirection: 'column',
  },
  title: {
    height: 50,
    marginRight: 5,
    width: (Dimensions.get('window').width * 0.97) - 130,
    fontSize: 15,
  },
  sku: {
    height: 25,
    fontSize: 13,
  },
  stock: {
    flex: 1,
    height: 25,
    fontSize: 13,
    fontWeight: 'bold'
  },
  status: {
    height: 25,
    fontSize: 13,
  },
  price: {
    flex: 1,
    height: 25,
    fontSize: 15,
    paddingRight: 20,
    textAlign: 'right',
    color: 'darkblue',
    fontWeight: 'bold',
  },
  activityIndicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  }

})

export default MyProductsScreen