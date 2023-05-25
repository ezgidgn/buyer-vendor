import React, { FC } from 'react'
import MyOrdersScreen from '../screens/myOrders/MyOrdersScreen';
import MyOrderDetailsScreen from '../screens/myOrders/MyOrderDetailsScreen';
import NavigationConstants from './NavigationConstants';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MyOrdersFilter from '../screens/myOrders/MyOrdersFilter';
import MyOrdersSortBy from '../screens/myOrders/MyOrdersSortBy';



const MyOrdersNavigator:FC = () => {
    const Stack = createStackNavigator()
    const navigation = useNavigation<any>();
    //TODO ibrahim : Order - Product gibi navigatörlerin aynı yapıda çalışması
    //TODO ibrahim : My orders ekranı kart yapısı ile my products kart yapısı aynı olmalı.
  return (
    <Stack.Navigator initialRouteName={NavigationConstants.myOrders}>
            <Stack.Screen 
            name={NavigationConstants.myOrders}
            component={MyOrdersScreen}
            options={{ headerShown: false }} />
            <Stack.Screen options={{
                headerBackTitleVisible: false,
                headerTransparent: true,
                headerTitle: '',
                headerBackImage: () => (
                    <View style={styles.headerLeadingButtonWB}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </View>
                ),
            }} name={NavigationConstants.myOrderDetails} component={MyOrderDetailsScreen} />
            <Stack.Group screenOptions={{
                cardStyle: { backgroundColor: '#fff' },
                cardOverlayEnabled: true,
                cardStyleInterpolator: ({ current: { progress } }) => {
                    return {
                        cardStyle: {
                            transform: [
                                {
                                    translateY: progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [500, 0],
                                    }),
                                },
                            ],
                        },
                        overlayStyle: {
                            opacity: progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0.5],
                            }),
                        },
                    };
                },

            }}>
                <Stack.Screen name={NavigationConstants.myOrdersFilter} component={MyOrdersFilter}
                    options={{
                        headerBackImage: () => (
                            <View style={styles.headerLeadingButton}>
                                <Ionicons name="md-close" size={24} color="black" />
                            </View>
                        ),
                        headerBackTitleVisible: false


                    }} />
                    <Stack.Screen name={NavigationConstants.myOrdersSortBy} component={MyOrdersSortBy}
                    options={{
                        headerBackImage: () => (
                            <View style={styles.headerLeadingButton}>
                                <Ionicons name="md-close" size={24} color="black" />
                            </View>
                        ),
                        headerBackTitleVisible: false


                    }} />
            </Stack.Group>
        </Stack.Navigator >

    )
}

const styles = StyleSheet.create({
    headerLeadingButton: {
        marginLeft: 10
    },
    headerLeadingButtonWB: {
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 10
    }
})

export default MyOrdersNavigator