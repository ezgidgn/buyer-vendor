import React, { FC, useEffect, useState } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileManagementScreen from "../screens/profile/ProfileManagementScreen";
import HomeScreen from "../screens/home/HomeScreen";
import NavigationConstants from "./NavigationConstants";
import MyProductsNavigator from "./MyProductsNavigator";
import Login from "../Login";
import MyOrdersNavigator from "./MyOrdersNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../src/redux/ReduxStore";
import AuthReducer from "../src/redux/reducers/AuthReducer";
import ProductClaimScreen from "../screens/productClaim/ProductClaimScreen";
import Loading from "../components/Loading";
import Logout from "../screens/logout/Logout";
import ProductClaimsListScreen from "../screens/productClaim/ProductClaimsListScreen";
import ProductClaimNavigator from "./ProductClaimNavigator";

const DrawerNavigator: FC = () => {
    const [checkStorage, setCheckStorage] = useState<boolean>(false)
    const { isLoggedIn } = useSelector((state: ApplicationState) => state.authReducer)
    const { isLoading } = useSelector((state: ApplicationState) => state.mainReducer)


    const dispatch = useDispatch<any>()

    const controlIsLoggedIn = async (): Promise<void> => {
        const jwtInState = await AsyncStorage.getItem('jwt')
        if (jwtInState) {
           await dispatch(AuthReducer.asyncstorageControl(jwtInState!))
        }
        setCheckStorage(true)
    }

    useEffect(() => {
        controlIsLoggedIn()
    }, [])

    const Drawer = createDrawerNavigator();
    //TODO Ezgi ekran çevirilerinin tamamlanması
    return (
        isLoggedIn ?
            <Drawer.Navigator initialRouteName={NavigationConstants.home} >
                <Drawer.Screen name={NavigationConstants.home} component={HomeScreen} options={{title : "Home page"}}/>
                <Drawer.Screen name={NavigationConstants.myOrdersNavigator} component={MyOrdersNavigator} />
                <Drawer.Screen name={NavigationConstants.myProductsNavigator} component={MyProductsNavigator}  options={{headerShown: false}}/>
                <Drawer.Screen name={NavigationConstants.profile} component={ProfileManagementScreen} />
                <Drawer.Screen name={NavigationConstants.productClaimsNavigator} component={ProductClaimNavigator} />
                <Drawer.Screen name={NavigationConstants.logout} component={Logout}/>
            </Drawer.Navigator >
            :
            <>
                {checkStorage && <Login />}
            </>
    )
}
export default DrawerNavigator

