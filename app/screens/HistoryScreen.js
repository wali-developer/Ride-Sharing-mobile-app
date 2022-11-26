import { ScrollView, StyleSheet } from 'react-native'
import Screen from '../components/Screen'
import React, { useEffect, useState } from 'react'
import Card from '../components/availableRides/Card'
import apiClient from '../api/client'
import authStorage from '../auth/storage';
import Loader from '../components/Loader'

export default function HistoryScreen() {
    const [rides, setRides] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // authStorage?.removeToken();
        const restoreUser = async () => {
            const user = await authStorage.getUser();
            if (user) {
                setLoading(true)
                apiClient.get(`/requestride/${user?._id}`).then(res => {
                    console.log("My rides: ", res?.data)
                    setLoading(false)
                    setRides(res?.data);
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
                    {rides?.map((ride, index) => (
                        <Card ride={ride} key={index} userRides={true} />
                    ))}
                </ScrollView>
            </Screen>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5
    }
})