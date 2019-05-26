import {
  ADD_ALARM,
  EDIT_ALARM,
  CHANGE_DEFAULTS
} from '../actions/types';
import _ from 'lodash';
import SOUNDS from '../Sounds';

const INITIAL_STATE = {
  sound: _.keys(SOUNDS)[0],
  fireDate: new Date().getTime(),
  snooze: true
};

const LastSettingsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_ALARM:
      return { ...state, ...action.payload };
    case EDIT_ALARM:
    case CHANGE_DEFAULTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default LastSettingsReducer;
