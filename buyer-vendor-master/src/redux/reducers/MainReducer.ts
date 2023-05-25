import { createSlice } from "@reduxjs/toolkit"
import { MainState } from "../../../models/main/MainState"


const initialState: MainState = {
    isLoading: false,
    language: "en",
    direction : "ltr"
}
const slice = createSlice({
    name: "mainReducer",
    initialState,
    reducers: {
        isLoadingReducer: (state: MainState, action) => {
            state.isLoading = action.payload
        },
        setLanguage: (state: MainState, action) => {
            state.language = action.payload
            state.direction = action.payload === "ar" ? "rtl" : "ltr"
        }
    }
})

const { isLoadingReducer, setLanguage } = slice.actions

const setLoading = (isLoading: Boolean) => (dispatch: any) => {
    dispatch(isLoadingReducer(isLoading))
}

export default {
    reducer: slice.reducer,
    setLanguage,
    setLoading,
}
