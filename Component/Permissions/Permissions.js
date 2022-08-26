import { PermissionsAndroid } from "react-native";
export const requestPermission = async () => {
    if (Platform.OS == 'android') {
        const storagePermission = await PermissionsAndroid.check("android.permission.WRITE_EXTERNAL_STORAGE");
        const cameraPermission = await PermissionsAndroid.check("android.permission.CAMERA");
        if (!cameraPermission) {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Camera accessed");
                } else {
                    console.log("Camera denied");
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            console.log("Permission already granted");
        }
        if (!storagePermission) {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Storage accessed");
                } else {
                    console.log("Storage denied");
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            console.log("Permission already granted");
        }
    };
}