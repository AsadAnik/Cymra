import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Feather as Icon} from '@expo/vector-icons';

const BarcodeScannerMode = ({size, color}) => {
    // Returning Statement..
    const _QRScannerHandle = () => {
        alert('QR Scanner Comming Soon..');
    };

    return (
        <View>
            <TouchableOpacity
                // style={styles.button}
                onPress={() => _QRScannerHandle()}
            >
                {/* <Text style={styles.text}> Capture </Text> */}
                <Icon name="grid" size={size} color={color} />
            </TouchableOpacity>
        </View>
    );
};

export default BarcodeScannerMode;