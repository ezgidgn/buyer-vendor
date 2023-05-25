import 'react-native-gesture-handler';
import React from 'react';

import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/redux/ReduxStore';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {

  return (
    <NavigationContainer>
      <Provider store={store}>
          <DrawerNavigator/>
      </Provider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
});



