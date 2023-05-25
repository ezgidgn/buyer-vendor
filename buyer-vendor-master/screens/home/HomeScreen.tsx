import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { FC } from 'react'
import { Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AuthReducer from '../../src/redux/reducers/AuthReducer'
import i18n from '../../i18n/Translations'
import MainReducer from '../../src/redux/reducers/MainReducer'
import { ApplicationState } from '../../src/redux/ReduxStore'

const HomeScreen: FC = () => {
  const dispatch = useDispatch<any>()
  const { language, direction } = useSelector((state: ApplicationState) => state.mainReducer)

  //TODO Taha : bunu drawer navigation içine alalım tıklanınca bir ekran açılsın orada butona tıklayınca logout olsun.
  //TODO ibrahim : Bu ekran özet ekranı olacak
  const handleLogout = async (): Promise<void> => {
    await dispatch(AuthReducer.logout())
  }

  const handleLanguageSwitch = (language: string) => {
    dispatch(MainReducer.setLanguage(language))
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <Text>{i18n.t("homePageScreen.welcomeMessage")}</Text>
      <Button title='logout' onPress={handleLogout} />
      <Button title="To TR" onPress={() => handleLanguageSwitch("tr")}></Button>
      <Button title="To EN" onPress={() => handleLanguageSwitch("en")}></Button>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container : {}
})