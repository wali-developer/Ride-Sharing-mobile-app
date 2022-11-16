import { Image, StyleSheet, View } from 'react-native';
import React from 'react'
import AppText from '../../components/AppText'
import AppButton from '../../components/AppButton'
import colors from '../../config/colors'
import Textinput from '../../components/forms/TextInput';

export default function Register() {
    return (
        <View style={styles.container}>
            <Image
                style={styles?.logo}
                source={require("../../assets/logo-primary.png")}
            />
            <View style={styles.headingWrapper}>
                <AppText style={styles.heading}>Sign up</AppText>
                <AppText style={styles.text}>Please create your account.</AppText>
            </View>
            <Textinput
                placeholder='Enter your name'
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                disableFullScreenUI
                icon={require('../../assets/user.png')}
            />
            <Textinput
                placeholder='Enter your email'
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                disableFullScreenUI
                icon={require('../../assets/gmail.png')}
            />
            <Textinput
                placeholder='Enter your password'
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="phone-pad"
                textContentType="emailAddress"
                disableFullScreenUI
                icon={require('../../assets/eye.png')}
                secureTextEntry={true}
            />
            <View style={styles.buttonWrapper}>
                <AppButton
                    title="Sign up"
                    style={styles.signin}
                    text={colors.white}
                />
            </View>
            <View style={styles.signUpText}>
                <AppText style={styles.text}>Already have account? <AppText style={{ color: colors.primary }}>Sign in</AppText></AppText>
            </View>
            <View style={styles.skipWrapper}>
                <AppText>Skip</AppText>
                <Image source={require('../../assets/right-arrow.png')} style={styles.rightIcon} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    logo: {
        width: 84,
        height: 61,
    },
    headingWrapper: {
        width: '100%',
        marginTop: 40,
        marginBottom: 20
    },
    heading: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: colors.darkBlack
    },
    text: {
        textAlign: 'center',
        paddingHorizontal: 14,
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
        marginTop: 15,
    },
    signin: {
        width: '100%'
    },
    signUpText: {
        marginTop: 25
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
    }
})