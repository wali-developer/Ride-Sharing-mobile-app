import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Screen from '../components/Screen';
import storage from '../auth/storage';

export default function Account() {
    const logout = () => {
        storage.removeToken()
    }
    return (
        <Screen style={styles.container}>
            <Text>My Account settings</Text>
            <Button title='Logout' onPress={logout} />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8
    }
})