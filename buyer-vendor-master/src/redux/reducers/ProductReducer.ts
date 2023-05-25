import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { ProductsModel } from "../../../models/products/ProductsModel"
import { ProductsState } from "../../../models/products/ProductsState"
import { GetOrdersRequestModel } from "../../../models/orders/GetOrdersRequestModel"
import Constants from "../../../common/Constants"
import { ProductFilterSortModel } from "../../../models/products/ProductFilterSortModel"
import MainReducer from "./MainReducer"

axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMjAyMTA0LCJleHAiOjE2ODM3OTQxMDR9.vjeFr8SlLUYY1lvsBV_2n-klPH6K-hKuCHcQC3XEMhk'

const initialState: ProductsState = {
}


const slice = createSlice({
    name: "productReducer",
    initialState,
    reducers: {
        setProductsReducer: (state: ProductsState, action) => {
            state.products = action.payload
        },
        setProductReducer: (state: ProductsState, action) => {
            state.product = action.payload
        },
    }
})

const { setProductsReducer, setProductReducer } = slice.actions

const getProducts = (request: GetOrdersRequestModel) => async (dispatch: any) => {
    const url = Constants.apiUrl + "products?filters[vendor][id][$eq]=" + request.vendor_id + "&populate=images"
    dispatch(MainReducer.setLoading(true))
    console.log(url)
    await axios.get(url).then(response => {
        const productsModel: ProductsModel = response.data
        dispatch(setProductsReducer(productsModel))
    }).catch((error) => {
        console.log(error)
        //TODO error handling
    }).finally(() => dispatch(MainReducer.setLoading(false)))
}


const getProductsWithFilters = (
    request: GetOrdersRequestModel,
    filterAndSort: ProductFilterSortModel
) => async (dispatch: any) => {
    dispatch(MainReducer.setLoading(true))

    let filters = filterAndSort.filterName ? "&filters[name][$containsi]=" + filterAndSort.filterName : ""
    filters += filterAndSort.filterBuyerSku ? "&filters[buyer_sku][$containsi]=" + filterAndSort.filterBuyerSku : ""
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

    const url = Constants.apiUrl + "products?filters[vendor][id][$eq]=" + request.vendor_id
        + filters + "&sort="
        + priceLowToHigh
        + priceHighToLow
        + stockLowToHigh
        + stockHighToLow
        + newestToOldest
        + oldestToNewest
        + "&populate=images"

    await axios.get(url).then(response => {
        const productsModel: ProductsModel = response.data
        dispatch(setProductsReducer(productsModel))
    }).catch((error) => {
        console.log(error)
        //TODO error handling
    }).finally(() => dispatch(MainReducer.setLoading(false)))
}

const getProduct = (productId: number) => async (dispatch: any) => {
    const url = Constants.apiUrl + "products/" + productId + "?filters&populate=images"
    dispatch(MainReducer.setLoading(true))
    await axios.get(url).then(response => {
        const productModel: ProductsModel = response.data
        dispatch(setProductReducer(productModel))
    }).catch((error) => {
        console.log(error)
        //TODO error handling
    }).finally(() => dispatch(MainReducer.setLoading(false)))
}

const editProduct = (productId: number, data: object) => async (dispatch: any) => {
    const url = Constants.apiUrl + "products/" + productId + "?filters&populate=images"

    dispatch(MainReducer.setLoading(true))
    await axios.put(url, { data }).then(response => {
        const productModel: ProductsModel = response.data
        dispatch(setProductReducer(productModel))
    }).catch((error) => {
        console.log(error)
        //TODO error handling
    }).finally(() => dispatch(MainReducer.setLoading(false)))
}





export default {
    reducer: slice.reducer,
    getProducts,
    getProductsWithFilters,
    getProduct,
    editProduct
}
