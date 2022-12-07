import { Button, StyleSheet, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import Screen from '../components/Screen';
import storage from '../auth/storage';
import colors from '../config/colors';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import useAuth from '../auth/useAuth';
import AppText from '../components/AppText';
import apiClient from '../api/client';

// List item array
const listingsData = [
    {
        id: 1,
        title: "Edit Profile",
        icon: {
            name: "account-edit-outline",
            backgroundColor: colors.secondary,
        },
        targetScreen: "Profile",
    },
    {
        id: 2,
        title: "My Rides",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary,
        },
        targetScreen: "History",
    },
];

export default function Account({ navigation }) {
    const { user, logOut } = useAuth();
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        if (user) {
            apiClient.get(`user/${user?._id}`).then(res => {
                setUserData(res?.data);
            }).catch(err => console.log(err));
        }
    }, [user])

    return (
        <Screen style={styles.container}>
            <View style={styles.cover}>
                <Image source={require('../assets/myPic.jpg')} style={styles.profile} />
            </View>
            <AppText style={styles.userName}>{userData?.fullName}</AppText>
            <View style={styles.listWrapper}>
                <View style={[styles.List, { marginTop: 25 }]}>
                    <FlatList
                        data={listingsData}
                        keyExtractor={(listingItem) => listingItem.id.toString()}
                        renderItem={({ item }) => (
                            <ListItem
                                title={item.title}
                                IconComponent={
                                    <Icon
                                        name={item.icon.name}
                                        backgroundColor={item.icon.backgroundColor}
                                    />
                                }
                                onPress={() => navigation.navigate(item.targetScreen)}
                            />
                        )}
                    />
                </View>
                <View style={styles.List}>
                    <ListItem
                        title={"Log Out"}
                        IconComponent={<Icon name="logout" backgroundColor={colors.yellow} />}
                        onPress={() => logOut()}
                    />
                </View>
            </View>

        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightBg
    },
    cover: {
        height: 130,
        backgroundColor: colors.primary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: -130
    },
    userName: {
        marginTop: 60,
        fontSize: 22,
        fontWeight: '600',
        color: colors.darkBlack,
        textAlign: 'center'
    },
    listWrapper: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        marginTop: 30
    },
    List: {
        marginVertical: 10,
        paddingHorizontal: 0,
        backgroundColor: colors.white,
    },
})