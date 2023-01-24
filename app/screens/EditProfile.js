import { Button, StyleSheet, View, Image, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import Screen from '../components/Screen';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import AppTextinput from '../components/forms/TextInput';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import Loader from '../components/Loader';
import apiClient from '../api/client';
import useAuth from '../auth/useAuth';


export default function Account({ navigation }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        fullName: '',
        userName: '',
        email: '',
        userType: '',
    });

    useEffect(() => {
        if (user) {
            apiClient.get(`user/${user?._id}`).then(res => {
                setUserData(res?.data);
                setUserData(prev => {
                    return {
                        ...prev,
                        fullName: res?.data?.fullName,
                        userName: res?.data?.userName,
                        email: res?.data?.email,
                        userType: res?.data?.userType,
                    }
                })
            }).catch(err => console.log(err));
        }
    }, [user])

    const updateProfile = async () => {
        setLoading(true)
        try {
            const response = await apiClient.patch(`user/${user?._id}`, userData);
            if (response?.ok) {
                alert(response?.data)
            } else {
                alert("Error occured while updating profile")
            }
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    return (
        <>
            <ScrollView>
                <Screen style={styles.container}>
                    {/* <Ionicons
                        name="arrow-back-circle-outline"
                        size={24}
                        color={colors.white}
                        style={styles.back}
                    /> */}
                    <View style={styles.cover}>
                        <Image source={require('../assets/myPic.jpg')} style={styles.profile} />
                    </View>
                    <View style={styles.formWrapper}>
                        <View style={{ marginBottom: 5 }}>
                            <AppTextinput
                                placeholder='Name...'
                                disableFullScreenUI
                                // icon={require('../../assets/gmail.png')}
                                value={userData?.fullName}
                                onChangeText={(value) => setUserData({ ...userData, name: value })}
                            />
                        </View>
                        <View style={{ marginBottom: 5 }}>
                            <AppTextinput
                                placeholder='Username...'
                                disableFullScreenUI
                                // icon={require('../../assets/gmail.png')}
                                value={userData?.userName}
                                onChangeText={(value) => setUserData({ ...userData, userName: value })}
                            />
                        </View>
                        <View style={{ marginBottom: 5 }}>
                            <AppTextinput
                                placeholder='Email...'
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                disableFullScreenUI
                                icon={require('../assets/gmail.png')}
                                value={userData?.email}
                                onChangeText={(value) => setUserData({ ...userData, email: value })}
                            />
                        </View>

                        <View style={{ marginBottom: 5 }}>
                            <AppTextinput
                                placeholder='User type...'
                                disableFullScreenUI
                                // icon={require('../../assets/gmail.png')}
                                value={userData?.userType}
                                onChangeText={(value) => setUserData({ ...userData, userType: value })}
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <AppButton
                                title="Update"
                                text={colors.white}
                                onPress={updateProfile}
                            />
                        </View>
                    </View>

                </Screen>
            </ScrollView>
            {loading && <Loader />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightBg,
        position: 'relative'
    },
    back: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 99
    },
    cover: {
        height: 80,
        backgroundColor: colors.primary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 100,
        marginBottom: -80
    },
    formWrapper: {
        marginTop: 60,
        paddingHorizontal: 20
    },
    buttonWrapper: {
        width: '100%',
        marginTop: 15,
        paddingBottom: 20
    },

})