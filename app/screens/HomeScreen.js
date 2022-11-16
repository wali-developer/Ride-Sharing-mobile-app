import { StyleSheet, Image, View, TouchableOpacity, Button, TextInput, TouchableWithoutFeedback } from 'react-native';
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

export default function HomeScreen() {
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const citiesOptions = [
        {
            label: 'Peshawar',
            value: 'peshawar'
        },
        {
            label: 'Islamabad',
            value: 'islamabad'
        },
        {
            label: 'Abbottabad',
            value: 'abbottabad'
        },
        {
            label: 'Battagram',
            value: 'battagram'
        },
        {
            label: 'Lahore',
            value: 'lahore'
        },
    ]

    return (
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
                {/* <TextPicker value={fromCity} setValue={setFromCity} options={citiesOptions} label="From city" /> */}
                <AppText>From City</AppText>
                <TouchableOpacity style={styles.inputWrapper}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="location-outline" size={23} color={colors.gray} />
                        <TextInput
                            placeholder='Select city'
                            autoCapitalize="none"
                            autoCorrect={false}
                            disableFullScreenUI
                            style={{ marginLeft: 10 }}
                        />
                    </View>
                    <Entypo name="chevron-thin-right" size={12} color={colors.gray} />
                </TouchableOpacity>
                <AppText>To City</AppText>
                <TouchableOpacity style={styles.inputWrapper}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="location-outline" size={23} color={colors.gray} />
                        <TextInput
                            placeholder='Select city'
                            autoCapitalize="none"
                            autoCorrect={false}
                            disableFullScreenUI
                            style={{ marginLeft: 10 }}
                        />
                    </View>
                    <Entypo name="chevron-thin-right" size={12} color={colors.gray} />
                </TouchableOpacity>
                <View style={styles.inputsRow}>
                    <View style={{ width: '47%' }}>
                        <DatePicker />
                    </View>
                    <View style={{ width: '47%' }}>
                        <AppText>Passengers</AppText>
                        <TextInput
                            placeholder='Password'
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="phone-pad"
                            disableFullScreenUI
                            secureTextEntry={true}
                            backgroundColor={colors.lightBg}
                            style={styles.inputWrapper}
                        />
                    </View>
                </View>
                {/* <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <Button title="Open modal"></Button>
                </TouchableOpacity> */}
                <View style={styles.buttonWrapper}>
                    <AppButton
                        title="Search"
                        style={styles.signin}
                        text={colors.white}
                    />
                </View>
            </View>
            {/* <Picker
                setOpenModal={setOpenModal}
                visibility={openModal}
            /> */}
        </Screen>
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