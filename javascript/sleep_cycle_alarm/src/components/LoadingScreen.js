import React from 'react';
import { View, Text } from 'react-native';
import { appBgColor, textColor } from '../Colors';


const LoadingScreen = () => (
  <View style={styles.containerStyle}>
    <Text style={styles.textStyle}>Please wait...</Text>
  </View>
);

const styles = {
  containerStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: appBgColor
  },
  textStyle: {
    color: textColor,
    fontSize: 14
  }
};

export default LoadingScreen;
