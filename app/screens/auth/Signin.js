import { Image, StyleSheet, View, ActivityIndicator, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react'
import AppText from '../../components/AppText'
import AppButton from '../../components/AppButton'
import colors from '../../config/colors'
import Textinput from '../../components/forms/TextInput';
import authApi from '../../api/auth';
import useAuth from '../../auth/useAuth';
import ErrorMessage from '../../components/forms/ErrorMessage';
import Loader from '../../components/Loader';

export default function Signin({ navigation }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const [loginFailed, setLoginFailed] = useState(false);
    const auth = useAuth();
    const [loading, setLoading] = useState(false);

    const loginHandler = async () => {
        setLoading(true)
        try {
            const response = await authApi.login(loginData?.email, loginData?.password)
            if (!response.data?.token) {
                setLoginFailed(true)
                alert(response?.data)
            } else {
                setLoginFailed(false);
                alert("Login Successfull");
                auth.logIn(response.data?.token);
            }
            setLoading(false)

        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <>
            <ScrollView>
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
                    <TouchableWithoutFeedback onPress={() => navigation?.navigate('ForgotPassword')}>
                        <AppText style={styles.forgot}>Forgot password?</AppText>
                    </TouchableWithoutFeedback>
                    <View style={styles.buttonWrapper}>
                        <AppButton
                            title="Sign in"
                            style={styles.signin}
                            text={colors.white}
                            onPress={loginHandler}
                        />
                    </View>
                    <View style={styles.signUpText}>
                        <AppText style={styles.text}>Don't have an account?
                            <TouchableWithoutFeedback onPress={() => navigation.navigate("Register")}>
                                <AppText style={{ color: colors.primary }}> Sign up</AppText>
                            </TouchableWithoutFeedback>
                        </AppText>
                    </View>
                    {/* <View style={styles.skipWrapper}>
                    <AppText>Skip</AppText>
                    <Image source={require('../../assets/right-arrow.png')} style={styles.rightIcon} />
                </View> */}
                </View>
            </ScrollView>
            {loading &&
                <Loader loading={loading} />
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 50,
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
        marginTop: 50
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