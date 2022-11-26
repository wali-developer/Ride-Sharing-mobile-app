import { StyleSheet, Image, View, TouchableOpacity, Button, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import defaultStyle from '../config/style';
import TextPicker from '../components/forms/TextPicker';
import DatePicker from '../components/forms/DatePicker';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
// import TextInput from '../components/forms/TextInput'
import Picker from '../components/forms/Picker';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Loader from '../components/Loader';
import searchApi from '../api/searchRides';
import apiClient from '../api/client';

export default function HomeScreen({ navigation }) {
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [date, setDate] = useState(new Date(1598051730000));
    const [passengers, setPassengers] = useState(0);
    const [loading, setLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const [openDestination, setOpenDestination] = useState(false);
    const [selecteddestination, setSelecteddestination] = useState({});

    const citiesOptions = [
        {
            id: 1,
            label: 'Peshawar',
            value: 'Peshawar'
        },
        {
            id: 2,
            label: 'Islamabad',
            value: 'Islamabad'
        },
        {
            id: 3,
            label: 'Abbottabad',
            value: 'Abbottabad'
        },
        {
            id: 4,
            label: 'Battagram',
            value: 'Battagram'
        },
        {
            id: 5,
            label: 'Lahore',
            value: 'Lahore'
        },
    ]

    const searchRides = async (navigation) => {
        setLoading(true)
        const payload = {
            goingFrom: selectedItem?.value,
            goingTo: selecteddestination?.value,
            date: date,
            passengerNeeded: passengers
        }
        console.log("Payload: ", payload)
        try {
            // const response = await searchApi?.searchRides(payload?.goingFrom, payload?.goingTo);
            const { data } = await apiClient.get("/publishride", payload);
            if (Array.isArray(data)) {

                const filterResults = data?.filter((ride, index) => {
                    return ride.goingfrom === payload?.goingFrom && ride.goingto === payload?.goingTo
                });
                navigation.navigate('AvailableRides', { data: filterResults, userFromData: payload })
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    // console.log(date.toLocaleDateString());

    return (
        <>
            {loading && <Loader loading={loading} />}
            <Screen style={styles.container}>
                <View style={styles.header}>
                    <View style={{ width: 45, height: 45, borderRadius: 100, overflow: "hidden", backgroundColor: "red" }}>
                        <Image
                            style={styles?.avatar}
                            source={require("../assets/avatar.png")}
                            resizeMode="contain" />
                    </View>

                    <View style={styles.notificationWrapper}>
                        <Image
                            style={styles?.notification}
                            source={require("../assets/notification.png")}
                        />
                        <View style={styles.notificationDot}></View>
                    </View>
                </View>
                <View style={styles.headingWrapper}>
                    <AppText style={defaultStyle.text}>Hi Usman</AppText>
                    <AppText style={styles.headingText}>Good Morning!</AppText>
                </View>
                <AppText style={styles.searchHeading}>Search for a Ride</AppText>
                <View style={styles.formWrapper}>
                    <AppText>From City</AppText>
                    <Pressable onPress={() => setOpenModal(true)}>
                        <View style={styles.inputWrapper}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="location-outline" size={23} color={colors.gray} />
                                <TextInput
                                    placeholder={selectedItem ? selectedItem?.label : 'Select city'}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    disableFullScreenUI
                                    style={{ marginLeft: 10 }}
                                />
                            </View>
                            <Entypo name="chevron-thin-right" size={12} color={colors.gray} />
                        </View>
                    </Pressable>
                    <AppText>To City</AppText>
                    <Pressable style={styles.inputWrapper} onPress={() => setOpenDestination(true)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="location-outline" size={23} color={colors.gray} />
                            <TextInput
                                placeholder={selecteddestination ? selecteddestination?.label : 'Select city'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                disableFullScreenUI
                                style={{ marginLeft: 10 }}
                            />
                        </View>
                        <Entypo name="chevron-thin-right" size={12} color={colors.gray} />
                    </Pressable>
                    <View style={styles.inputsRow}>
                        <View style={{ width: '47%' }}>
                            <DatePicker date={date} setDate={setDate} />
                        </View>
                        <View style={{ width: '47%' }}>
                            <AppText>Passengers</AppText>
                            <TextInput
                                placeholder='Passengers'
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="phone-pad"
                                disableFullScreenUI
                                secureTextEntry={true}
                                backgroundColor={colors.lightBg}
                                style={styles.inputWrapper}
                                onChangeText={(value) => setPassengers(value)}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <AppButton
                            title="Search"
                            style={styles.signin}
                            text={colors.white}
                            onPress={() => searchRides(navigation)}
                        />
                    </View>
                </View>
                <Picker
                    setModalVisible={setOpenModal}
                    modalVisible={openModal}
                    citiesOptions={citiesOptions}
                    setSelectedItem={setSelectedItem}
                />
                <Picker
                    setModalVisible={setOpenDestination}
                    modalVisible={openDestination}
                    citiesOptions={citiesOptions}
                    setSelectedItem={setSelecteddestination}
                />
            </Screen>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 9,
        paddingTop: 20,
        backgroundColor: colors.white
    },
    avatar: {
        width: 45,
        height: 45,
        // borderRadius: 22.5,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    notificationWrapper: {
        width: 45,
        height: 45,
        borderColor: '#0000001A',
        borderWidth: 2,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover'
    },
    notification: {
        width: 22,
        height: 24
    },
    notificationDot: {
        backgroundColor: '#FBB03B',
        borderRadius: 6,
        position: 'absolute',
        top: 5,
        right: 5,
        width: 12,
        height: 12,
    },
    headingWrapper: {
        marginVertical: 25
    },
    headingText: {
        color: defaultStyle.colors.darkBlack,
        fontSize: 18,
        fontWeight: '500',
        marginTop: 3
    },
    searchHeading: {
        fontSize: 18,
        color: defaultStyle.colors.primary,
        fontWeight: '500',
        marginTop: 5
    },
    formWrapper: {
        marginTop: 10
    },
    inputsRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputWrapper: {
        width: '100%',
        height: 50,
        backgroundColor: colors.lightBg,
        borderRadius: 8,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 17
        ,
    },
    buttonWrapper: {
        width: '100%',
        marginTop: 0,
    },
    signin: {
        width: '100%'
    },
})