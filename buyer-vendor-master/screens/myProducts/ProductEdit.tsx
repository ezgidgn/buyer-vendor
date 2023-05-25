import { View, StyleSheet, Text, Dimensions } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ProductReducer from '../../src/redux/reducers/ProductReducer';
import { GetProductsRequestModel } from '../../models/products/GetProductsRequestModel';
import { ApplicationState } from '../../src/redux/ReduxStore';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';;
import { ProductsModel } from '../../models/products/ProductsModel';
import { ProductEditRequestModel } from '../../models/products/ProductEditRequestModel';
import { BaseResponseModel } from '../../models/common/BaseResponseModel';
import i18n from '../../i18n/Translations';

const ProductEdit: FC = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch<any>();
    const route = useRoute<any>();
    const { filterAndSort } = useSelector((state: ApplicationState) => state.productFilterAndSortReducer)
    const product: BaseResponseModel<ProductsModel> = route.params.product
    const productEdit: ProductEditRequestModel = {
        name: product.data.attributes.name,
        price: product.data.attributes.price,
        stock: product.data.attributes.stock,
        vendor_sku: product.data.attributes.vendor_sku,
        origin_country: product.data.attributes.origin_country,
        status: product.data.attributes.status,
        gtip_code: product.data.attributes.gtip_code,
        enabled: product.data.attributes.enabled
    }

    const [isSaved, setIsSaved] = useState(false)

    const saveEdit = async (values: object) => {
        await dispatch(ProductReducer.editProduct(product.data.id, values));
        setIsSaved(true)
    }

    const getProducts = async () => {
        const request: GetProductsRequestModel = {
            vendor_id: 4
        }
        await dispatch(ProductReducer.getProductsWithFilters(request, filterAndSort))
        navigation.goBack()
    }

    useEffect(() => {
        if (isSaved) {
            getProducts()
        }
    }, [isSaved])


    return (
        <KeyboardAwareScrollView style={styles.view}>
            <Formik
                initialValues={
                    productEdit
                }
                onSubmit={(values) => saveEdit(values)}>
                {({ handleSubmit, handleChange, values }) => (
                    <View>
                        <View style={styles.textView}>
                            <Text style={styles.textTitle}>{i18n.t("productsScreen.name")}:</Text>
                            <TextInput
                                style={styles.textInput}
                                label={i18n.t("productsScreen.name")}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor='black'
                                value={values.name}
                                onChangeText={handleChange('name')}
                            />
                        </View >
                        <View style={styles.textViewGrey}>
                            <Text style={styles.textTitle}>{i18n.t("productsScreen.vendorSku")}:</Text>
                            <TextInput
                                style={styles.textInput}
                                label={i18n.t("productsScreen.vendorSku")}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor='black'
                                value={values.vendor_sku}
                                onChangeText={handleChange('vendor_sku')}
                            />
                        </View >
                        <View style={styles.textView}>
                            <Text style={styles.textTitle}>{i18n.t("productsScreen.status")}:</Text>
                            <TextInput
                                style={styles.textInput}
                                label={i18n.t("productsScreen.status")}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor='black'
                                value={values.status}
                                onChangeText={handleChange('status')}
                            />
                        </View >
                        <View style={styles.textViewGrey}>
                            <Text style={styles.textTitle}>{i18n.t("productsScreen.originCountry")}:</Text>
                            <TextInput
                                style={styles.textInput}
                                label={i18n.t("productsScreen.originCountry")}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor='black'
                                value={values.origin_country}
                                onChangeText={handleChange('origin_country')}
                            />
                        </View >
                        <View style={styles.textView}>
                            <Text style={styles.textTitle}>{i18n.t("productsScreen.gtipCode")}:</Text>
                            <TextInput
                                style={styles.textInput}
                                label={i18n.t("productsScreen.gtipCode")}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor='black'
                                value={values.gtip_code}
                                onChangeText={handleChange('gtip_code')}
                            />
                        </View >
                        <View style={styles.textViewGrey}>
                            <Text style={styles.textTitle}>{i18n.t("productsScreen.stock")}:</Text>
                            <TextInput
                                style={styles.textInput}
                                label={i18n.t("productsScreen.stock")}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor='black'
                                value={values.stock!.toString()}
                                onChangeText={handleChange('stock')}
                            />
                        </View >
                        <View style={styles.textView}>
                            <Text style={styles.textTitle}>{i18n.t("productsScreen.price")}:</Text>
                            <TextInput
                                style={styles.textInput}
                                label={i18n.t("productsScreen.price")}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor='black'
                                value={values.price!.toString()}
                                onChangeText={handleChange('price')}
                            />
                        </View >
                        <View style={styles.selectionView}>
                            <RadioButton.Group
                                onValueChange={(handleChange('enabled'))}
                                value={values.enabled.toString()}>
                                <RadioButton.Item label={i18n.t("productsScreen.enable")} value="true" labelStyle={{ fontWeight: 'bold' }} />
                                <RadioButton.Item label={i18n.t("productsScreen.disable")} value="false" labelStyle={{ fontWeight: 'bold' }} />
                            </RadioButton.Group>
                        </View>
                        <Button style={styles.button} mode="contained" onPress={() => handleSubmit()}>
                        {i18n.t("productsScreen.save")}
                        </Button>
                    </View>
                )}
            </Formik>
        </KeyboardAwareScrollView >
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    textView: {
        height: 55,
        marginHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    textViewGrey: {
        height: 55,
        borderRadius: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#e7e7e7'
    },
    textTitle: {
        marginHorizontal: 10,
        fontWeight: "bold",
        width: 110
    },
    textInput: {
        height: 40,
        width: Dimensions.get('window').width - 160,
        marginHorizontal: 10,
        backgroundColor: 'white'
    },
    button: {
        height: 40,
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: 'black',
    },
    selectionView: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black'
    }
});

export default ProductEdit