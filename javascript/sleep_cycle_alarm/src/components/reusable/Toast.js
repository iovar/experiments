import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { textColor, appBgColor, borderColor, enabledColor } from '../../Colors';

const DEFAULT_WIDTH = 240;
const DEFAULT_HEIGHT = 160;
const DEFAULT_TIMEOUT = 3000;

class Toast extends Component {
  static defaultProps = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    timeout: DEFAULT_TIMEOUT
  };

  componentDidMount() {
    const { actionTimeout, timeout } = this.props;

    setTimeout(() => actionTimeout(), timeout);
  }

  render() {
    const { width, height, children } = this.props;

    const adjustPositionStyle = {
      width,
      height,
      marginLeft: -width / 2,
      marginTop: -height / 2
    };

    return (
      <Modal transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => this.props.actionTimeout()}>
          <View style={[styles.containerStyle, adjustPositionStyle]}>
            <Text style={styles.textStyle}>
              {children}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = {
  containerStyle: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: appBgColor,
    top: height / 2,
    left: width / 2,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
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
};

export default Toast;
