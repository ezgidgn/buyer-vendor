import React,{useState} from 'react'
import { View ,Text,StyleSheet} from 'react-native'
import { Checkbox } from 'react-native-paper';


const CategoryView = ({data,categoryAdd,categoryRemove}:any) => {
  const [CheckBox,setCheckBox]=useState<boolean>(false)
  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
      <Checkbox
        color='black'
        uncheckedColor='black'
        status={CheckBox ? 'checked' : 'unchecked'}
        onPress={() => {
          setCheckBox(!CheckBox)
         { CheckBox
          ?
          categoryRemove(data)
          :
          categoryAdd(data)} 
        ;
      }}/>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    margin:5,
    width: '50%',
    alignItems:"center"
  }
})


export default CategoryView