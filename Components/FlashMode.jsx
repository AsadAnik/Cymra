import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Feather as Icon } from '@expo/vector-icons';

const FlashMode = ({ flash, _toggleFlashMode, size, color }) => {
    // Custom Reverse IconColor..
    const iconColor = color === 'white' ? 'black' : 'white';

     // StyleSheet..
     const styles = StyleSheet.create({
        iconStyle: {
            backgroundColor: iconColor === 'white' ? 'black' : 'white',
            borderRadius: 100,
            borderWidth: 1,
            borderColor: 'lightgray',
            padding: 3,
        }
    });

    return (
            <View style={styles.iconStyle}>
                {/* ---- FlashMode ----- */}
                <TouchableOpacity onPress={() => _toggleFlashMode()} style={{ marginTop: -1 }}>
                    <Icon
                        name={flash === Camera.Constants.FlashMode.on ? "zap" : "zap-off"}
                        size={size}
                        color={iconColor}
                    />
                </TouchableOpacity>
            </View>
    );
};

export default FlashMode;