import { createSlice } from "@reduxjs/toolkit"
import { ProductsSortAndFiltersState } from "../../../models/products/ProductsSortAndFiltersState"
import { ProductFilterSortModel } from "../../../models/products/ProductFilterSortModel"

const initialState: ProductsSortAndFiltersState = {
    filterAndSort: {
        sortSelection: "datel2h"
    }
}

const slice = createSlice({
    name: "productFilterAndSortReducer",
    initialState,
    reducers: {
        setFilterAndSort: (state: ProductsSortAndFiltersState, action) => {
            state.filterAndSort = action.payload
        }
    }
})

const { setFilterAndSort } = slice.actions

const updateFilterAndSort = (filterAndSort: ProductFilterSortModel) => (dispatch: any) => {
    dispatch(setFilterAndSort(filterAndSort))
}
const clearFilterAndSort = () => (dispatch: any) => {
    dispatch(setFilterAndSort(initialState.filterAndSort))
}



export default {
    reducer: slice.reducer,
    updateFilterAndSort,
    clearFilterAndSort
}

