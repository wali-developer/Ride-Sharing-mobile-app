import { ScrollView, StyleSheet, View, Textinput, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppText from '../../components/AppText'
import colors from '../../config/colors';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import apiClient from '../../api/client';
import storage from '../../auth/storage';
import Loader from '../../components/Loader';

function MessagesScreen({ route }) {
    const { conversation, currentUser } = route?.params;
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMessages();
        // storage.removeToken();
    }, [])
    const getMessages = async () => {
        setLoading(true)
        try {
            const { data } = await apiClient.get(`/messages/${conversation?._id}`);
            if (data) setMessages(data);
            etLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    return (
        <>
            {loading && <Loader loading={loading} />}
            <Screen style={styles.container}>
                <ScrollView style={styles.MessagesWrapper}>
                    <AppText style={styles.dayText}>Today</AppText>
                    {messages?.map((msg, index) => {
                        return (
                            <View key={index}>
                                {msg?.sender !== currentUser?._id ? (
                                    <View style={styles.receiveMessage}>
                                        <View style={styles.message}>
                                            <AppText style={styles.messageText}>Ths is some message text that user has received.</AppText>
                                        </View>
                                        <AppText style={styles.messageTime}>4:30 PM</AppText>
                                    </View>
                                ) : (
                                    <View style={styles.sendMessage}>
                                        <View style={[styles.message, styles.senderMessage]}>
                                            <AppText style={styles.senderText}>Ths is some message text that user has sent.</AppText>
                                        </View>
                                        <AppText style={styles.sendermessageTime}>4:30 PM</AppText>
                                    </View>
                                )}
                            </View>
                        )
                    })}
                </ScrollView>
                <View style={styles.writeMessageWrapper}>
                    <AntDesign name="pluscircle" size={24} color={colors.yellow} />
                    <TextInput
                        placeholder='Message...'
                        autoCapitalize="none"
                        autoCorrect={false}
                        disableFullScreenUI
                        style={styles.messageInput}
                    // onChangeText={(value) => setRegisterPayload({ ...registerPayload, email: value })}
                    />
                    <Feather name="send" size={24} color={colors.gray} />
                </View>
            </Screen>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF0F8'
    },
    MessagesWrapper: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: colors.white,
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        position: 'relative',
    },
    dayText: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 20,
        // position: '',
        // top:
    },
    receiveMessage: {
        width: '86%',
        marginLeft: 'auto',
        marginBottom: 15
    },
    message: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 30,
        borderBottomRightRadius: 0,
        backgroundColor: colors.yellow,
    },
    messageText: {
        fontSize: 14,
        color: 'white'
    },
    messageTime: {
        fontSize: 11,
        fontWeight: '300',
        textAlign: 'right',
    },
    sendMessage: {
        width: '86%',
        marginRight: 'auto',
        marginBottom: 15,
    },
    senderMessage: {
        borderRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 30,
        backgroundColor: '#EDF0F8',
    },
    senderText: {
        fontSize: 14,
        color: colors.gray
    },
    sendermessageTime: {
        fontSize: 11,
        fontWeight: '300',
        textAlign: 'left',
    },
    writeMessageWrapper: {
        // flex: 1,
        width: '100%',
        marginHorizontal: 'auto',
        backgroundColor: colors.white,
        borderRadius: 30,
        paddingVertical: 12,
        paddingRight: 26,
        paddingLeft: 18,
        backgroundColor: '#EEF1F9',
        flexDirection: 'row',
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 0,
    },
    // plusWrapper: {
    //     width: 25,
    //     height: 25,
    //     borderRadius: 25,
    //     backgroundColor: colors.yellow,
    // },
    messageInput: {
        backgroundColor: 'transparent',
        flex: 1,
        paddingHorizontal: 6,
        color: colors.gray,
        marginLeft: 5,
    },
})

export default MessagesScreen;