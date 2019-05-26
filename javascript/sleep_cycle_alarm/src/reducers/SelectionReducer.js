import {
  TOGGLE_SELECTION,
  TOGGLE_EDIT,
  EDIT_ALARM,
  DELETE_ALARMS
} from '../actions/types';

const INITIAL_STATE = {};

const SelectionReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TOGGLE_SELECTION:
      return _toggleSection(state, action);
    case EDIT_ALARM:
    case DELETE_ALARMS:
    case TOGGLE_EDIT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const _toggleSection = (state, action) => {
  const newState = { ...state };
  const { payload: { id } } = action;

  if (state[id]) {
    delete newState[id];
  } else {
    newState[id] = true;
  }

  return newState;
}

export default SelectionReducer;
