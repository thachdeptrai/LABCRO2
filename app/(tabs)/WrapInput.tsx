import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WrapInputProps {
    title: string;
    required?: boolean;
    error?: string;
    description?: string;
    children: React.ReactNode;
}

const WrapInput: React.FC<WrapInputProps> = ({ title, required, error, description, children }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {title} {required && <Text style={styles.required}>*</Text>}
            </Text>
            {children}
            {error ? <Text style={styles.errorText}>{error}</Text> : description && <Text style={styles.description}>{description}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    required: {
        color: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    description: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
});

export default WrapInput;
