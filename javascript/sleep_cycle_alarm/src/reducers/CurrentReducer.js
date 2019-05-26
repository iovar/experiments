import {
  EDIT_ALARM,
} from '../actions/types';

const INITIAL_STATE = null;

const CurrentReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case EDIT_ALARM:
      return action.payload.id;
    default:
      return state;
  }
};

export default CurrentReducer;
