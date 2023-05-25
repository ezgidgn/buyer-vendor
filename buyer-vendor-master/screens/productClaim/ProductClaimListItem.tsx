import React, { FC, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, Button } from "react-native"
import { ProductClaimModel } from '../../models/productClaim/ProductClaimModel'
import Constants from '../../common/Constants'
import axios from 'axios'


interface ProducCLaimListItemProps {
  data: ProductClaimModel
  id: number
}

const ProductClaimListItem: FC<ProducCLaimListItemProps> = (props) => {
  

  const { data, id } = props
  const { name, barcode, color, gender, createdAt, price, variants, variant_code,
    description, discount_price, link, manufacturer, publishedAt, sku, type, updatedAt } = data
  const createDate = new Date(createdAt)
  const updateDate = new Date(updatedAt);
  const publishDate = new Date(publishedAt);

  const updateFormattedDate = `${updateDate.toLocaleDateString()} ${updateDate.toLocaleTimeString()}`
  const createFormattedDate = `${createDate.toLocaleDateString()} ${createDate.toLocaleTimeString()}`
  const publishFormattedDate = `${publishDate.toLocaleDateString()} ${publishDate.toLocaleTimeString()}`
  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.button_text}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>name:  {name}</Text>
      <Text style={styles.text}>price:  {price}</Text>
      <Text style={styles.text}>gender:  {gender}</Text>
      <Text style={styles.text}>color:  {color}</Text>
      <Text style={styles.text}>manufacturer: {manufacturer}</Text>
      <Text style={styles.text}>barcode: {barcode}</Text>
      <Text style={styles.text}>description: {description}</Text>
      <Text style={styles.text}>publishedAt:  {publishFormattedDate}</Text>
      <Text style={styles.text}>createdAt: {createFormattedDate}</Text>
      <Text style={styles.text}>updatedAt: {updateFormattedDate}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderWidth: 1
  },
  text: {
    fontSize: 18
  },
  button_container: {
    flexDirection: "row",
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: Constants.colors.buttonBackgroundColor,
    padding: 10,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    borderRadius: 15
  },
  button_text: {
    color: "white"
  }
})

export default ProductClaimListItem