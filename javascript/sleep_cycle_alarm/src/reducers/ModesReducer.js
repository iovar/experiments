import {
  TOGGLE_EDIT,
  EDIT_ALARM
} from '../actions/types';

import { VIEW_MODE, EDIT_MODE } from '../Modes';
const INITIAL_STATE = VIEW_MODE;

const ModesReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TOGGLE_EDIT:
      return state === VIEW_MODE ? EDIT_MODE : VIEW_MODE;
    case EDIT_ALARM:
      return VIEW_MODE;
    default:
      return state;
  }
};

export default ModesReducer;

