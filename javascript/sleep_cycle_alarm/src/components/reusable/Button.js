import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { borderColor, textColor } from '../../Colors';

const Button = ({title, onPress, color = textColor, style = {} } = {}) => (
  <TouchableOpacity
    style={[style, styles.buttonStyle]}
    onPress={() => onPress()}>
    <Text style={[styles.textStyle, { color }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = {
  buttonStyle: {
    borderColor: borderColor,
    borderRadius: 2,
    borderWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18
  }
};

export default Button;
