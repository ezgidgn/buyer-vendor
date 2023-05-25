import { createSlice } from "@reduxjs/toolkit"
import { OrderFilterSortModel } from "../../../models/orders/OrderFilterSortModel"
import { OrdersSortAndFiltersState } from "../../../models/orders/OrdersSortAndFiltersState"

const initialState: OrdersSortAndFiltersState = {
    filterAndSort: {
        sortSelection: "pricel2h"
    }
}

const slice = createSlice({
    name: "orderFilterAndSortReducer",
    initialState,
    reducers: {
        setFilterAndSort: (state: OrdersSortAndFiltersState, action) => {
            state.filterAndSort = action.payload
        }
    }
})

const { setFilterAndSort } = slice.actions

const updateFilterAndSort = (filterAndSort: OrderFilterSortModel) => (dispatch: any) => {
    dispatch(setFilterAndSort(filterAndSort))
}




export default {
    reducer: slice.reducer,
    updateFilterAndSort
}

