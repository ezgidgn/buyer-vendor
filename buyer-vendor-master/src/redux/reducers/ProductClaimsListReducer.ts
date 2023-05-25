import { createSlice } from "@reduxjs/toolkit";
import { ProductClaimState } from "../../../models/productClaim/ProductClaimStateModel";
import Constants from "../../../common/Constants";
import axios from "axios";


const initialState:ProductClaimState={}

const slice = createSlice({
    name: "productClaimsListReducer",
    initialState,
    reducers: {
      setProductClaims:(state:ProductClaimState,action)=>{
        state.ProductClaimsList=action.payload
      }
    }
})

const{setProductClaims}=slice.actions

const getProductClaims=()=>async(dispatch:any)=>{
    try{
        const response= await axios.get(Constants.apiUrl+"product-claims")
        dispatch(setProductClaims(response.data))
    }catch(error){
        console.log(error)
    }
}

export default {
    reducer: slice.reducer,
    getProductClaims
}


