import React from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Text } from 'react-native';

// Width Dimention..
const { width: wWidth } = Dimensions.get('window');

// WhiteBalance Props..
const whiteBalanceProps = [
    { id: 'auto', property: 'Auto' },
    { id: 'sunny', property: 'Sunny' },
    { id: 'cloudy', property: 'Cloudy' },
    { id: 'shadow', property: 'Shadow' },
    { id: 'incandescent', property: 'Incandescent' },
    { id: 'fluorescent', property: 'Fluorescent' }
  ];
  
// Components..
const WhiteBalanceMode = ({ _handleWhiteBalance, color }) => {

    return (
        <View
            style={{
                width: wWidth,
                alignItems: "center",
            }}
        >
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
                {whiteBalanceProps.map((item, _) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => _handleWhiteBalance(item.id)}>
                            <View style={{ padding: 5 }}>
                                <Text style={{ color: color, fontSize: 18 }}>{item.property}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    );
};

export default WhiteBalanceMode;