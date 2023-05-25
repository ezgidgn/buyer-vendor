import { BaseDataModel } from "./BaseDataModel"
import { MetaModel } from "./MetaModel"

export interface BaseArrayResponseModel<T>{
    data: BaseDataModel<T>[]
    meta?: MetaModel
  }
  