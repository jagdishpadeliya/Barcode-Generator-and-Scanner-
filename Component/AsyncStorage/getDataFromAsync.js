import AsyncStorage from "@react-native-async-storage/async-storage";

const getDataFromAsync = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('BarcodeData')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

export default getDataFromAsync;