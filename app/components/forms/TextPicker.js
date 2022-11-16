import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import defaultStyle from '../../config/style';

const TextPicker = ({ value, setValue, options, label }) => {
    return (
        <>
            <AppText style={defaultStyle.text}>{label}</AppText>
            <Picker
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) =>
                    setValue(itemValue)
                }
                style={styles.textPicker}
                dropdownIconColor={colors.gray}
                placeholder="Select"
            >
                {options?.map((item, index) => (
                    <Picker.Item label={item?.label} value={item?.value} />
                ))}
            </Picker>
        </>
    );
}

const styles = StyleSheet.create({
    textPicker: {
        flex: 1,
        height: 50,
        backgroundColor: colors.lightBg,
        color: colors.gray,
        borderRadius: 8,
        marginBottom: 15,
        marginTop: 8,
        // backgroundColor: colors.white
    }
});

export default TextPicker;