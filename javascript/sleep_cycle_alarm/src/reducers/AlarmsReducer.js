import _ from 'lodash';
import moment from 'moment';
import {
  ADD_ALARM,
  TOGGLE_ALARM,
  DELETE_ALARMS,
  CHECK_ALARMS
} from '../actions/types';

// initial state needs to be seeded with redux-persist
// also it needs to check validity by getting the system
// (enabled/disabled that match some appId will be handled);
const INITIAL_STATE = {};

const AlarmsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_ALARM:
      return { ...state, [action.payload.id]: action.payload };
    case TOGGLE_ALARM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ALARMS:
      return _deleteAlarms(state, action.payload);
    case CHECK_ALARMS:
      return _checkAlarms(state);
    default:
      return state;
  }
};

function _deleteAlarms(state, selected) {
  const newState = {};

  _.forEach(state, (alarm) => {
    if (!selected[alarm.id]) {
      newState[alarm.id] = alarm;
    }
  });

  return newState;
}

function _checkAlarms(state) {
  const newState = {};
  const now = moment().valueOf();

  _.forEach(state, (alarm) => {
    if (alarm.enabled && alarm.adjustedDate <= now) {
      newState[alarm.id] = {
        ...alarm,
        enabled: false
      };
    } else {
      newState[alarm.id] = alarm;
    }
  });

  return newState;
}

export default AlarmsReducer;
