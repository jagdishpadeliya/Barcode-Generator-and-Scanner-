import React from "react";
import { Text } from "react-native";
import Barcode from 'react-native-barcode-builder';
const GenerateBarCode = ({randomNumber}) => {
    return (
        <Text>
            <Barcode value={`${randomNumber}`} format="CODE128" />;
        </Text>
    )
}

export default GenerateBarCode;