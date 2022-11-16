import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from 'react'
import AppText from '../../components/AppText'
import AppButton from '../../components/AppButton'
import colors from '../../config/colors'
import Textinput from '../../components/forms/TextInput';
import authApi from '../../api/auth';
import useAuth from '../../auth/useAuth';
import ErrorMessage from '../../components/forms/ErrorMessage';

export default function Signin() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const [loginFailed, setLoginFailed] = useState(false);
    const auth = useAuth();

    const loginHandler = async () => {
        const response = await authApi.login(loginData?.email, loginData?.password)
        if (!response.ok) return setLoginFailed(true);
        setLoginFailed(false);
        console.log(response.data)
        auth.logIn(response.data?.token);
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles?.logo}
                source={require("../../assets/logo-primary.png")}
            />
            <View style={styles.headingWrapper}>
                <AppText style={styles.heading}>Sign in</AppText>
                <AppText style={styles.text}>Please Sign in to your account</AppText>
            </View>
            <ErrorMessage
                error="Email or Password is Incorrect"
                visible={loginFailed}
            />
            <Textinput
                placeholder='Enter email'
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                disableFullScreenUI
                icon={require('../../assets/gmail.png')}
                onChangeText={(value) => setLoginData({ ...loginData, email: value })}
            />
            <Textinput
                placeholder='Password'
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="phone-pad"
                textContentType="emailAddress"
                disableFullScreenUI
                icon={require('../../assets/eye.png')}
                secureTextEntry={true}
                onChangeText={(value) => setLoginData({ ...loginData, password: value })}
            />
            <AppText style={styles.forgot}>Forgot password?</AppText>
            <View style={styles.buttonWrapper}>
                <AppButton
                    title="Sign in"
                    style={styles.signin}
                    text={colors.white}
                    onPress={loginHandler}
                />
            </View>
            <View style={styles.signUpText}>
                <AppText style={styles.text}>Don't have an account? <AppText style={{ color: colors.primary }}>Sign up</AppText></AppText>
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
        marginVertical: 40
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
        marginTop: 20,
    },
    signin: {
        width: '100%'
    },
    signUpText: {
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
    }
})