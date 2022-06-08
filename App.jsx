import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
// import IconButton from './src/widgets/IconButton';
import FlashMode from './Components/FlashMode';
import ZoomMode from './Components/ZoomMode';
import WhiteBalanceMode from './Components/WhiteBalanceMode';
import FlipMode from './Components/FlipMode';
import Capture from './Components/Capture';

// Width Dimention..
const { width: wWidth, height: wHeight } = Dimensions.get('window');

// Functional Component..
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [whiteBalance, setWhiteBalance] = useState(Camera.Constants.WhiteBalance.auto);
  const [zoomRange, setZoomRange] = useState(0);

  // console.log(type);

  // Make how to take picture from Cymra...
  const cam = useRef();

  // Take Capture of image..
  const _takePicture = async () => {
    // console.log('Take Picture Pressed!');
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
      await MediaLibrary.createAlbumAsync("Cymra", assert);
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

  // Camera Type..
  const _handleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  // WhiteBalance..
  const _handleWhiteBalance = (value) => {
    let whiteBalanceValue = Camera.Constants.WhiteBalance;

    switch (value) {
      case "auto":
        setWhiteBalance(whiteBalanceValue.auto);
        break;

      case "sunny":
        setWhiteBalance(whiteBalanceValue.sunny);
        break;

      case "cloudy":
        setWhiteBalance(whiteBalanceValue.cloudy);
        break;

      case "shadow":
        setWhiteBalance(whiteBalanceValue.shadow);
        break;

      case "incandescent":
        setWhiteBalance(whiteBalanceValue.incandescent);
        break;

      case "fluorescent":
        setWhiteBalance(whiteBalanceValue.fluorescent);
        break;

      default:
        setWhiteBalance(whiteBalanceValue.auto);
    }
  }

  // Zoom Effect..
  const _zoomEffect = (range) => {
    // console.log(range);
    setZoomRange(range);
  };

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
    <View style={{ flex: 1 }}>
      <StatusBar />

      {/* -------- Camera Box -------- */}
      <Camera
        zoom={zoomRange}
        whiteBalance={whiteBalance}
        flashMode={flash}
        ref={cam}
        style={styles.cameraBox}
        type={type}
      >
        <View style={styles.camContainer}>
          <View style={styles.camHeader}>
            {/* ---- FlashMode ----- */}
            <FlashMode
              flash={flash}
              _toggleFlashMode={_toggleFlashMode}
              size={25}
              color="white"
            />
          </View>

          {/* ---- Zoom ----- */}
          <ZoomMode _zoomEffect={_zoomEffect} />

          <View style={styles.camBottom}>
            <View style={{
              // paddingVertical: 25, 
              // justifyContent: 'center',
              flexDirection: "column",
              justifyContent: "center",
              width: wWidth,
            }}>
              {/* -------- 1st Upper Row of Camera Bottom -------- */}
              {/* ---- WhiteBalance ---- */}
              <WhiteBalanceMode 
                _handleWhiteBalance={_handleWhiteBalance} 
                whiteBalance={whiteBalance}  
              />

              {/* -------- 2nd Bottom Row of Camera Bottom -------- */}
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* ---- Flip Button ---- */}
                <FlipMode 
                  _handleCameraType={_handleCameraType} 
                  size={20}
                  color="white"
                />

                {/* ---- Capture Button ---- */}
                <Capture
                  type="normal"
                  _takePicture={_takePicture}
                  size={50}
                  color="white"
                />

                {/* ---- Grid Capture Button ---- */}
               <Capture
                  type="gridMode"
                  _takePicture={_takePicture}
                  size={20}
                  color="white"
               />
              </View>
            </View>
          </View>
        </View>
      </Camera>
    </View>
  );
}

// StyleSheet CSS Objects..
const styles = StyleSheet.create({
  cameraBox: {
    flex: 1,
    width: wWidth,
    height: wHeight,
    pading: 0,
    margin: 0,
  },
  camContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  camHeader: {
    backgroundColor: 'black',
    height: wHeight * 0.1 - 10,
    width: wWidth,
    padding: 20,
  },
  camBottom: {
    bottom: 0,
    backgroundColor: "black",
    width: wWidth,
    opacity: 0.7,
    height: wHeight * 0.2,
  },
  camBottomInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wWidth * 0.8,
    paddingHorizontal: wWidth * 0.2
  },
});
