import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { textColor, enabledColor, disabledColor } from '../../Colors';

const ToggleButton = ({ enabled, selected, onPress, style }) => {
  return enabled ? (
    <TouchableWithoutFeedback
      onPress={() => onPress()}>
      <View style={[styles.selectButtonStyles, style]}>
          <View style={[
            styles.commonStyles,
            selected ? styles.selectedStyles : styles.deselectedStyles
          ]} />
      </View>
    </TouchableWithoutFeedback>
  ) : null;
}

const styles = {
  selectButtonStyles: {
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  commonStyles: {
    width: 25,
    height: 25,
    borderRadius: 100,
    borderColor: textColor,
    borderWidth: 1
  },
  selectedStyles: {
    backgroundColor: enabledColor
  },
  deselectedStyles: {
    backgroundColor: disabledColor
  }
};
export default ToggleButton;
