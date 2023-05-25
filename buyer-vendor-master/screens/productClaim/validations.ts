import * as yup from "yup"
import i18n from "../../i18n/Translations";

interface FormValues {
    name: string;
    sku: string;
    price: string;
    barcode: string;
    manufacturer: string;
    description: string;
    }

const validations:yup.Schema<FormValues>=yup.object().shape({
    name:yup.string().required(i18n.t("productClaimScreen.nameValidationMessage")),
    sku:yup.string().required(i18n.t("productClaimScreen.skuValidationMessage")),
    price:yup.string().required(i18n.t("productClaimScreen.priceValidationMessage")),
    barcode:yup.string().required(i18n.t("productClaimScreen.barcodeValidationMessage")),
    manufacturer:yup.string().required(i18n.t("productClaimScreen.manufacturerValidationMessage")),
    description:yup.string().required(i18n.t("productClaimScreen.descriptionValidationMessage")),
})

export default validations