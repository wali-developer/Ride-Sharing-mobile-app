import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../components/AppText'
import AppButton from '../components/AppButton'
import colors from '../config/colors'

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles?.logo}
                source={require("../assets/logo-primary.png")}
            />
            <View style={styles.imageWrapper}>
                <Image
                    style={styles.imageCar}
                    source={require("../assets/car-home.png")}
                />
            </View>
            <AppText style={styles.text}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</AppText>
            <View style={styles.buttonWrapper}>
                <AppButton
                    title="Sign in"
                    style={styles.signin}
                    text={colors.white}
                    onPress={() => navigation.navigate("Login")}
                />
                <AppButton
                    title="Sign up"
                    style={styles.signup}
                    color={colors.white}
                    text={colors.black}
                    onPress={() => navigation.navigate("Register")}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 60,
        alignItems: 'center'
    },
    logo: {
        width: 105,
        height: 77
    },
    imageWrapper: {
        width: "85%",
        marginHorizontal: 'auto',
    },
    imageCar: {
        width: '100%',
        resizeMode: 'contain'
    },
    text: {
        textAlign: 'center',
        paddingHorizontal: 15
    },
    buttonWrapper: {
        width: '100%',
        marginTop: 20,
        position: 'absolute',
        bottom: 20,
    },
    signin: {
        width: '100%'
    },
    signup: {
        width: '100%',
        color: colors.primary,
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 1
    },
})