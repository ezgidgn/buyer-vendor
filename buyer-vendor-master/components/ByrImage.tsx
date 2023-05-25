import React, { FC, useMemo } from "react";
import { Image, ImageProps, ImageStyle, StyleProp } from "react-native";
import Constants from "../common/Constants";
import { ImageModel } from "../models/common/ImageModel";
import { BaseArrayResponseModel } from "../models/common/BaseArrayResponseModel";

interface ByrImageProps {
    images?: BaseArrayResponseModel<ImageModel>
    style : StyleProp<ImageStyle>
}

const ByrImage: FC<ByrImageProps> = (props) => {
    const { images, style } = props
    const source = useMemo(() =>
        images?.data && images?.data.length > 0 ?
            { uri: Constants.url + images?.data[0].attributes.url }
            : Constants.placeHolderImage
        , [images])

    return (
        <Image style={style} source={source}/>
    )
}
export default ByrImage