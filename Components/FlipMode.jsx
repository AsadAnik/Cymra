import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const FlipMode = ({ _handleCameraType, size, color }) => {
    return (
        <View>
            <View>
                <TouchableOpacity
                    // style={styles.button}
                    onPress={() => _handleCameraType()}
                >
                    {/* <Text style={styles.text}> Flip </Text> */}
                    <Icon name="refresh-cw" size={size} color={color} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FlipMode;