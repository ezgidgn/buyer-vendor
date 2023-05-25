import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import NavigationConstants from './NavigationConstants';
import ProductClaimScreen from '../screens/productClaim/ProductClaimScreen';
import ProductClaimsListScreen from '../screens/productClaim/ProductClaimsListScreen';
import {StyleSheet, View} from "react-native"
import { Ionicons } from '@expo/vector-icons';


const ProductClaimNavigator = () => {
    const Stack = createStackNavigator()

  return (
    <Stack.Navigator initialRouteName={NavigationConstants.productClaimsList}>
      <Stack.Screen  name={NavigationConstants.productClaimsList} component={ProductClaimsListScreen} options={{headerShown : false}}/>
      <Stack.Screen  name={NavigationConstants.productClaim} component={ProductClaimScreen} options={{ headerBackTitleVisible: false,
                headerTransparent: true,
                headerTitle: '',
                headerBackImage: () => (
                    <View style={styles.headerButton}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </View>
                )}}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerButton: {
      marginLeft: 10,
      backgroundColor: 'white',
      borderRadius: 10
  }
})

export default ProductClaimNavigator