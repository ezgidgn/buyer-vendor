import { View, StyleSheet, Dimensions } from 'react-native'
import React, { FC } from 'react'
import { Button, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../src/redux/ReduxStore';
import { GetOrdersRequestModel } from '../../models/orders/GetOrdersRequestModel';
import OrderFilterAndSortReducer from '../../src/redux/reducers/OrderFilterAndSortReducer';
import OrderReducer from '../../src/redux/reducers/OrderReducer';

const MyOrdersSortBy: FC = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch<any>();
    const { filterAndSort } = useSelector((state: ApplicationState) => state.orderFilterAndSortReducer)
    const [checked, setChecked] = React.useState(filterAndSort);

    const showSort = () => {
        console.log(filterAndSort)
        const request: GetOrdersRequestModel = {
            vendor_id: 1
        }
        dispatch(OrderFilterAndSortReducer.updateFilterAndSort(checked));
        dispatch(OrderReducer.getOrdersWithFilters(request, checked));
        navigation.goBack();

    };

    const onSelectionChange = (sortSelection: any) => {
        console.log(sortSelection)
        setChecked({ ...checked, sortSelection })
    }

    return (
        <View style={styles.view}>
            <RadioButton.Group
                onValueChange={onSelectionChange} value={checked.sortSelection}>
                <RadioButton.Item label="Price Low to High" value="pricel2h" />
                <RadioButton.Item label="Price High to Low" value="priceh2l" />
            </RadioButton.Group>
            <View style={styles.viewBottom}>
                <Button style={styles.button} mode="contained" onPress={() => showSort()}>
                    Show
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

export default MyOrdersSortBy