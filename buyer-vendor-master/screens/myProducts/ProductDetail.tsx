import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native'
import React, { FC, useEffect } from 'react'
import Swiper from 'react-native-swiper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import NavigationConstants from '../../navigation/NavigationConstants';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../src/redux/ReduxStore';
import ProductReducer from '../../src/redux/reducers/ProductReducer';
import LineDescription from '../../components/LineDescription';
import Constants from '../../common/Constants';
import i18n from '../../i18n/Translations';

const ProductDetail: FC = () => {

  const navigation = useNavigation<any>();
  const route = useRoute<any>()
  const dispatch = useDispatch<any>();
  const productId: number = route.params.productId

  const { product } = useSelector((state: ApplicationState) => state.productReducer)

  useEffect(() => {

    const fetchProduct = async () => {
      await dispatch(ProductReducer.getProduct(productId));
    }

    fetchProduct()

  }, [])


  return (
    <ScrollView style={styles.view}>
      {product?.data?.attributes &&
        <>
          <View style={styles.swiperView} >
            <Swiper>
              {product.data.attributes.images?.data === null ?
                <Image source={Constants.placeHolderImage} style={styles.image} />
                :
                product.data.attributes.images?.data?.map((image, index) => (
                  <View key={index} style={styles.view}>
                    <Image source={{ uri: Constants.url + image.attributes.url }} style={styles.image} />
                  </View>
                ))
              }
            </Swiper>
          </View>
          <LineDescription isGrey={false} title={i18n.t("productsScreen.name")} description={product.data.attributes.name} />
          <LineDescription isGrey={true} title={i18n.t("productsScreen.vendorSku")} description={product.data.attributes.vendor_sku} />
          <LineDescription isGrey={false} title={i18n.t("productsScreen.status")} description={product.data.attributes.status} />
          <LineDescription isGrey={true} title={i18n.t("productsScreen.originCountry")} description={product.data.attributes.origin_country} />
          <LineDescription isGrey={false} title={i18n.t("productsScreen.gtipCode")} description={product.data.attributes.gtip_code} />
          <LineDescription isGrey={true} title={i18n.t("productsScreen.stock")} description={product.data.attributes.stock.toString()} />
          <LineDescription isGrey={false} title={i18n.t("productsScreen.price")} description={product.data.attributes.price.toString()} />
          <Button style={styles.button} mode="contained" onPress={() => navigation.navigate(NavigationConstants.productEdit, { product })}>
          {i18n.t("productsScreen.edit")}
          </Button>
        </>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  swiperView: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    resizeMode: 'cover',
  },
  textView: {
    height: 40,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textViewGrey: {
    height: 40,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#e7e7e7'
  },
  textTitle: {
    marginHorizontal: 10,
    fontWeight: "bold",
    width: 110
  },
  textDescription: {
    marginHorizontal: 10,
  },
  button: {
    height: 40,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'black',
  }
});

export default ProductDetail