import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  addAlarm,
  deleteAlarms,
  toggleDeleteModal,
  dismissToast
} from '../actions';
import ModalConfirm from './reusable/ModalConfirm';
import Toast from './reusable/Toast';
import AlarmEntry from './AlarmEntry';
import { appBgColor, textColor } from '../Colors';

class AlarmList extends Component {
  renderAlarms() {
    return this.props.alarms.map(({id}) => (
      <AlarmEntry key={id} id={id} />
    ));
  }

  deleteItems() {
    const { deleteAlarms, selected, toggleDeleteModal } = this.props;

    deleteAlarms(selected);
    toggleDeleteModal();
  }

  closeModal() {
    this.props.toggleDeleteModal();
  }

  renderConfirmModal() {
    const num = _.size(this.props.selected);
    const msg = num === 1 ? 'this alarm'
      : `these ${num} alarms`;

    return this.props.deleteOpen ? (
      <ModalConfirm
       actionOk={() => this.deleteItems()}
       actionCancel={() => this.closeModal()}>
        <Text>
          Are you sure you want to delete {msg}?
        </Text>
      </ModalConfirm>
    ) : null;
  }

  renderToast() {
    return this.props.showToast ? (
      <Toast actionTimeout={() => this.props.dismissToast()}>
        <Text>{this.props.toastMessage}</Text>
      </Toast>
    ) : null;
  }

  renderEmptyText() {
    const { viewStyle, textStyle } = styles;

    return this.props.alarms.length
      ? null
      : (
        <View style={viewStyle}>
          <Text style={textStyle}>
            Welcome To 24 Cycle Alarm!
          </Text>
          <Text style={textStyle}>
            Press the 'Add' button to create a new alarm.
          </Text>
        </View>
      );
  }

  renderScrollView() {
    const { scrollViewStyle } = styles;

    return this.props.alarms.length
      ? (
        <ScrollView style={scrollViewStyle}>
          {this.renderAlarms()}
        </ScrollView>
      ) : null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderScrollView()}
        {this.renderEmptyText()}
        {this.renderConfirmModal()}
        {this.renderToast()}
      </View>
    );
  }
}

const styles = {
  scrollViewStyle: {
    backgroundColor: appBgColor
  },
  viewStyle: {
    padding: 20,
    backgroundColor: appBgColor,
    flex: 1
  },
  textStyle: {
    color: textColor,
    fontSize: 14
  }
};

const mapStateToProps = ({ alarms, selected, modals }) => {
  const alarmsArray = _.values(alarms);
  const deleteOpen = modals.deleteConfirm;
  const { showToast, toastMessage } = modals;

  return {
    alarms: alarmsArray,
    selected,
    deleteOpen,
    showToast,
    toastMessage
  };
};

export default connect(mapStateToProps, {
  addAlarm,
  deleteAlarms,
  toggleDeleteModal,
  dismissToast
})(AlarmList);
