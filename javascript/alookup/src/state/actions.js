import {
  SEARCH_ARTIST,
  SEARCH_ARTIST_SUCCESS,
  SEARCH_ARTIST_FAIL,
  LOAD_EVENTS,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_FAIL
} from './actionTypes';

function createAction(type, payload) {
  return { type, payload };
}

export function searchArtist(name) {
  return createAction(SEARCH_ARTIST, name);
}

export function searchArtistSuccess(artistData) {
  return createAction(SEARCH_ARTIST_SUCCESS, artistData);
}

export function searchArtistFail(error) {
  return createAction(SEARCH_ARTIST_FAIL, error);
}

export function loadEvents(artist) {
  return createAction(LOAD_EVENTS, artist);
}

export function loadEventsSuccess(events) {
  return createAction(LOAD_EVENTS_SUCCESS, events);
}

export function loadEventsFail(error) {
  return createAction(LOAD_EVENTS_FAIL, error);
}
