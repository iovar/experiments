import moment from 'moment';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { textColor } from '../Colors';

class AlarmInfoText extends Component {
  formatTime() {
    const { fireDate, enabled, adjustedDate } = this.props;
    const time = moment(enabled ? adjustedDate : fireDate)
      .local().format('HH:mm');

    return `${time}`;
  }

  render() {
    const { sound, enabled } = this.props;
    const timeTextStyles = [styles.timeTextStyle];

    if (enabled) {
      timeTextStyles.push({ opacity: 1.0 });
    }

    return (
      <View style={styles.containerStyle}>
        <Text style={timeTextStyles}>{this.formatTime()}</Text>
        <Text style={styles.soundTextStyle}>{sound}</Text>
      </View>
    );
  }
}

const styles = {
  timeTextStyle: {
    fontSize: 48,
    fontWeight: '200',
    color: textColor,
    opacity: 0.85,
    height: 52
  },
  soundTextStyle: {
    fontSize: 12,
    fontWeight: '200',
    color: textColor,
  },
  containerStyle: {
    flexDirection: 'column',
  }
};

export default AlarmInfoText;
