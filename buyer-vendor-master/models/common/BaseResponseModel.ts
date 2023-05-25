import { BaseDataModel } from "./BaseDataModel"

export interface BaseResponseModel<T> {
    data: BaseDataModel<T>
}
  