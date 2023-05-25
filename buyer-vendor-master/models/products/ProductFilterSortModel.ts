export interface ProductFilterSortModel {
    sortSelection: EnumProductSort,
    filterName?: string,
    filterBuyerSku?: string,
    filterPriceMinimum?: number,
    filterPriceMaximum?: number,
    filterStockMinimum?: number,
    filterStockMaximum?: number,  
}