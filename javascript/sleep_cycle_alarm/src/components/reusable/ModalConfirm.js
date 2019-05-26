import React from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { textColor, appBgColor, borderColor, enabledColor } from '../../Colors';

const ModalConfirm = ({
  children,
  width = styles.containerStyle.width,
  height = styles.containerStyle.height,
  actionCancel,
  actionOk,
  textCancel = 'Cancel',
  textConfirm = 'Delete'
} = {}) => {

  const adjustPositionStyle = {
    width,
    height,
    marginLeft: -width / 2,
    marginTop: -height / 2
  };

  const buttonStyle = {
    justifyContent: 'center',
    width: width / 2 - 1
  };

  return (
    <Modal transparent animationType="fade">
      <View style={[styles.containerStyle, adjustPositionStyle]}>
        <Text style={styles.textStyle}>
          {children}
        </Text>
        <View style={[styles.buttonContainerStyle, { width: width - 2 }]}>
          <TouchableOpacity style={[{
            borderColor,
            borderRightWidth: 1
          }, buttonStyle]} onPress={() => actionCancel()}>
            <Text style={styles.textStyle}>{textCancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle} onPress={() => actionOk()}>
            <Text style={[styles.textStyle, styles.deleteTextStyle]}>{textConfirm}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');

const styles = {
  containerStyle: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: appBgColor,
    top: height / 2,
    left: width / 2,
    width: 240,
    height: 160,
    padding: 8,
    borderColor,
    borderWidth: 1,
    borderRadius: 2,
    shadowOpacity: 1,
    shadowColor: enabledColor,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1
  },
  textStyle: {
    color: textColor,
    fontSize: 18,
    alignSelf: 'center'
  },
  deleteTextStyle: {
    color: enabledColor
  },
  buttonContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 50,
    borderColor,
    borderTopWidth: 1
  }
};

export default ModalConfirm;
