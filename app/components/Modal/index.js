import React from "react";
import { Modal } from "react-native";

const ModalWrapper = ({ callBack, children, visibility }) => {
    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={visibility}
            onRequestClose={() => callBack()}
        >
            {children}
        </Modal>

    );
};



export default ModalWrapper;