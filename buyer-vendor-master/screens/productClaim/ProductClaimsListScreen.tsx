import React, { FC, useEffect } from 'react'
import { View, Text ,TouchableOpacity,ScrollView, StyleSheet} from "react-native"
import { FlatList, } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import ProductClaimsListReducer from '../../src/redux/reducers/ProductClaimsListReducer'
import { ApplicationState } from '../../src/redux/ReduxStore'
import ProductClaimListItem from './ProductClaimListItem'
import { useNavigation } from '@react-navigation/native';
import NavigationConstants from '../../navigation/NavigationConstants'
import Constants from '../../common/Constants'

const ProductClaimsListScreen: FC = () => {
  const dispatch = useDispatch<any>()
  const { ProductClaimsList } = useSelector((state: ApplicationState) => state.productClaimsListReducer)
  const navigation = useNavigation<any>();

  const renderProductClaims = ({ item }: any) => {
    return <ProductClaimListItem data={item.attributes} id={item.id}/>
  }

  useEffect(() => {
    dispatch(ProductClaimsListReducer.getProductClaims())
  }, [])

  return (
      <View style={styles.container}>
        <FlatList
          data={ProductClaimsList?.data}
          renderItem={renderProductClaims}
          keyExtractor={item => item.id.toString()}
        />
        <TouchableOpacity onPress={()=>{navigation.navigate(NavigationConstants.productClaim)}}>
          <View style={styles.button}>
            <Text style={styles.text}>Yeni Ürün İsteği Oluştur</Text>
          </View>
        </TouchableOpacity>
      </View>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1
  },
  button:{
    borderRadius:8,
    padding:5,
    margin:10,
    alignItems:"center",
    backgroundColor:Constants.colors.buttonBackgroundColor
  },
  text:{
    color:"white"
  }
})

export default ProductClaimsListScreen