import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AuthReducer from "./reducers/AuthReducer";
import OrderReducer from "./reducers/OrderReducer";
import ProductReducer from "./reducers/ProductReducer";
import ProfileReducer from "./reducers/ProfileReducer";
import ProductFilterAndSortReducer from "./reducers/ProductFilterAndSortReducer";
import OrderFilterAndSortReducer from "./reducers/OrderFilterAndSortReducer";
import MainReducer from "./reducers/MainReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import ProductClaimsListReducer from "./reducers/ProductClaimsListReducer";

const reducer = combineReducers({
  authReducer: AuthReducer.reducer,
  orderReducer: OrderReducer.reducer,
  productReducer: ProductReducer.reducer,
  orderFilterAndSortReducer: OrderFilterAndSortReducer.reducer,
  categoryReducer:CategoryReducer.reducer,
  profileReducer: ProfileReducer.reducer,
  productFilterAndSortReducer: ProductFilterAndSortReducer.reducer,
  mainReducer: MainReducer.reducer,
  productClaimsListReducer:ProductClaimsListReducer.reducer
});

export type ApplicationState = ReturnType<typeof reducer>;

const store = configureStore({
  reducer,
});

export { store, reducer };
