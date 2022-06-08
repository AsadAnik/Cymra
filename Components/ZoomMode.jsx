import React from 'react';
import { View, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

// Width Dimention..
const { width: wWidth } = Dimensions.get('window');

const ZoomMode = ({ _zoomEffect }) => {
    return (
        <View
            style={{
                position: "relative",
                top: 280,
                width: wWidth
            }}
        >
            <Slider
                onValueChange={(range) => _zoomEffect(range)}
                style={{ width: wWidth, height: 100 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#000"
            />
        </View>
    );
};

export default ZoomMode;