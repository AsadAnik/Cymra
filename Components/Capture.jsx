import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const Capture = ({ type, _takePicture, size, color }) => {

    if (type === 'gridMode') {
        return (
            <View>
                <TouchableOpacity
                    // style={styles.button}
                    onPress={() => _takePicture()}
                >
                    {/* <Text style={styles.text}> Capture </Text> */}
                    <Icon name="grid" size={size} color={color} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View>
            <TouchableOpacity
                // style={styles.button}
                onPress={() => _takePicture()}
            >
                {/* <Text style={styles.text}> Capture </Text> */}
                <Icon name="aperture" size={size} color={color} />
            </TouchableOpacity>
        </View>
    );
};

export default Capture;