import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { remindStyles } from './remind.style';

export const ModalRemind = ({ visible, onClose }) => {
  return (
      <Modal
          visible={visible}
          animationType="slide"
          onRequestClose={onClose}
      >

        <View  style={remindStyles.modal}>
          <Text style={remindStyles.modal.text}>Verification code was send to registered E-mail</Text>
          <TouchableOpacity style={remindStyles.submitButton} onPress={onClose}>
            <Text style={remindStyles.modal.text}>OK</Text>
          </TouchableOpacity>
        </View>

      </Modal>
  );
};