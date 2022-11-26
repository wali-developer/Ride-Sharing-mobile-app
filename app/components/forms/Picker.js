import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList, TouchableOpacity, Image } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const App = ({ setModalVisible, modalVisible, citiesOptions, setSelectedItem }) => {
    // const [modalVisible, setModalVisible] = useState(false);
    // const [selectedItem, setSelectedItem] = useState({});

    const renderItem = (item) => (
        <TouchableOpacity style={styles.item} onPress={() => {
            setSelectedItem(item)
            setModalVisible(false)
        }}>
            <AppText style={styles.title}>{item?.label}</AppText>
        </TouchableOpacity>
    );
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <FlatList
                            data={citiesOptions}
                            renderItem={({ item }) => renderItem(item)}
                            keyExtractor={item => item.id}
                            style={{ width: '100%' }}
                        />
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <MaterialCommunityIcons
                                name="close"
                                size={20}
                            />
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        paddingVertical: 40,
        paddingTop: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        position: "absolute",
        top: 15,
        right: 18
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    item: {
        backgroundColor: colors.lightBg,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginVertical: 5,
        width: '100%',
        borderRadius: 10
        // marginHorizontal: 16,
    },
    // title: {
    //     fontSize: 32,
    // },
});

export default App;