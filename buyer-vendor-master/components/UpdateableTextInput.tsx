import React, { useState, FC } from "react";
import { TextInput, TouchableOpacity, Text, View, Button, } from "react-native";

import styles from "../screens/profile/styles";

interface UpdateableTextInputProps {
  value: string|undefined;
  placeHolder: string|undefined;
  onChangeText: (text: string) => void
}

const UpdateableTextInput: FC<UpdateableTextInputProps> = (props) => {
  //TODO FormikTextInput ile aynı görsele getirilecek
  const { value, placeHolder, onChangeText } = props
  const [update, setUpdate] = useState<boolean>(false);


  const onSubmitValue = () => {
    setUpdate(false)    
  }


  return (
    <>
      {update ?
        <>
          <TextInput
            style={styles.input}
            placeholder={placeHolder}
            value={value}
            onChangeText={onChangeText}
          />
          <TouchableOpacity style={styles.button} onPress={() => onSubmitValue()}>
            <Text>Update</Text>
          </TouchableOpacity>
        </>
        :
        <>
          <Text>{value}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setUpdate(true)}>
            <Text>Change</Text>
          </TouchableOpacity>
        </>
      }
      
    </>
  )

};

export default UpdateableTextInput;
