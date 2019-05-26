import {
  LOAD_EVENTS,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_FAIL
} from '../actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return { ...state, loading: !!action.payload };
    case LOAD_EVENTS_SUCCESS:
      return { ...state, data: action.payload, loading: false};
    case LOAD_EVENTS_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

