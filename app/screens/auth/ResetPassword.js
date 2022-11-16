import { Image, StyleSheet, View } from 'react-native';
import React from 'react'
import AppText from '../../components/AppText'
import AppButton from '../../components/AppButton'
import colors from '../../config/colors'
import Textinput from '../../components/forms/TextInput';

export default function ResetPassword() {
    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles?.logo}
                    source={require("../../assets/logo-primary.png")}
                />
                <View style={styles.headingWrapper}>
                    <AppText style={styles.heading}>New password</AppText>
                    <AppText style={styles.text}>Please create your new password</AppText>
                </View>
                <Textinput
                    placeholder='Enter new password'
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    disableFullScreenUI
                    secureTextEntry={true}
                    icon={require('../../assets/eye.png')}
                />
                <Textinput
                    placeholder='Confirm new password'
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    disableFullScreenUI
                    secureTextEntry={true}
                    icon={require('../../assets/eye.png')}
                />
                <View style={styles.buttonWrapper}>
                    <AppButton
                        title="Done"
                        style={styles.signin}
                        text={colors.white}
                    />
                </View>
                <View style={styles.signInText}>
                    <AppText style={styles.text}>
                        <AppText style={{ color: colors.primary }}>Sign in </AppText>
                        instead
                    </AppText>
                </View>
                <View style={styles.skipWrapper}>
                    <AppText>Skip</AppText>
                    <Image source={require('../../assets/right-arrow.png')} style={styles.rightIcon} />
                </View>
            </View>
            <Image source={require('../../assets/left-arrow.png')} style={styles.backButton} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 70,
        alignItems: 'center',
    },
    logo: {
        width: 84,
        height: 61,
    },
    headingWrapper: {
        width: '100%',
        marginVertical: 50
    },
    heading: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: colors.darkBlack
    },
    input: {
        marginTop: 20
    },
    text: {
        textAlign: 'center',
        paddingHorizontal: 30,
        marginTop: 3,
        color: colors.gray
    },
    forgot: {
        color: colors.primary,
        fontSize: 14,
        marginLeft: "auto"
    },
    buttonWrapper: {
        width: '100%',
        marginTop: 20,
    },
    signin: {
        width: '100%'
    },
    signInText: {
        marginTop: 40
    },
    skipWrapper: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightIcon: {
        width: 10,
        height: 15,
        marginLeft: 8
    },
    backButton: {
        width: 11,
        height: 18,
        position: 'absolute',
        top: 50,
        left: 20
    }
})