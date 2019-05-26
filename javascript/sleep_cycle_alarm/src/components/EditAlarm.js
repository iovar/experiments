import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import ModalConfirm from './reusable/ModalConfirm';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { appBgColor, enabledColor } from '../Colors';
import AlarmProperties from './AlarmProperties';
import {
  changeDefaults,
  toggleDeleteOneModal,
  deleteAlarms,
  addAlarm
} from '../actions';
import Button from './reusable/Button';

class EditAlarm extends Component {
  deleteAlarm() {
    const { current, deleteAlarms, toggleDeleteOneModal } = this.props;

    deleteAlarms({ [current]: true });
    toggleDeleteOneModal();
    Actions.AlarmList();
  }

  addAlarm() {
    this.props.addAlarm({ ...this.props.lastSettings, enabled: false });
    Actions.AlarmList();
  }

  componentWillMount() {
    Actions.refresh({ onRight: () => this.addAlarm() });
  }

  renderConfirmModal() {
    return this.props.deleteOpen ? (
      <ModalConfirm
       actionOk={() => this.deleteAlarm()}
       actionCancel={() => this.props.toggleDeleteOneModal()}>
        <Text>
          Are you sure you want to delete this alarm?
        </Text>
      </ModalConfirm>
    ) : null;
  }

  render() {
    const { fireDate, sound, snooze } = this.props.lastSettings;

    return (
      <ScrollView style={styles.containerStyle}>
        <AlarmProperties
          onChange={(newSettings) => this.props.changeDefaults(newSettings)}
          fireDate={fireDate} sound={sound} snooze={snooze} />
        <Button style={styles.deleteButtonStyle}
                title="Delete Alarm"
                color={enabledColor}
                onPress={() => this.props.toggleDeleteOneModal()}
        />
        {this.renderConfirmModal()}
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
  deleteButtonStyle: {
    marginTop: 80
  }
};

const mapStateToProps = ({ current, lastSettings, modals }) => {
  const deleteOpen = modals.deleteOneConfirm;

  return {
    current,
    lastSettings,
    deleteOpen
  }
};

export default connect(mapStateToProps, {
  changeDefaults,
  toggleDeleteOneModal,
  deleteAlarms,
  addAlarm
})(EditAlarm);
