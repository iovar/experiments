import React from 'react';
import { View, Text } from 'react-native';
import { appBgColor, textColor } from '../Colors';


const ErrorScreen = () => (
  <View style={styles.containerStyle}>
    <Text style={styles.textStyle}>24 Cycle Alarm requires permission to send you notifications (the alarms themselves). Please exit the application, go to your phone settings and enable notifications for it, and then re-run it.
    </Text>

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

export default ErrorScreen;
