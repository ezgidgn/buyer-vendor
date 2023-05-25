import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { useFormik, validateYupSchema } from 'formik'
import { RadioButton } from 'react-native-paper';
import CategoryView from './CategoryView';
import FormikTextInput from './FormikTextInput';
import { Category } from '../../models/productClaim/CategoryModel';
import { ProductClaimFormValuesModel } from '../../models/productClaim/ProductClaimFormValuesModel';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../src/redux/ReduxStore';
import CategoryReducer from '../../src/redux/reducers/CategoryReducer';
import Constants from '../../common/Constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import validationSchema from "./validations"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import NavigationConstants from '../../navigation/NavigationConstants';
import i18n from '../../i18n/Translations';

const ProductClaimScreen: FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>()
  const { categories } = useSelector((state: ApplicationState) => state.categoryReducer)
  const { vendorId } = useSelector((state: ApplicationState) => state.authReducer)
  const [categoriesView, setCategoriesView] = useState<Category[]>([])
  const [checked, setChecked] = useState<string>("")
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])


  const handleSelectedCategories = (item: Category): void => {
    setSelectedCategories([...selectedCategories, item])
  }

  const handleRemoveSelectedCategories = (item: Category): void => {
    let categoryBackupList: Category[] = selectedCategories
    let newList: Category[] = []
    categoryBackupList.forEach(element => {
      if (element.id === item.id) { } else { newList.push(element) }
    });
    setSelectedCategories(newList)
  }


  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik<ProductClaimFormValuesModel>({
    initialValues: {
      link: "",
      name: "",
      sku: "",
      price: "",
      type: "",
      color: "",
      discount_price: "",
      barcode: "",
      variants: "",
      variant_code: "",
      manufacturer: "",
      vendor: "",
      gender: checked,
      description: "",
      categories: [],
    } as ProductClaimFormValuesModel,
    onSubmit: async (values: ProductClaimFormValuesModel): Promise<void> => {
      values.gender = checked
      values.vendor = vendorId!.toString()
      const category: string[] = []
      selectedCategories.forEach(it => {
        category.push(it.id.toString())
      });
      values.categories = category
      const data = { data: values }
      try {
        await axios.post(Constants.apiUrl + "product-claims", data)
        alert(i18n.t("productClaimScreen.productClaimRequestSuccessMessage"))
        navigation.navigate(NavigationConstants.productClaimsList)
      } catch (error) { console.log(error) }
    },
    validationSchema
  })

  useEffect(() => {
    if (categories && categories?.data.length > 0) {
      setCategoriesView(
        categories?.data?.map(it => {
          return {
            id: it.id, name: it.attributes.name
          }
        }))
    }
  }, [categories])


  useEffect(() => {
    dispatch(CategoryReducer.getCategories())
  }, [])

  return (

    <KeyboardAwareScrollView style={styles.container}>
      <FormikTextInput
        formValue={values.link} handleChange={handleChange('link')} handleBlur={handleBlur('link')} name="productClaimScreen.linkInput" error={errors.link} touch={touched.link} />
      <FormikTextInput
        formValue={values.name} handleChange={handleChange('name')} handleBlur={handleBlur('name')} name='productClaimScreen.nameInput' error={errors.name} touch={touched.name} />
      <FormikTextInput
        formValue={values.sku} handleChange={handleChange('sku')} handleBlur={handleBlur('sku')} name='productClaimScreen.skuInput' error={errors.sku} touch={touched.sku} />
      <FormikTextInput
        formValue={values.price} handleChange={handleChange('price')} handleBlur={handleBlur('price')} name='productClaimScreen.priceInput' error={errors.price} touch={touched.price} />
      <FormikTextInput
        formValue={values.type} handleChange={handleChange('type')} handleBlur={handleBlur('type')} name='productClaimScreen.typeInput' error={errors.type} touch={touched.type} />
      <FormikTextInput
        formValue={values.color} handleChange={handleChange('color')} handleBlur={handleBlur('color')} name='productClaimScreen.colorInput' error={errors.color} touch={touched.color} />
      <FormikTextInput
        formValue={values.discount_price} handleChange={handleChange('discount_price')} handleBlur={handleBlur('discount_price')} name='productClaimScreen.discount_priceInput' error={errors.discount_price} touch={touched.discount_price} />
      <FormikTextInput
        formValue={values.barcode} handleChange={handleChange('barcode')} handleBlur={handleBlur('barcode')} name='productClaimScreen.barcodeInput' error={errors.barcode} touch={touched.barcode} />
      <FormikTextInput
        formValue={values.variants} handleChange={handleChange('variants')} handleBlur={handleBlur('variants')} name='productClaimScreen.variantsInput' error={errors.variants} touch={touched.variants} />
      <FormikTextInput
        formValue={values.variant_code} handleChange={handleChange('variant_code')} handleBlur={handleBlur('variant_code')} name='productClaimScreen.variant_codeInput' error={errors.variant_code} touch={touched.variant_code} />
      <FormikTextInput
        formValue={values.manufacturer} handleChange={handleChange('manufacturer')} handleBlur={handleBlur('manufacturer')} name='productClaimScreen.manufacturerInput' error={errors.manufacturer} touch={touched.manufacturer} />
      <FormikTextInput
        formValue={values.description} handleChange={handleChange('description')} handleBlur={handleBlur('description')} name='productClaimScreen.descriptionInput' error={errors.description} touch={touched.description} />
      <View style={styles.input_container}>
        <Text style={styles.title}>{i18n.t("productClaimScreen.selectProductGender")}</Text>
        <View style={styles.gender_container}>
          <Text>{i18n.t("productClaimScreen.male")}</Text>
          <RadioButton
            color='blue'
            uncheckedColor='blue'
            value="first"
            status={checked === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('male')}
          />
          <Text>{i18n.t("productClaimScreen.female")}</Text>
          <RadioButton
            color='red'
            uncheckedColor='red'
            value="second"
            status={checked === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('female')}
          />
          <Text>{i18n.t("productClaimScreen.unisex")}</Text>
          <RadioButton
            color='black'
            uncheckedColor='black'
            value="second"
            status={checked === 'unisex' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('unisex')}
          />
        </View>
      </View>
      <View style={styles.input_container}>
        <Text style={styles.title}>{i18n.t("productClaimScreen.categories")}</Text>
        <View style={styles.category_container}>
          {
            categoriesView.map(category => (
              <CategoryView key={category.id} data={category} categoryAdd={handleSelectedCategories} categoryRemove={handleRemoveSelectedCategories} />
            ))
          }
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.text}>{i18n.t("productClaimScreen.saveButton")}</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input_container: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    marginHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 3,
    marginVertical: 8
  },
  gender_container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: "center",
  },
  title: {
    marginBottom: 10,
    alignSelf: "center",
    fontWeight: "bold"
  },
  category_container: {
    alignSelf: "center",
  },
  button: {
    backgroundColor: Constants.colors.buttonBackgroundColor,
    padding: 10,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    borderRadius: 15
  },
  text: {
    fontWeight: "bold",
    color: Constants.colors.buttonText
  }
})

export default ProductClaimScreen