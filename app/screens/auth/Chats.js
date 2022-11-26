import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import { AntDesign } from '@expo/vector-icons';
import ListMessage from '../../components/chats.js/ListMessage';
import apiClient from '../../api/client';
import Loader from '../../components/Loader';
import authStorage from '../../auth/storage';

export default function Chat({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const restoreUser = async () => {
            const user = await authStorage.getUser();
            if (user) setUser(user);
        };
        restoreUser();
    }, [])

    useEffect(() => {
        getConversations();
    }, [user])


    const getConversations = async () => {
        setLoading(true)
        try {
            const { data } = await apiClient.get(`/conversations/${user?._id}`);
            if (Array.isArray(data)) {
                setConversations(data);
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const USERS = [
        {
            id: 1,
            name: 'Fahad Khan',
            text: 'This is some short text of the recent message that user have send.',
            time: '3 min ago',
            msgs: '2'
        },
        {
            id: 2,
            name: 'Ali Raza',
            text: 'This is some short text of the recent message that user have send.',
            time: 'a hour ago',
            msgs: null
        },
        {
            id: 3,
            name: 'Zubair Majid',
            text: 'This is some short text of the recent message that user have send.',
            time: '42 min ago',
            msgs: '5'
        },
        {
            id: 4,
            name: 'Rehan Ali',
            text: 'This is some short text of the recent message that user have send.',
            time: '2 days ago',
            msgs: '1'
        },
    ]
    return (
        <>
            {loading && <Loader loading={loading} />}
            <Screen style={styles.container}>
                <View style={styles.header}>
                    <AppText style={styles.headerText}>Messages</AppText>
                    <AntDesign name="search1" size={24} color={colors.gray} />
                </View>
                <View>
                    <FlatList
                        style={styles.messagesList}
                        data={conversations}
                        renderItem={({ item }) => <ListMessage
                            conversation={item}
                            currentUser={user}
                            navigation={navigation}
                        />}
                        keyExtractor={item => item._id}
                    />
                </View>
            </Screen>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 30,
        fontWeight: '700',
        color: colors.darkBlack,
    },
    messagesList: {
        marginTop: 35,
        paddingHorizontal: 8
    }
})