import React, { FC } from "react";
import NavigationConstants from "./NavigationConstants";
import { createStackNavigator } from "@react-navigation/stack";
import MyProductsScreen from "../screens/myProducts/MyProductsScreen";
import MyProductsFilter from "../screens/myProducts/MyProductsFilter";
import ProductDetail from "../screens/myProducts/ProductDetail";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MyProductsSortBy from "../screens/myProducts/MyProductsSortBy";
import ProductEdit from "../screens/myProducts/ProductEdit";
import i18n from "../i18n/Translations";


const MyProductsNavigator: FC = () => {

    const Stack = createStackNavigator();
    const navigation = useNavigation<any>();



    return (

        <Stack.Navigator initialRouteName={NavigationConstants.myProducts}>
            <Stack.Screen name={NavigationConstants.myProducts} component={MyProductsScreen}
                options={{
                    title:i18n.t("productsScreen.myProducts"),
                    headerLeft: () => (
                        <TouchableOpacity style={styles.headerLeadingButton} onPress={() => navigation.openDrawer()}>
                            <Ionicons name="md-menu" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }} />
            <Stack.Screen options={{
                headerBackTitleVisible: false,
                headerTransparent: true,
                headerTitle: '',
                headerBackImage: () => (
                    <View style={styles.headerLeadingButtonWB}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </View>
                ),
            }} name={NavigationConstants.productDetail} component={ProductDetail} />
            <Stack.Screen options={{
                title:i18n.t("productsScreen.productEdit"),
            }} name={NavigationConstants.productEdit} component={ProductEdit} />
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
                <Stack.Screen name={NavigationConstants.myProductsFilter} component={MyProductsFilter}
                    options={{
                        title:i18n.t("productsScreen.filters"),
                        headerBackImage: () => (
                            <View style={styles.headerLeadingButton}>
                                <Ionicons name="md-close" size={24} color="black" />
                            </View>
                        ),
                        headerBackTitleVisible: false


                    }} />
                <Stack.Screen name={NavigationConstants.myProductsSortBy} component={MyProductsSortBy}
                    options={{
                        title:i18n.t("productsScreen.sortBy"),
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

export default MyProductsNavigator
