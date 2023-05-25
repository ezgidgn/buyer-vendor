import { createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "../../../models/productClaim/CategoryStateModel";
import axios from "axios";
import Constants from "../../../common/Constants";

const initialState:CategoryState={}

const slice = createSlice({
    name: "categoryReducer",
    initialState,
    reducers: {
      setCategories:(state:CategoryState,action)=>{
        state.categories=action.payload
      }
    }
})

const{setCategories}=slice.actions

const getCategories=()=>async(dispatch:any)=>{
    try{
        const response= await axios.get(Constants.apiUrl+"categories")
        dispatch(setCategories(response.data))
    }catch(error){
        console.log(error)
    }

}

export default {
    reducer: slice.reducer,
    getCategories
}