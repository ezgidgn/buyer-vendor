import { View, StyleSheet, Dimensions } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, TextInput } from 'react-native-paper';
import { GetProductsRequestModel } from '../../models/products/GetProductsRequestModel';
import ProductReducer from '../../src/redux/reducers/ProductReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../src/redux/ReduxStore';
import ProductFilterAndSortReducer from '../../src/redux/reducers/ProductFilterAndSortReducer';
import { ProductFilterSortModel } from '../../models/products/ProductFilterSortModel';
import i18n from '../../i18n/Translations';

const MyProductsFilter: FC = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch<any>();
    const { filterAndSort } = useSelector((state: ApplicationState) => state.productFilterAndSortReducer)

    const [stateFilterAndSort, setStateFilterAndSort] = useState<ProductFilterSortModel>(filterAndSort)

    const getProducts = () => {
        const request: GetProductsRequestModel = {
            vendor_id: 4
        }
        dispatch(ProductFilterAndSortReducer.clearFilterAndSort())
        dispatch(ProductReducer.getProducts(request))
        navigation.goBack()
    };

    const getProductWithFilters = () => {
        const request: GetProductsRequestModel = {
            vendor_id: 4
        }

        dispatch(ProductFilterAndSortReducer.updateFilterAndSort(stateFilterAndSort));
        dispatch(ProductReducer.getProductsWithFilters(request, stateFilterAndSort));
        navigation.goBack();
    };

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.textInput}
                label={i18n.t("productsScreen.name")}
                mode='outlined'
                outlineColor='black'
                activeOutlineColor='black'
                value={stateFilterAndSort.filterName}
                onChangeText={filterName => setStateFilterAndSort({ ...stateFilterAndSort, filterName })}
            />
            <Divider style={styles.verticalDivider} />
            <TextInput
                style={styles.textInput}
                label={i18n.t("productsScreen.buyerSku")}
                mode='outlined'
                outlineColor='black'
                activeOutlineColor='black'
                value={stateFilterAndSort.filterBuyerSku}
                onChangeText={filterBuyerSku => setStateFilterAndSort({ ...stateFilterAndSort, filterBuyerSku })}
            />
            <Divider style={styles.verticalDivider} />
            <View style={styles.viewRow}>
                <TextInput
                    style={styles.halfTextInput}
                    label={i18n.t("productsScreen.priceMinimum")}
                    mode='outlined'
                    outlineColor='black'
                    activeOutlineColor='black'
                    value={stateFilterAndSort.filterPriceMinimum ? stateFilterAndSort.filterPriceMinimum.toString() : undefined}
                    onChangeText={filterPriceMinimum => setStateFilterAndSort({ ...stateFilterAndSort, filterPriceMinimum: parseInt(filterPriceMinimum) })}
                    keyboardType='numeric'
                />

                <Divider style={styles.divider} />
                <TextInput
                    style={styles.halfTextInput}
                    label={i18n.t("productsScreen.priceMaximum")}
                    mode='outlined'
                    outlineColor='black'
                    activeOutlineColor='black'
                    value={stateFilterAndSort.filterPriceMaximum ? stateFilterAndSort.filterPriceMaximum.toString() : undefined}
                    onChangeText={filterPriceMaximum => setStateFilterAndSort({ ...stateFilterAndSort, filterPriceMaximum: parseInt(filterPriceMaximum) })}
                    keyboardType='numeric'
                />
            </View>
            <Divider style={styles.verticalDivider} />
            <View style={styles.viewRow}>
                <TextInput
                    style={styles.halfTextInput}
                    label={i18n.t("productsScreen.stockMinimum")}
                    mode='outlined'
                    outlineColor='black'
                    activeOutlineColor='black'
                    value={stateFilterAndSort.filterStockMinimum ? stateFilterAndSort.filterStockMinimum.toString() : undefined}
                    onChangeText={filterStockMinimum => setStateFilterAndSort({ ...stateFilterAndSort, filterStockMinimum: parseInt(filterStockMinimum) })}
                    keyboardType='numeric'
                />
                <Divider style={styles.divider} />
                <TextInput
                    style={styles.halfTextInput}
                    label={i18n.t("productsScreen.stockMaximum")}
                    mode='outlined'
                    outlineColor='black'
                    value={stateFilterAndSort.filterStockMaximum ? stateFilterAndSort.filterStockMaximum.toString() : undefined}
                    onChangeText={filterStockMaximum => setStateFilterAndSort({ ...stateFilterAndSort, filterStockMaximum: parseInt(filterStockMaximum) })}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.viewBottom}>
                <Button style={styles.button} mode="contained" onPress={() => getProducts()}>
                {i18n.t("productsScreen.clearFilters")}
                </Button>
                <Button style={styles.button} mode="contained" onPress={() => getProductWithFilters()}>
                {i18n.t("productsScreen.show")}
                </Button>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        marginHorizontal: 10,
        backgroundColor: 'white'
    },
    halfTextInput: {
        flex: 6,
        marginHorizontal: 10,
        backgroundColor: 'white'
    },
    verticalDivider: {
        marginTop: 15, marginBottom: 10, backgroundColor: 'grey'
    },
    divider: {
        backgroundColor: 'black',
        height: 2,
        width: 10,
        marginTop: 10
    },
    viewBottom: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
    },
    button: {
        marginBottom: 10,
        marginLeft: Dimensions.get('window').width * 0.05,
        width: Dimensions.get('window').width * 0.9,
        flex: 1,
        backgroundColor: 'black',
    }
})

export default MyProductsFilter