import { StyleSheet, View, TextInput, Image } from "react-native";
import React from "react";
import colors from "../../config/colors";
import defaultStyle from "../../config/style";

export default function AppTextinput({ icon, backgroundColor = colors.lightBg, ...rest }) {
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <TextInput
                style={styles.input}
                placeholderTextColor={defaultStyle.colors.medium}
                {...rest}
            />
            {icon && (
                <Image
                    style={styles.inputIcon}
                    source={icon}
                    resizeMode="contain"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        width: '100%',
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 8,
        shadowColor: '#1010101A',
        shadowOffset: 0.2,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderWidth: 2,
        borderColor: '#1010101A'
    },
    input: {
        backgroundColor: 'transparent',
        color: defaultStyle.text,
        flex: 1,
        height: '100%'
    },
    inputIcon: {
        width: 18,
        height: 15,
    },
});
