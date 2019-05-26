import _ from 'lodash';
import React, { Component } from 'react';
import { PushNotificationIOS, AppState } from  'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  toggleEditMode,
  toggleDeleteModal,
  startAlarmChecks
} from './actions';
import AlarmList from './components/AlarmList';
import AddAlarm from './components/AddAlarm';
import EditAlarm from './components/EditAlarm';
import ErrorScreen from './components/ErrorScreen';
import LoadingScreen from './components/LoadingScreen';
import { EDIT_MODE } from './Modes';
import { appBgColor, textColor, borderColor, enabledColor } from './Colors';
import moment from 'moment';

class AlarmRouter extends Component {
  componentWillMount() {
    this.props.startAlarmChecks(5000);

    PushNotificationIOS.requestPermissions()
      .then((result) => {
        if (!result.alert || !result.sound) {
          throw new Error('Insufficient permissions');
        }

        this._cleanupNotifications();

        AppState.addEventListener('change', (nextState) => {
          if (nextState === 'active') {
            this._cleanupNotifications();
          }
        });

        Actions.AlarmList({ type: 'reset' });
      })
      .catch((err) => Actions.Error({ type: 'reset' }));
  }

  _cleanupNotifications() {
    const now = moment().valueOf();

    PushNotificationIOS.getScheduledLocalNotifications((notifications) => {
      _.forEach(notifications, ({ userInfo: { id }, fireDate }) => {
        if (moment(fireDate).valueOf() < now) {
          PushNotificationIOS.cancelLocalNotifications({ id });
        }
      });
    });

    PushNotificationIOS.removeAllDeliveredNotifications();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.editMode !== this.props.editMode) {
      setTimeout(() => {
        this.forceUpdate();
      }, 400);

      return false;
    }

    return true;
  }

  deleteSelected() {
    if (this.props.canDelete) {
      this.props.toggleDeleteModal();
    }
  }

  rightButtonAction() {
    if (this.props.editMode) {
      return this.deleteSelected();
    }

    Actions.AddAlarm();
  }

  getRightButtonTitle() {
    const text = this.props.editMode ? 'Delete' : 'Add';
    return text;
  }

  getRightButtonStyle() {
    const buttonStyles = [styles.buttonTextStyle];

    if (this.props.editMode) {
      buttonStyles.push({ color: enabledColor });
    }

    if (this.props.editMode && !this.props.canDelete) {
      buttonStyles.push({ opacity: 0.7});
    }

    return buttonStyles;
  }

  render() {
    const { toggleEditMode } = this.props;

    return (
      <Router>
        <Scene key={"root"}
          navigationBarStyle={styles.navigationBarStyle}
          titleStyle={styles.titleStyle}>

          <Scene
            key="Loading"
            component={LoadingScreen}
            title="Loading"
          />

          <Scene
            key="Error"
            component={ErrorScreen}
            title="Error"
          />

          <Scene
            key="AlarmList"
            component={AlarmList}
            title="Alarms"
            leftTitle="Edit"
            onLeft={() => toggleEditMode()}
            leftButtonStyle={styles.buttonStyle}
            leftButtonTextStyle={styles.buttonTextStyle}
            rightTitle={() => this.getRightButtonTitle()}
            onRight={() => this.rightButtonAction()}
            rightButtonStyle={styles.buttonStyle}
            rightButtonTextStyle={() => this.getRightButtonStyle()}
          />

          <Scene
            key="EditAlarm"
            component={EditAlarm}
            title="Edit Alarm"
            leftTitle="Cancel"
            leftButtonStyle={styles.buttonStyle}
            leftButtonTextStyle={styles.buttonTextStyle}
            onRight={() => {
              // replace on component mount
              return null;
            }}
            rightTitle="Done"
            rightButtonStyle={styles.buttonStyle}
            rightButtonTextStyle={styles.buttonTextStyle}
          />

          <Scene
            key="AddAlarm"
            component={AddAlarm}
            title="Add Alarm"
            leftTitle="Cancel"
            leftButtonStyle={styles.buttonStyle}
            leftButtonTextStyle={styles.buttonTextStyle}
          />

      </Scene>
    </Router>
    );
  }
}

const styles = {
  navigationBarStyle: {
    backgroundColor: appBgColor,
    borderColor: borderColor,
    borderBottomWidth: 1
  },
  titleStyle: {
    color: textColor
  },
  buttonTextStyle: {
    color: textColor,
  },
  buttonStyle: {
    borderColor: borderColor,
    borderWidth: 1,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: -6,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 4
  }
};

const mapStateToProps = ({ mode, selected }) => {
  const editMode = (mode === EDIT_MODE);
  const canDelete = editMode && !_.isEmpty(selected);

  return {
    editMode,
    canDelete
  };
};

export default connect(mapStateToProps, {
  toggleEditMode,
  toggleDeleteModal,
  startAlarmChecks
})(AlarmRouter);
