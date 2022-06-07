import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import IconButton from './src/widgets/IconButton';

// Width Dimention..
const { width: wWidth, height: wHeight } = Dimensions.get('window');

// Functional Component..
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  console.log(type);

  // Make how to take picture from Cymra...
  const cam = useRef();

  // Take Capture of image..
  const _takePicture = async () => {
    console.log('Take Picture Pressed!');
    if (cam.current) {
      const options = {
        quality: 0.5,
        base64: true,
        skipProcessing: false
      };

      const picture = await cam.current.takePictureAsync(options);
      const source = picture.uri;

      if (source) {
        cam.current.resumePreview();
        console.log('Source : ', source);
        handleSavePhoto(source);
      }
    }
  };

  // Make Save the image...
  const handleSavePhoto = async (photo) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
      const assert = await MediaLibrary.createAssetAsync(photo);
      await MediaLibrary.createAlbumAsync("Tutorial", assert);
    } else {
      console.log('Oh you missed to give permission');
    }
  };

  // FlashMode..
  const _toggleFlashMode = async () => {
    const flashOff = Camera.Constants.FlashMode.off;
    const flashOn = Camera.Constants.FlashMode.on;
    setFlash(flash === flashOff ? flashOn : flashOff);
  }

  // useEffect hook...
  useEffect(() => {
    // useEffect..
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No Access to Camera</Text>;
  }

  // Returning Statement..
  return (
    <View style={styles.container}>
      <Camera
        flashMode={flash}
        ref={cam}
        style={styles.camera}
        tye={type}
      >

        {/* ---- FlashMode ----- */}
        <View
          style={{
            backgroundColor: 'black',
            width: wWidth,
            height: wHeight * 0.1,
          }}>
          <View style={{ padding: 20, marginTop: 20 }}>
            <ScrollView>
              <TouchableOpacity onPress={() => _toggleFlashMode()}>
                <Icon
                  name={flash === Camera.Constants.FlashMode.on ? "zap" : "zap-off"}
                  size={25}
                  color="white"
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            {/* ---- Flip Button ---- */}
            <View>
              <TouchableOpacity
                // style={styles.button}
                onPress={() => {
                  setType(type === CameraType.back ? CameraType.front : CameraType.back);
                }}
              >
                {/* <Text style={styles.text}> Flip </Text> */}
                <Icon name="refresh-cw" size={50} color="white" />
              </TouchableOpacity>
            </View>

            {/* ---- Capture Button ---- */}
            <View>
              <TouchableOpacity
                // style={styles.button}
                onPress={() => _takePicture()}
              >
                {/* <Text style={styles.text}> Capture </Text> */}
                <Icon name="aperture" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Camera>
    </View>
  );
}

// StyleSheet CSS Objects..
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
