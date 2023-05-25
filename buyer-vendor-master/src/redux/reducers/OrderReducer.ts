import { createSlice } from "@reduxjs/toolkit";
import { CredentialsModel } from "../../../models/UserModels/CredentialsModel";

import { OrderModel } from "../../../models/orders/OrderModel";
import { OrderState } from "../../../models/orders/OrderState";

import axios from "axios";
import { GetOrdersRequestModel } from "../../../models/orders/GetOrdersRequestModel";
import Constants from "../../../common/Constants";
import { OrderFilterSortModel } from "../../../models/orders/OrderFilterSortModel";

//TODO login bitince bunu sil.
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMjAyMTA0LCJleHAiOjE2ODM3OTQxMDR9.vjeFr8SlLUYY1lvsBV_2n-klPH6K-hKuCHcQC3XEMhk";

const initialState: OrderState = {
  
};

const slice = createSlice({
  name: "orderReducer",
  initialState,
  reducers: {
    setOrdersReducer: (state: OrderState, action) => {
      state.orders = action.payload;
      


    },
  },
});

const { setOrdersReducer } = slice.actions;

const getOrders = (request: GetOrdersRequestModel) => async (dispatch: any) => {
  const url =
    Constants.apiUrl + "orders?filters[vendor][id][$eq]=" + request.vendor_id;
  axios
    .get(url)
    .then((response) => {
      const ordersModel: OrderModel = response.data;
      dispatch(setOrdersReducer(ordersModel));
    })
    .catch((error) => {
      console.log(error);
      //TODO error handling
    });

};

const getOrdersWithFilters = ( 
    request: GetOrdersRequestModel,
    filterAndSort: OrderFilterSortModel,
    
) => async (dispatch: any) => {
    console.log(filterAndSort)
    let filters = filterAndSort.filterName ? "&filters[name][$containsi]=" + filterAndSort.filterName : ""
    filters += filterAndSort.filterStatus ? "&filters[buyer_sku][$containsi]=" + filterAndSort.filterStatus : ""
    filters += filterAndSort.filterPriceMinimum ? "&filters[price][$gte]=" + filterAndSort.filterPriceMinimum : ""
    filters += filterAndSort.filterPriceMaximum ? "&filters[price][$lte]=" + filterAndSort.filterPriceMaximum : ""
    filters += filterAndSort.filterStockMinimum ? "&filters[stock][$gte]=" + filterAndSort.filterStockMinimum : ""
    filters += filterAndSort.filterStockMaximum ? "&filters[stock][$lte]=" + filterAndSort.filterStockMaximum : ""


    const priceLowToHigh = filterAndSort.sortSelection == "pricel2h" ? "price:ASC" : ""
    const priceHighToLow = filterAndSort.sortSelection == "priceh2l" ? "price:DESC" : ""
    const stockLowToHigh = filterAndSort.sortSelection == "stockl2h" ? "stock:ASC" : ""
    const stockHighToLow = filterAndSort.sortSelection == "stockh2l" ? "stock:DESC" : ""
    const newestToOldest = filterAndSort.sortSelection == "datel2h" ? "publishedAt:ASC" : ""
    const oldestToNewest = filterAndSort.sortSelection == "dateh2l" ? "publishedAt:DESC" : ""

    const url = Constants.apiUrl + "orders?filters[vendor][id][$eq]=1" 
        + filters + "&sort="
        + priceLowToHigh
        + priceHighToLow
        + stockLowToHigh
        + stockHighToLow
        + newestToOldest
        + oldestToNewest

    console.log(url)
    axios.get(url).then(response => {
        const ordersModel: OrderModel = response.data
        dispatch(setOrdersReducer(ordersModel))
    }).catch((error) => {
        console.log(error)
    })
    const fetchOrders = () => {
        dispatch(getOrdersWithFilters(request, filterAndSort));
      };
      
      const handleFiltersChange = () => {
        fetchOrders();
      };
    
}

export default {
    reducer: slice.reducer,
    getOrders,
    getOrdersWithFilters
}
