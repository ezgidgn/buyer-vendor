import { BaseArrayResponseModel } from "../common/BaseArrayResponseModel";
import { ImageModel } from "../common/ImageModel";

  export interface ProductsModel {
    price: number;
    stock: number;
    csv_record?: null;
    status: string;
    buyer_sku: string;
    vendor_sku: string;
    origin_country: string;
    gtip_code: string;
    buyer_id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    name: string;
    enabled: boolean;
    images?: BaseArrayResponseModel<ImageModel>
  }