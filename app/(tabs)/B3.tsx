import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTextInput from './CustomTextInput';

const B3: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    return (
        <View style={styles.container}>
            <CustomTextInput title="Tittle" required placeholder="Place holder" />
            <CustomTextInput title="Tittle" required placeholder="Place holder" style={{ borderColor: '#007BFF' }} />
            <CustomTextInput title="Tittle" required placeholder="Place holder" value="Input has value" />
            <CustomTextInput 
                title="Tittle" required 
                placeholder="Place holder" 
                error="Error message" 
                description="Description"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});

export default B3;
