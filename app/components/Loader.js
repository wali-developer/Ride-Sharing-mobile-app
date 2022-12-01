import React from 'react';
import { ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import colors from '../config/colors';
import Screen from './Screen';

const { width, height } = Dimensions.get('screen')

const Loader = ({ loading }) => (
    <Screen style={styles.container}>
        <ActivityIndicator
            size="large"
            animating={loading}
            color={'white'}
        />
    </Screen>
);

const styles = StyleSheet.create({
    container: {
        width: width + 10,
        height: height + 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        elevation: 5
    },
});

export default Loader;