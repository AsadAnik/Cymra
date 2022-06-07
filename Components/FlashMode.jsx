import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Feather as Icon } from '@expo/vector-icons';

const FlashMode = ({ flash, _toggleFlashMode, size, color }) => {
    return (
        <>
            {/* ---- FlashMode ----- */}
            <ScrollView>
                <TouchableOpacity onPress={() => _toggleFlashMode()}>
                    <Icon
                        name={flash === Camera.Constants.FlashMode.on ? "zap" : "zap-off"}
                        size={size}
                        color={color}
                    />
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

export default FlashMode;