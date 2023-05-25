import { BaseArrayResponseModel } from "../common/BaseArrayResponseModel";
import { CategoryMain } from "./CategoryMainModel";

 export interface CategoryState{
  categories?: BaseArrayResponseModel<CategoryMain>
 }