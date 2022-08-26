import React from "react";
import { useState } from "react";
import { Modal, StyleSheet, View,Text, TextInput, Pressable, Alert } from "react-native";
import saveToAsync from "../AsyncStorage/saveToAsync";

const ShowDialogBox = ({ modalVisible, setModalVisible, result }) => {
    const [value, setValue] = useState('');
    if (result == null)
        result = "Example-123456789"
    const barcodeData = result.split("-");
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: "500", marginBottom: 15, textDecorationLine: 'underline' }}>Barcode Details </Text>
                        <View style={{ width: '100%', marginBottom: 15 }}>
                            <Text style={{ fontSize: 18, color: 'black', fontWeight: "500" }}>Barcode Type : <Text style={{ fontSize: 16, color: 'rgba(0,0,0,0.7)' }}>{barcodeData[0]}</Text></Text>
                        </View>
                        <View style={{ width: '100%', marginBottom: 15 }}>
                            <Text style={{ fontSize: 18, color: 'black', fontWeight: "500" }}>Barcode ID : <Text style={{ fontSize: 16, color: 'rgba(0,0,0,0.7)' }}>{barcodeData[1]}</Text></Text>
                        </View>
                        <View style={{ width: '100%', marginBottom: 15 }}>
                            <Text style={{ fontSize: 18, color: 'black', fontWeight: "500" }}>Barcode Name : </Text>
                        </View>
                        <TextInput
                            value={value}
                            onChangeText={(e) => setValue(e)}
                            style={{
                                width: '100%',
                                height: 35,
                                marginBottom: 25,
                                borderWidth: 2,
                                borderColor: 'black',
                                borderRadius: 10,
                                fontSize: 17,
                                padding: 0,
                                paddingLeft: 10,
                                color: 'rgba(0,0,0,0.7)'
                            }}
                            placeholder="Enter..."
                            placeholderTextColor={"rgba(0,0,0,0.8)"}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => saveToAsync({ value, modalVisible, setModalVisible, result })}
                        >
                            <Text style={styles.textStyle}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ShowDialogBox;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: 300,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        width: 60
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});