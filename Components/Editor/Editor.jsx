import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const Editor = ({ size, color, switchToEditor }) => {
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
            marginLeft: 10
        }
    });

    return (
            <View style={styles.iconStyle}>
                {/* ---- FlashMode ----- */}
                <TouchableOpacity onPress={() => switchToEditor()} style={{ marginTop: -1 }}>
                    <Icon
                        name="edit"
                        size={size}
                        color={iconColor}
                    />
                </TouchableOpacity>
            </View>
    );
};

export default Editor;