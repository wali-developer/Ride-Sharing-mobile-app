import { ScrollView, StyleSheet, View } from 'react-native'
import Screen from '../components/Screen'
import React, { useEffect, useState } from 'react'
import Card from '../components/availableRides/Card'
import apiClient from '../api/client'
import authStorage from '../auth/storage';
import Loader from '../components/Loader'
import AppText from '../components/AppText'
import colors from '../config/colors'

export default function HistoryScreen({ navigation }) {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // authStorage?.removeToken();
        const restoreUser = async () => {
            const user = await authStorage.getUser();
            if (user) {
                setLoading(true)
                apiClient.get(`/requestride/requests/${user?._id}`).then(res => {
                    setLoading(false)
                    setRides(res?.data);
                    console.log(res?.data);

                }).catch(err => {
                    setLoading(false)
                    console.log(err)
                })
            }
        };
        restoreUser();
    }, [])
    return (
        <>
            {loading && <Loader loading={loading} />}
            <Screen style={styles.container}>
                <ScrollView style={styles.container}>
                    {
                        rides?.map((ride, index) => (
                            <Card ride={ride} key={index} userRides={true} navigation={navigation} />
                        ))
                    }
                    {rides.length == 0 && (
                        <AppText style={styles.text}>You have no previous rides</AppText>
                    )}

                </ScrollView>
            </Screen>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    }
})