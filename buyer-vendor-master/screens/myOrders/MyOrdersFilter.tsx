import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Dimensions } from 'react-native'
import React from "react";
import { FC, useState } from "react";
import { Button, Divider, TextInput , } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { GetOrdersRequestModel } from "../../models/orders/GetOrdersRequestModel";
import { OrderFilterSortModel } from "../../models/orders/OrderFilterSortModel";
import OrderFilterAndSortReducer from "../../src/redux/reducers/OrderFilterAndSortReducer";
import OrderReducer from "../../src/redux/reducers/OrderReducer";
import { ApplicationState } from "../../src/redux/ReduxStore";

const MyOrdersFilter : FC = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch<any>();
    const { filterAndSort } = useSelector((state: ApplicationState) => state.orderFilterAndSortReducer)

    const [stateFilterAndSort, setStateFilterAndSort] = useState<OrderFilterSortModel>(filterAndSort)

    const getOrders = () => {
        const request: GetOrdersRequestModel = {
            vendor_id: 1
        }
        dispatch(OrderFilterAndSortReducer.updateFilterAndSort(stateFilterAndSort))
        dispatch(OrderReducer.getOrders(request))
        navigation.goBack()
    };

    const getOrdersWithFilters = () => { 
        const request: GetOrdersRequestModel = {
            vendor_id: 1
        }

        dispatch(OrderFilterAndSortReducer.updateFilterAndSort(stateFilterAndSort));
        dispatch(OrderReducer.getOrdersWithFilters(request, stateFilterAndSort)); 
        debugger
        navigation.goBack();
    };

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.textInput}
                label='Name'
                mode='outlined'
                outlineColor='black'
                activeOutlineColor='black'
                value={stateFilterAndSort.filterName}
                onChangeText={filterName => setStateFilterAndSort({ ...stateFilterAndSort, filterName })}
            />
            <Divider style={styles.verticalDivider} />
            <TextInput
                style={styles.textInput}
                label='Status'
                mode='outlined'
                outlineColor='black'
                activeOutlineColor='black'
                value={stateFilterAndSort.filterStatus}
                onChangeText={filterStatus => setStateFilterAndSort({ ...stateFilterAndSort, filterStatus })}
            />
            <Divider style={styles.verticalDivider} />
            <View style={styles.viewRow}>
                <TextInput
                    style={styles.halfTextInput}
                    label='Price Minimum'
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
                    label='Price Maximum'
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
                    label='Stock Minimum'
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
                    label='Stock Maximum'
                    mode='outlined'
                    outlineColor='black'
                    value={stateFilterAndSort.filterStockMaximum ? stateFilterAndSort.filterStockMaximum.toString() : undefined}
                    onChangeText={filterStockMaximum => setStateFilterAndSort({ ...stateFilterAndSort, filterStockMaximum: parseInt(filterStockMaximum) })}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.viewBottom}>
                <Button style={styles.button} mode="contained" onPress={() => getOrders()}>
                    Clear Filters
                </Button>
                <Button style={styles.button} mode="contained" onPress={() => getOrdersWithFilters()}>
                    Show
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

export default MyOrdersFilter