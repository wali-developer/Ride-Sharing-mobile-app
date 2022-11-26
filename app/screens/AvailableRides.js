import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import Card from '../components/availableRides/Card'
import colors from '../config/colors'

export default function AvailableRides({ route }) {
    const { data, userFromData } = route?.params;
    console.log("Fitler data", data)
    return (
        <ScrollView style={styles.container}>
            {data?.map((ride, index) => (
                <Card ride={ride} userFromData={userFromData} key={index} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
})