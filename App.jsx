import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
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
import AppThemeMode from './Components/AppThemeMode';
import EditorMode from './Components/Editor/Editor';
import BarcodeScannerMode from './Components/BarcodeScanner/BarcodeScannerMode';

// Width Dimention..
const { width: wWidth, height: wHeight } = Dimensions.get('window');

// Functional Component..
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [whiteBalance, setWhiteBalance] = useState(Camera.Constants.WhiteBalance.auto);
  const [zoomRange, setZoomRange] = useState(0);
  const [appThemeMode, setAppThemeMode] = useState('light');

  // console.log(type);

  // Make how to take picture from Cymra...
  const cam = useRef();

  // Switch To Editor Mode..
  const switchToEditor = () => {
    alert("Editor Mode is Comming Soon..");
  };

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
  const _toggleFlashMode = () => {
    const flashOff = Camera.Constants.FlashMode.off;
    const flashOn = Camera.Constants.FlashMode.on;
    setFlash(flash === flashOff ? flashOn : flashOff);
  }

  // AppThemeMode..
  const _toggleAppThemeMode = () => {
    // setAppThemeMode({
    //   appTheme: appThemeMode.appTheme === 'light' ? 'dark' : 'light',
    //   components: appThemeMode.components === 'light' ? 'dark' : 'light'
    // });

    setAppThemeMode(appThemeMode === 'light' ? 'dark' : 'light');
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
      backgroundColor: appThemeMode === 'light' ? 'white' : 'black',
      // height: wHeight * 0.2 - 60,
      height: 103,
      width: wWidth,
      padding: 20,
      paddingTop: 50,
      opacity: 0.8
    },
    camBottom: {
      bottom: 0,
      backgroundColor: appThemeMode === 'light' ? 'white' : 'black',
      width: wWidth,
      opacity: 0.7,
      height: wHeight * 0.2 - 10,
    },
    camBottomInside: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: wWidth * 0.8,
      paddingHorizontal: wWidth * 0.2
    },
  });

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
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {/* ---- FlashMode ----- */}
              <FlashMode
                flash={flash}
                _toggleFlashMode={_toggleFlashMode}
                size={25}
                color={appThemeMode === 'light' ? 'black' : 'white'}
              />

              {/* ---- AppThemeMode ---- */}
              <AppThemeMode
                _toggleAppThemeMode={_toggleAppThemeMode}
                size={25}
                color={appThemeMode === 'light' ? 'black' : 'white'}
              />

              {/* ---- Photo Editor ---- */}
              <EditorMode 
                switchToEditor={switchToEditor}
                color={appThemeMode === 'light' ? 'black' : 'white'} 
                size={25}
              />
            </ScrollView>
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
                color={appThemeMode === 'light' ? 'black' : 'white'}
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
                  color={appThemeMode === 'light' ? 'black' : 'white'}
                />

                {/* ---- Capture Button ---- */}
                <Capture
                  _takePicture={_takePicture}
                  size={50}
                  color={appThemeMode === 'light' ? 'black' : 'white'}
                />

                {/* ---- Grid Capture Button ---- */}
                <BarcodeScannerMode
                  size={20}
                  color={appThemeMode === 'light' ? 'black' : 'white'}
                />
              </View>
            </View>
          </View>
        </View>
      </Camera>
    </View>
  );
}
