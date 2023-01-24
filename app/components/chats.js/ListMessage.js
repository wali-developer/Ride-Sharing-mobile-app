import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../config/colors'
import { SimpleLineIcons } from '@expo/vector-icons';
import AppText from '../AppText';
import apiClient from '../../api/client';

export default function ListMessage({ conversation, currentUser, navigation }) {
    const [conversationUser, setConversationUser] = useState(null);
    const [userName, setUserName] = useState('');


    // get User details
    useEffect(() => {
        if (currentUser) {
            apiClient.get(`user/${currentUser?._id}`).then(res => {
                setUserName(res?.data?.fullName);
                console.log("user name.....", res?.data?.fullName);

            }).catch(err => console.log(err));
        }
    }, [currentUser])

    useEffect(() => {
        const friendId = conversation?.members?.find(m => m !== currentUser?._id);
        const getConversationUser = async () => {
            const { data } = await apiClient.get(`/user/${friendId}`);
            setConversationUser(data);
        }
        getConversationUser();

        // 
    }, [])

    return (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate('Messages',
                {
                    conversation: conversation,
                    currentUser: currentUser,
                    name: conversationUser?.fullName,
                })
            }
        >
            <View style={styles.profileWrapper}>
                <SimpleLineIcons name="user" size={26} color="white" />
            </View>
            <View style={styles.headerCol}>
                <AppText style={styles.userName}>{conversationUser?.fullName}</AppText>
                <AppText style={styles.messageText}>{"This is some short text of the recent message"}</AppText>
            </View>
            {/* {item?.msgs && ( */}
            <View style={styles.smallText}>
                <AppText style={styles.timeText}>{new Date(conversation?.date).toLocaleDateString()}</AppText>
                {/* <View style={styles.messagesNotify}>
                    <AppText style={{ fontSize: 12, color: colors.white }}>{2}</AppText>
                </View> */}
            </View>
            {/* )} */}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 22,
    },
    profileWrapper: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCol: {
        marginHorizontal: 10,
        flex: 1
    },
    userName: {
        fontSize: 16,
        color: colors.darkBlack,
    },
    messageText: {
        fontSize: 13,
        color: colors.lightGray
    },
    smallText: { flexDirection: 'column', alignItems: 'center' },
    timeText: { fontSize: 11, color: colors.lightGray },
    messagesNotify: {
        width: 23,
        height: 20,
        borderRadius: 6,
        backgroundColor: colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})