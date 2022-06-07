import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const IconButton = ({ icon, color, size, press }) => {
    return (
        <TouchableWithoutFeedback onPress={() => press()}>
            <Icon name={icon} color={color} size={size}/>
        </TouchableWithoutFeedback>
    );
};

// Make Default Props..
IconButton.defaultProps = { 
    size: 25, 
    color: 'white' 
};

export default IconButton;