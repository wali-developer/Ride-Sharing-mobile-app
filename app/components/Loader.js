import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../config/colors';
import Screen from './Screen';

const Loader = ({ loading }) => (
    <Screen style={styles.container}>
        <ActivityIndicator
            size="large"
            animating={loading}
            color={colors.primary}
        />
    </Screen>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});

export default Loader;