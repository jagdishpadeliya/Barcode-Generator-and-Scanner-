import React, { useEffect, useState } from 'react';
import { View, Button, ScrollView } from 'react-native';
import GenerateBarCode from './Component/GenerateBarcode/GenerateBarcode';
import { requestPermission } from './Component/Permissions/Permissions';
import ShowDialogBox from './Component/Moda/Modal';
import ShowBarcodesDetail from './Component/ShowBarcodesDetail/ShowBarcodesDetail';
import ScanBarcode from './Component/ScanBarcode/ScanBarcode';
const generateRandomNumber = () => {
  const num = new Date().getTime();
  return (Math.floor(Math.random() * 1002).toString() + num.toString()).slice(0, 13);
}
const App = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [showBarcode, setShowBarcode] = useState(true);
  const [scanBarcode, setScanBarcode] = useState(false);
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    requestPermission();
  }, [])
  return (
    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', backgroundColor: "skyblue" }}>
      <View style={{ width: 200, marginTop: 50 }}>
        <View style={{ marginBottom: 15 }}>
          <Button title="Generate Barcode" onPress={() => { setShowHistory(false), setRandomNumber(() => generateRandomNumber()), setShowBarcode(true), setScanBarcode(() => false) }} />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Button title={`${scanBarcode ? 'Stop Scanning' : 'Scan Barcode'}`} onPress={() => { setScanBarcode(!scanBarcode), setShowBarcode(false), setShowHistory(false) }} />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Button title={`${showHistory ? 'Hide History' : 'Show History'}`} onPress={() => { setScanBarcode(false), setShowBarcode(false), setShowHistory(!showHistory) }} />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Button title='Show Modal' onPress={() => setModalVisible(!modalVisible)} />
        </View>
      </View>
      <ScrollView style={{marginTop:10,width:'100%'}}>
        <View style={{ width: "100%", display: 'flex', alignItems: 'center', flexDirection: "column", marginTop: 30 }}>
          {
            scanBarcode && <ScanBarcode setResult={setResult} setScanBarcode={setScanBarcode} setModalVisible={setModalVisible} />
          }
          {
            showBarcode && <GenerateBarCode randomNumber={randomNumber} />
          }
          {
            modalVisible && <ShowDialogBox modalVisible={modalVisible} setModalVisible={setModalVisible} result={result} />
          }
          {
            showHistory && <ShowBarcodesDetail />
          }
        </View>
      </ScrollView>
    </View>
  );
}
export default App;
