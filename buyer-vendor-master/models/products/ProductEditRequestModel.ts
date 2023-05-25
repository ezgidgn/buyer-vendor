export interface ProductEditRequestModel {
    price: number;
    stock: number;
    vendor_sku: string;
    origin_country: string;
    status: string;
    gtip_code: string;
    name: string;
    enabled: boolean;
}