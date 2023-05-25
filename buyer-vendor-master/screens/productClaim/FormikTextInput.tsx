import React, { FC } from 'react'
import { NativeSyntheticEvent } from 'react-native'
import { TextInputFocusEventData } from 'react-native'
import { View, StyleSheet ,Text} from 'react-native'
import { TextInput } from 'react-native-paper'
import i18n from '../../i18n/Translations'

interface FormikTextInputProps {
  formValue: string
  handleChange : (value: string) => void
  handleBlur : (event: NativeSyntheticEvent<TextInputFocusEventData>) => void  
  name: string
  error:string|undefined
  touch:boolean|undefined
}

const FormikTextInput:FC<FormikTextInputProps> = (props) => {
  const { formValue, handleChange, handleBlur, name ,error,touch} = props

  return (
    <>
    <View style={styles.input_container}>
      <TextInput
        style={styles.textinput}
        value={formValue}
        onChangeText={handleChange}
        onBlur={handleBlur}
        mode="outlined"
        placeholder={i18n.t(name + "PlaceHolder")}
      />
    </View>
    {error&&touch&&<View><Text style={styles.error}>{error}</Text></View>}
    </>
    
  )
}

const styles = StyleSheet.create({
  input_container: {
    padding: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius:3
  },
  textinput:{
    backgroundColor:"white"
  },
  error:{
    padding: 5,
    paddingLeft:16,
    marginHorizontal: 15,
    backgroundColor: "red",
    borderRadius:8,
    fontWeight:'300',
    marginBottom:12
  }
})

export default FormikTextInput