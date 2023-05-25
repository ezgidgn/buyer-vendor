export interface OrderFilterSortModel {
    sortSelection: EnumOrderSort,
    filterName?: string,
    filterStatus?: string,
    filterPriceMinimum?: number,
    filterPriceMaximum?: number,
    filterStockMinimum?: number,
    filterStockMaximum?: number,  
}