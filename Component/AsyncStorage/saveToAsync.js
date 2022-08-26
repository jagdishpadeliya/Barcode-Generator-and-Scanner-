import AsyncStorage from "@react-native-async-storage/async-storage";

const saveToAsync = async ({ value, modalVisible, setModalVisible, result }) => {
    try {
        if (!value)
            return;
        var prevData = await AsyncStorage.getItem('BarcodeData');
        if (!prevData)
            prevData = []
        else
            prevData = JSON.parse(prevData);
        prevData.push({ value, result })
        await AsyncStorage.setItem("BarcodeData", JSON.stringify(prevData));
        setModalVisible(!modalVisible)
    } catch (e) {
        console.log(e);
    }
}

export default saveToAsync;