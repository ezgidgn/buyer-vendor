import { createSlice } from "@reduxjs/toolkit"
import { UserState } from "../../../models/UserModels/UserStateModel"
import { LoginData } from "../../../models/UserModels/LoginDataModel"
import { CredentialsModel } from "../../../models/UserModels/CredentialsModel"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "../../../common/Constants"

const initialState: UserState = {
    isLoggedIn: false,
}

const slice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        loginAction: (state: UserState, action) => {
            state.jwt = action.payload.jwt
            state.user = action.payload.user
            state.isLoggedIn = true
        },
        logoutAction: (state: UserState) => {
            state.jwt = undefined
            state.user = undefined
            state.isLoggedIn = false
        },
        loginVendorDataAction:(state: UserState, action)=>{
            state.vendorId=action.payload
        },
        logoutVendorDataAction:(state: UserState)=>{
            state.vendorId=undefined
        }
    }
})

const { loginAction, logoutAction ,loginVendorDataAction,logoutVendorDataAction} = slice.actions

const login = (cred: CredentialsModel) => async (dispatch: any) => {
    try {
        const response = await axios.post(Constants.apiUrl + "auth/local", cred)
        writeStorage(response.data.jwt)
        axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.jwt
        dispatch(loginAction(response.data))
        const responseVendorData=await axios.get(Constants.apiUrl+"users/me?populate=vendor")
        dispatch(loginVendorDataAction(responseVendorData.data.vendor.id))
    } catch (error) {
        console.log(error)
        return false
    }
}

const logout = () => async (dispatch: any) => {
    dispatch(logoutAction())
    dispatch(logoutVendorDataAction())
    delete axios.defaults.headers.common['Authorization']
    await AsyncStorage.removeItem("jwt")
}

const asyncstorageControl = (jwtInState: string) => async (dispatch: any) => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + jwtInState
    try {
        const response = await axios.get(Constants.apiUrl + "users/me")
        const data: LoginData = {
            jwt: jwtInState,
            user: response.data
        }
        dispatch(loginAction(data))
        const responseVendorData=await axios.get(Constants.apiUrl+"users/me?populate=vendor")
        dispatch(loginVendorDataAction(responseVendorData.data.vendor.id))
    } catch (error) {
        delete axios.defaults.headers.common['Authorization']
        alert("Oturumunuzun Süresi Dolmuştur Lütfen Tekrar Giriş Yapınız")
    }
}

export default {
    reducer: slice.reducer,
    login,
    logout,
    asyncstorageControl
}

const writeStorage = async (token: string): Promise<void> => {
    await AsyncStorage.setItem('jwt', token)
}