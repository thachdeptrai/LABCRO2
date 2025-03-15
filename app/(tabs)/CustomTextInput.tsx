import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WrapInput from './WrapInput';

interface CustomTextInputProps extends TextInputProps {
    title: string;
    required?: boolean;
    error?: string;
    description?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ 
    title, required, error, description, ...props 
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');

    return (
        <WrapInput title={title} required={required} error={error} description={description}>
            <View style={[styles.container, isFocused && styles.focused, error && styles.error]}>
                <TextInput
                    style={styles.input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={setValue}
                    value={value}
                    {...props}
                />
                {error && <Icon name="alert-circle" size={20} color="red" style={styles.icon} />}
            </View>
        </WrapInput>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 45,
    },
    focused: {
        borderColor: '#007BFF',
    },
    error: {
        borderColor: 'red',
    },
    input: {
        flex: 1,
        height: '100%',
    },
    icon: {
        marginLeft: 8,
    },
});

export default CustomTextInput;
