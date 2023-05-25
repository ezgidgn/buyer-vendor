import { BaseArrayResponseModel } from "../common/BaseArrayResponseModel";
import { BaseResponseModel } from "../common/BaseResponseModel";
import { ProductsModel } from "./ProductsModel";

export interface ProductsState {
    products?: BaseArrayResponseModel<ProductsModel>
    product?: BaseResponseModel<ProductsModel>
}