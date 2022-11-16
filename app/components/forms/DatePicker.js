import { useState } from "react";
import { Button, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from "../../config/colors";
import AppText from "../AppText";
import defaultStyle from "../../config/style";

const DatePicker = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    const d = date.toLocaleDateString();
    console.log(d)

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(true);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <View>
            {/* <Button onPress={showDatepicker} title="Select" style={styles.dataPicker} />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )} */}

            <AppText style={defaultStyle.text}>Date</AppText>
            <TouchableOpacity onPress={showDatepicker}>
                <View style={styles.dataPicker}>
                    <View style={styles.colWrapper}>
                        <Image source={require('../../assets/calendar.png')} style={styles.calendarIcon} />
                        <AppText style={defaultStyle.text}>{date ? date.toLocaleDateString() : 'Select'}</AppText>
                    </View>
                    <Image source={require('../../assets/right-arrow.png')} style={styles.rightArrow} />
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    dataPicker: {
        width: '100%',
        height: 50,
        backgroundColor: colors.lightBg,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        borderRadius: 8

    },
    colWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarIcon: {
        width: 18,
        height: 18,
        marginRight: 14
    },
    rightArrow: {
        width: 7,
        height: 9,
    }
});

export default DatePicker