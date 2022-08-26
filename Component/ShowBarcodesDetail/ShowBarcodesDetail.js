import React from "react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import getDataFromAsync from "../AsyncStorage/getDataFromAsync";

const ShowBarcodesDetail = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            const result = await getDataFromAsync();
            if (result) {
                setData(result);
            }
        })();
    }, [])
    return (
        <View style={{ width: '98%', flexDirection: 'column', alignItems: "center", borderWidth: 1, paddingVertical: 50 }}>
            <View style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'rgba(0,0,0,0.9)', textDecorationLine: 'underline' }}>Barcode Details:</Text>
            </View>
            {
                data.length > 0 && data.map((item, index) => {
                    return <View key={index} style={{ width: '90%', borderBottomWidth: 1, justifyContent: 'space-between', flexDirection: 'row' }}><Text style={{ color: 'rgba(0,0,0,1)', fontWeight: 'bold', fontSize: 18 }}>{item.value}</Text><Text style={{ color: 'rgba(0,0,0,0.7)', fontSize: 18, fontWeight: '500' }}>{item.result}</Text></View>
                })
            }
        </View>
    )
}

export default ShowBarcodesDetail;