import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { appBgColor } from '../Colors';
import AlarmProperties from './AlarmProperties';
import Button from './reusable/Button';
import { changeDefaults, addAlarm } from '../actions';
import uuid from 'uuid/v1';

class AddAlarm extends Component {
  addAlarm() {
    this.props.addAlarm({
      ...this.props.lastSettings,
      id: uuid(),
      enabled: false
    });
    Actions.AlarmList();
  }

  render() {
    const { fireDate, sound, snooze } = this.props.lastSettings;

    return (
      <ScrollView style={styles.containerStyle}>
        <AlarmProperties
          onChange={(newSettings) => this.props.changeDefaults(newSettings)}
          fireDate={fireDate} sound={sound} snooze={snooze} />
        <Button style={styles.buttonStyle}
                title="Add Alarm"
                onPress={() => this.addAlarm()}
        />
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: appBgColor,
    paddingTop: 16,
    paddingBottom: 40,
    paddingLeft: 8,
    paddingRight: 8
  },
  buttonStyle: {
    marginTop: 40
  }
};

const mapStateToProps = ({ lastSettings }) => ({ lastSettings: {...lastSettings} });

export default connect(mapStateToProps, { changeDefaults, addAlarm })(AddAlarm);
