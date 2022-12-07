import { Button, Image, Pressable, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react'
import AppText from '../../components/AppText'
import AppButton from '../../components/AppButton'
import colors from '../../config/colors'
import Textinput from '../../components/forms/TextInput';
import usersApi from '../../api/users';
import authApi from '../../api/auth';
import Loader from '../../components/Loader';
import useAuth from '../../auth/useAuth';
import apiClient from '../../api/client';

export default function Register({ navigation }) {
    const auth = useAuth();
    const [registerPayload, setRegisterPayload] = useState({
        fullName: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);

    const createUser = async () => {
        setLoading(true)
        try {
            // const response = await usersApi.register(registerPayload)
            const response = await apiClient.post('/user/register', registerPayload)
            console.log("Response: ", response?.data)
            if (response.data && response.ok) {
                console.log(response.data)
                alert(response?.data)
            }
            else {
                alert("An unexpected error occurred.");
                console.log(response);
            }
            setRegisterPayload({
                fullName: '',
                email: '',
                password: ''
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

        // login user
        setLoading(true)
        try {
            const { data } = await authApi.login(registerPayload?.email, registerPayload?.password)
            setLoading(false)
            console.log(data)
            auth.logIn(data?.token);
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ScrollView>
            {loading && <Loader loading={loading} />}
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
                    onChangeText={(value) => setRegisterPayload({ ...registerPayload, fullName: value })}
                />
                <Textinput
                    placeholder='Enter your email'
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    disableFullScreenUI
                    icon={require('../../assets/gmail.png')}
                    onChangeText={(value) => setRegisterPayload({ ...registerPayload, email: value })}
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
                    onChangeText={(value) => setRegisterPayload({ ...registerPayload, password: value })}
                />
                <View style={styles.buttonWrapper}>
                    <AppButton
                        title="Sign up"
                        style={styles.signin}
                        text={colors.white}
                        onPress={createUser}
                    />
                </View>
                <View style={styles.signUpText}>
                    <AppText style={styles.text}>Already have account?
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
                            <AppText style={{ color: colors.primary }}> Sign in</AppText>
                        </TouchableWithoutFeedback>
                    </AppText>
                </View>
                {/* <Pressable onPress={() => navigation.navigate("Login")} style={styles.skipWrapper}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <AppText>Skip</AppText>
                        <Image source={require('../../assets/right-arrow.png')} style={styles.rightIcon} />
                    </View>
                </Pressable> */}
            </View>
        </ScrollView>
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
        marginTop: 30
    },
    signin: {
        width: '100%'
    },
    signUpText: {
        marginTop: 30
    },
    skipWrapper: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    rightIcon: {
        width: 10,
        height: 15,
        marginLeft: 8
    }
})