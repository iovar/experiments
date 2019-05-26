import { all, call, put, delay, takeLatest, takeEvery } from 'redux-saga/effects'
import { LOAD_EVENTS, SEARCH_ARTIST, SEARCH_ARTIST_SUCCESS } from './actionTypes';
import { getArtist, getEvents } from '../lib';
import {
  loadEventsSuccess,
  loadEventsFail,
  searchArtistSuccess,
  searchArtistFail,
} from './actions';

const SEARCH_DEBOUNCE = 500;

export function* loadEventsSaga(action) {
  if (!action.payload) {
    return;
  }

  try {
    const events = yield call(getEvents, action.payload);

    yield put(loadEventsSuccess(events));
  } catch(e) {
    yield put(loadEventsFail(e.message));
  }
}

export function* searchArtistSaga(action) {
  yield delay(SEARCH_DEBOUNCE)

  if (!action.payload) {
    yield put(searchArtistSuccess(null));
    return;
  }

  try {
    const artist = yield call(getArtist, action.payload);

    yield put(searchArtistSuccess(artist));
  } catch(e) {
    yield put(searchArtistFail(e.message));
  }
}

export function* resetEventsSaga() {
  yield put(loadEventsSuccess([]));
}

export default function* rootSaga() {
  yield all([
    takeEvery(LOAD_EVENTS, loadEventsSaga),
    takeLatest(SEARCH_ARTIST, searchArtistSaga),
    takeEvery(SEARCH_ARTIST_SUCCESS, resetEventsSaga)
  ])
}
