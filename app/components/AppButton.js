import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary", style, text }) {
    return (
        <TouchableOpacity
            style={[styles.button, style, { backgroundColor: colors[color] }]}
        >
            <Text style={[styles.text, { color: text }]} onPress={onPress}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        width: "100%",
        // padding: 15,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },
    text: {
        fontFamily: "Roboto",
        color: colors.white,
        fontSize: 15,
        fontWeight: "500",
    },
});

export default AppButton;
