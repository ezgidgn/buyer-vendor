import { View, StyleSheet, Dimensions } from 'react-native'
import React, { FC } from 'react'
import { Button, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ProductReducer from '../../src/redux/reducers/ProductReducer';
import { useDispatch, useSelector } from 'react-redux';
import ProductFilterAndSortReducer from '../../src/redux/reducers/ProductFilterAndSortReducer';
import { ApplicationState } from '../../src/redux/ReduxStore';
import { GetProductsRequestModel } from '../../models/products/GetProductsRequestModel';
import i18n from '../../i18n/Translations';

const MyProductsSortBy: FC = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch<any>();
    const { filterAndSort } = useSelector((state: ApplicationState) => state.productFilterAndSortReducer)
    const [checked, setChecked] = React.useState(filterAndSort);

    const showSort = async () => {
        const request: GetProductsRequestModel = {
            vendor_id: 4
        }
        dispatch(ProductFilterAndSortReducer.updateFilterAndSort(checked));
        await dispatch(ProductReducer.getProductsWithFilters(request, checked));

        navigation.goBack();

    };

    const setOnValueChange = (selection: string) => {
        const sortSelection: EnumProductSort = selection as EnumProductSort
        setChecked({ ...checked, sortSelection })
    }

    return (
        <View style={styles.view}>
            <RadioButton.Group onValueChange={(sortSelection: string) => setOnValueChange(sortSelection)} value={checked.sortSelection}>
                <RadioButton.Item label={i18n.t("productsScreen.pricel2h")} value="pricel2h" />
                <RadioButton.Item label={i18n.t("productsScreen.priceh2l")} value="priceh2l" />
                <RadioButton.Item label={i18n.t("productsScreen.stockl2h")} value="stockl2h" />
                <RadioButton.Item label={i18n.t("productsScreen.stockh2l")} value="stockh2l" />
                <RadioButton.Item label={i18n.t("productsScreen.datel2h")} value="datel2h" />
                <RadioButton.Item label={i18n.t("productsScreen.dateh2l")} value="dateh2l" />
            </RadioButton.Group>
            <View style={styles.viewBottom}>
                <Button style={styles.button} mode="contained" onPress={() => showSort()}>
                    {i18n.t("productsScreen.show")}
                </Button></View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1
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

export default MyProductsSortBy