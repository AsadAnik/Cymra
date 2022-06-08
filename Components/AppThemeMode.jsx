import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const AppThemeMode = ({ _toggleAppThemeMode, size, color }) => {
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
            {/* ---- AppThemeMode ----- */}
            <TouchableOpacity style={{ marginTop: -1 }} onPress={() => _toggleAppThemeMode()}>
                <Icon name={iconColor === 'white' ? "moon" : "sun"} size={size} color={iconColor} />
            </TouchableOpacity>
        </View>
    );
};

export default AppThemeMode;