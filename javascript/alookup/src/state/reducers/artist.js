import {
  SEARCH_ARTIST,
  SEARCH_ARTIST_SUCCESS,
  SEARCH_ARTIST_FAIL
} from '../actionTypes';

const initialState = {
  loading: false,
  query: '',
  info: null,
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ARTIST:
      return { ...state, error: '', query: action.payload, loading: !!action.payload };
    case SEARCH_ARTIST_SUCCESS:
      return { ...state, info: action.payload, loading: false };
    case SEARCH_ARTIST_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

