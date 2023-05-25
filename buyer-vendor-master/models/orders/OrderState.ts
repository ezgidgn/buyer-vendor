import { BaseArrayResponseModel } from "../common/BaseArrayResponseModel";
import { OrderModel } from "./OrderModel";

export interface OrderState {
    orders?: BaseArrayResponseModel<OrderModel>
}
