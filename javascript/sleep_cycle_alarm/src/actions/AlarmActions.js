import moment from 'moment';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { PushNotificationIOS } from  'react-native';
import {
  ADD_ALARM,
  EDIT_ALARM,
  TOGGLE_ALARM,
  DELETE_ALARMS,
  CHECK_ALARMS
} from './types';
import { showToast } from './ModalActions';
import  SOUNDS from '../Sounds';

const DAY_MSECONDS = 86400000;

export const addAlarm = (alarm) => {
  _removeNotification(alarm);

  // remove notification if it exists
  return {
    type: ADD_ALARM,
    payload: alarm
  };
};

export const editAlarm = (alarm) => {
  Actions.EditAlarm();

  return {
    type: EDIT_ALARM,
    payload: alarm
  };
};

export const toggleAlarm = (alarm) => {
  return (dispatch) => {
    const { adjustedDate, message } = _getAdjustedDate(alarm);
    const newAlarm = {
      ...alarm,
      enabled: !alarm.enabled,
      adjustedDate
    };

    dispatch({
      type: TOGGLE_ALARM,
      payload: newAlarm
    });

    if (newAlarm.enabled) {
      _addNotification(newAlarm);
    } else {
      _removeNotification(newAlarm);
    }

    if (message) {
      dispatch(showToast(message));
    }
  }
};

export const deleteAlarms = (alarms) => {
  _.forEach(_.keys(alarms), (id) => _removeNotification({ id }));

  return {
    type: DELETE_ALARMS,
    payload: alarms
  };
}

export const checkAlarms = () => {
  return {
    type: CHECK_ALARMS
  }
}

export const startAlarmChecks = (interval) => {
  return (dispatch) => {
    setInterval(() => dispatch(checkAlarms()), interval);

    // dispatch the first one immediately
    dispatch(checkAlarms());
  };
}

function _getAdjustedDate({
  fireDate,
  maxCycles= 8,
  sleepOffset = 900000,
  cycleLength = 5400000,
  enabled
} = {}) {

  if (enabled) {
    return {};
  }

  const now = moment().valueOf();
  const targetOffset = fireDate - moment(fireDate).startOf('day').valueOf();
  const availableTime = _getAvailableTime(now, cycleLength, sleepOffset, targetOffset);

  const cycles = availableTime / cycleLength | 0;
  const adjustedDate = (cycles > maxCycles)
    ? now + 6 * cycleLength + sleepOffset
    : now + cycles * cycleLength + sleepOffset;
  const message = (cycles > maxCycles)
    ? 'Next available time is too far in the future (max: 12h). Setting for 9 hours of sleep instead.'
    : `Now go to sleep. Your wake up time is: ${moment(adjustedDate).local().calendar()}`;

  return {
    message,
    adjustedDate
  };
}

function _getAvailableTime(now, cycleLength, sleepOffset, targetOffset) {
  const currentOffset = now - moment(now).startOf('day').valueOf();
  const currentRemainder = DAY_MSECONDS - currentOffset;

  if (currentOffset + cycleLength + sleepOffset < targetOffset) {
    return targetOffset - currentOffset - sleepOffset;
  } else if (currentRemainder + targetOffset < cycleLength + sleepOffset) {
    return currentRemainder + targetOffset - sleepOffset;
  }

  return currentRemainder + DAY_MSECONDS + targetOffset;
}

function _addNotification({ id, adjustedDate, sound }) {
  PushNotificationIOS
    .scheduleLocalNotification({
      fireDate: adjustedDate,
      alertBody: 'Wake up time!',
      soundName: SOUNDS[sound],
      userInfo: { id },
      repeatInterval: 'minute'
    });
}

function _removeNotification({ id }){
  PushNotificationIOS
    .cancelLocalNotifications({ id });
}
