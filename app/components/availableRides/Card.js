import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import colors from '../../config/colors'
import AppText from '../AppText';
import { AntDesign } from '@expo/vector-icons';
import AppButton from '../AppButton';
import bookingApi from '../../api/rideBooking';
import authStorage from '../../auth/storage'
import apiClient from '../../api/client';
import Loader from '../../components/Loader';

export default function Card({ ride, userFromData, userRides, navigation }) {
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        restoreUser();
    }, [])

    const restoreUser = async () => {
        const userId = await authStorage.getUser();
        if (userId) {
            apiClient.get(`user/${userId?._id}`).then(res => {
                setUser(res?.data)
            }).catch(err => console.log(err));
        }
    };

    const bookRide = async (selectedRide) => {
        // alert('Ride booking..')
        setLoading(true)

        const payload = {
            goingfrom: selectedRide?.goingfrom,
            goingto: selectedRide?.goingto,
            passenger: userFromData?.passengerNeeded,
            date: selectedRide?.date,
            rideStatus: selectedRide?.status,
            requestStatus: "Pending",
            bookingRider: {
                id: user?._id,
                fullName: user?.fullName,
                email: user?.email,
                userType: user?.email
            },
            publisherUser: selectedRide?.publisherUser,
            rideId: selectedRide?._id,
        }

        try {
            const { data } = await apiClient.post("/requestride", payload);
            if (data) {
                alert(data)
                addBookerToConversation(user?._id, selectedRide?.publisherUser?._id)
                navigation.navigate('Chat');
            }
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    // Create conversation of ride booker with publisher
    const addBookerToConversation = async (senderId, receiverId) => {
        setLoading(true)
        try {
            const { data } = await apiClient.post("conversations", {
                senderId: senderId,
                receiverId: receiverId,
            });
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };

    const checkRideExpiry = (date) => {
        const today = new Date();
        return today < date;
    }
    const date = checkRideExpiry(ride?.date);
    const statusColor = date == false ? "green" : colors.primary
    return (
        <>
            {loading && <Loader loading={loading} />}
            <View style={styles.CardWrapper}>
                <View style={styles.cardHeader}>
                    <View style={styles.textRow}>
                        <FontAwesome5
                            name='dot-circle'
                            color={colors.white}
                            size={13}
                            style={{ marginRight: 15 }}
                        />
                        <AppText style={styles.rowText}>{ride?.goingfrom}</AppText>
                    </View>
                    <View style={styles.textRow}>
                        <SimpleLineIcons
                            name='location-pin'
                            color={colors.white}
                            size={15}
                            style={{ marginRight: 15 }}
                        />
                        <AppText style={styles.rowText}>{ride?.goingto}</AppText>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.internalRow}>

                        <View style={styles.userRow}>
                            <View style={styles.userWrapper}>
                                <AntDesign name="user" size={22} color={colors.gray} />
                            </View>
                            <AppText style={{ fontWeight: '500' }}>{ride?.publisherUser?.fullName}</AppText>
                        </View>
                        <View style={{ width: "35%" }}>
                            <AppText style={styles.smallTExt}>Total Destination</AppText>
                            <AppText style={{ fontWeight: '500' }}>34km</AppText>
                        </View>
                    </View>
                    <View style={[styles.internalRow, { marginTop: 15 }]}>
                        <View>
                            <AppText style={styles.smallTExt}>Estimated time</AppText>
                            <AppText style={{ fontWeight: '500' }}>1hr 10min</AppText>
                        </View>
                        <View style={{ width: "35%" }}>
                            <AppText style={styles.smallTExt}>Ride Estimate</AppText>
                            <AppText style={styles.price}>Pkr. {ride?.price}</AppText>
                        </View>
                    </View>
                    {userRides == true ? (
                        <AppButton
                            title={date == false ? "Completed" : "Active"}
                            style={[styles.book, { borderColor: statusColor }]}
                            color={statusColor}
                            text={statusColor}
                        />

                    ) : (
                        <AppButton
                            title="Book Ride"
                            style={styles.book}
                            color={colors.lightBg}
                            text={colors.primary}
                            onPress={() => bookRide(ride)}
                        />
                    )}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    CardWrapper: {
        borderRadius: 15,
        backgroundColor: colors.white,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        overflow: 'hidden',
        marginBottom: 20,
    },
    cardHeader: {
        backgroundColor: colors.yellow,
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    textRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    },
    rowText: {
        fontSize: 14,
        color: colors.white
    },
    body: {
        paddingVertical: 15,
        paddingHorizontal: 25
    },
    smallTExt: {
        fontSize: 11,
        color: '#B0B0B1',
        marginBottom: 2
    },
    internalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userWrapper: {
        width: 35,
        height: 35,
        borderRadius: 35,
        backgroundColor: colors.lightBg,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gray
    },
    price: {
        fontWeight: '700',
        color: colors.darkBlack,
        fontSize: 16
    },
    book: {
        marginTop: 20,
        height: 42,
        borderWidth: 1,
        borderColor: colors.primary,
    },
})