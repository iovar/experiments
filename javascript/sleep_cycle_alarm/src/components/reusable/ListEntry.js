import React from 'react';
import { View } from 'react-native';
import { itemBgColor, borderColor } from '../../Colors';

const ListEntry = ({ children }) => (
  <View style={styles.viewStyle}>
    {children}
  </View>
);

const styles = {
  viewStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    height: 80,
    borderColor,
    borderBottomWidth: 1,
    backgroundColor: itemBgColor
  }
};

export default ListEntry;
