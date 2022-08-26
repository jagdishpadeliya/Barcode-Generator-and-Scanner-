import React from 'react';
import {
    DynamsoftBarcodeReader,
    DynamsoftCameraView,
} from 'dynamsoft-capture-vision-react-native';
import { View } from 'react-native';

class ScanBarcode extends React.Component {
    state = {
        results: null
    };
    componentDidMount() {
        (async () => {
            // Initialize the license so that you can use full feature of the Barcode Reader module.
            try {
                await DynamsoftBarcodeReader.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
            } catch (e) {
                console.log(e);
            }
            // Create a barcode reader instance.
            this.reader = await DynamsoftBarcodeReader.createInstance();
            console.log("HI");
            // Add a result listener. The result listener will handle callback when barcode result is returned. 
            this.reader.addResultListener((results) => {
                this.setState({results});
                let resultsss = this.state.results;
                let resultBoxText = "";
                if (resultsss && resultsss.length>0){
                    this.reader.stopScanning();
                    this.reader.removeAllResultListeners();
                    for (let i=0;i<resultsss.length;i++){
                        resultBoxText+=resultsss[i].barcodeFormatString+"-"+resultsss[i].barcodeText;
                    }
                    this.props.setResult(resultBoxText);
                    this.props.setModalVisible(true);
                    this.props.setScanBarcode(false);
                }
                // Update the newly detected barcode results to the state.
            });
            
            // Enable video barcode scanning.
            // If the camera is opened, the barcode reader will start the barcode decoding thread when you triggered the startScanning.
            // The barcode reader will scan the barcodes continuously before you trigger stopScanning.
            this.reader.startScanning();
        })();
    }
    async componentWillUnmount() {
        // Stop the barcode decoding thread when your component is unmount.
        await this.reader.stopScanning();
        // Remove the result listener when your component is unmount.
        this.reader.removeAllResultListeners();
    }
    render() {
        // Add code to fetch barcode text and format from the BarcodeResult
        
        // Render DynamsoftCameraView componment.
        return (
            <View style={{width:"80%",height:200}}>
                <DynamsoftCameraView
                    style={
                        {
                            flex: 1
                        }
                    }
                    ref = {(ref)=>{this.scanner = ref}}
                    overlayVisible={true}
                    >
                    {/*Add a text box to display the barcode result.*/}
                    {/* <Text style={
                        {
                            flex: 0.9,
                            marginTop: 100,
                            textAlign: "center",
                            color: "white",
                            fontSize: 18,
                        }
                    }>{results && results.length > 0 ? resultBoxText : "No Barcode Detected"}</Text> */}
                </DynamsoftCameraView>
            </View>
        );
    }
}

export default ScanBarcode;
// const ScanBarcode = ()=>{
//     const [results,setResults] = useState(null);
//     const ref = useRef();
//     useEffect(()=>{
//         (async () => {
//             // Initialize the license so that you can use full feature of the Barcode Reader module.
//             try {
//                 await DynamsoftBarcodeReader.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
//             } catch (e) {
//                 console.log(e);
//             }
//             console.log("Hi");
//             // Create a barcode reader instance.
//             const reader = await DynamsoftBarcodeReader.createInstance();
//             // Add a result listener. The result listener will handle callback when barcode result is returned. 
//             reader.addResultListener((results) => {
//                 // Update the newly detected barcode results to the state.
//                 setResults({results});
//             });

//             // Enable video barcode scanning.
//             // If the camera is opened, the barcode reader will start the barcode decoding thread when you triggered the startScanning.
//             // The barcode reader will scan the barcodes continuously before you trigger stopScanning.
//             reader.startScanning();
//         })();
//     },[])
//     let resultsOut = results;
//     let resultBoxText = "";
//     if (resultsOut && resultsOut.length>0){
//         for (let i=0;i<resultsOut.length;i++){
//             resultBoxText+=resultsOut[i].barcodeFormatString+"\n"+resultsOut[i].barcodeText+"\n";
//         }
//     }
//         return (
//             <View style={{width:"80%",height:250}}>
//                 <DynamsoftCameraView
//                     style={
//                         {
//                             flex: 1
//                         }
//                     }
//                     ref = {ref}
//                     overlayVisible={true}
//                 >
//                     {/*Add a text box to display the barcode result.*/}
//                     <Text style={
//                         {
//                             flex: 0.9,
//                             marginTop: 100,
//                             textAlign: "center",
//                             color: "white",
//                             fontSize: 18,
//                         }
//                     }>{results && results.length > 0 ? resultBoxText : "No Barcode Detected"}</Text>
//                 </DynamsoftCameraView>
//             </View>
//         );
//     }