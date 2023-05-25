import { BaseArrayResponseModel } from "../common/BaseArrayResponseModel";
import { ProductClaimModel } from "./ProductClaimModel";


export interface ProductClaimState{
    ProductClaimsList?:BaseArrayResponseModel<ProductClaimModel>
}