import { Button } from "@rneui/base"
import { useRef } from "react"
import { View, PermissionsAndroid, StyleSheet } from "react-native"
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera"

export default function CameraTab() {
    const device = useCameraDevice('back')
    const { hasPermission } = useCameraPermission()
    const camera = useRef<Camera>(null)

    async function requestPermission() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Cool Photo App Camera Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
        }
    }

    if (!hasPermission) {
        requestPermission();
    }
    if (device == null) return <View>No Device</View>


    async function takePhoto() {
        if (camera) {
            const data = await camera.current?.takePhoto()
            console.log(data)
        }
    }
    return (
        <>
            {hasPermission &&
                <View style={styles.container}>
                    <Camera
                        ref={camera}
                        style={styles.camera}
                        device={device}
                        photo={true}
                        isActive={true}
                    ></Camera>
                    <Button onPress={takePhoto} >Capture</Button>
                </View>
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        display: "flex"
    },
    camera: {
        width: "100%",
        height: '90%'
    }
})
