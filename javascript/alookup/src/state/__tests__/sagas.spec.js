import { call, put, delay } from 'redux-saga/effects'
import { getArtist, getEvents } from '../../lib';
import { loadEventsSaga, searchArtistSaga } from '../sagas';
import {
  loadEvents,
  loadEventsSuccess,
  searchArtist,
  searchArtistSuccess
} from '../actions';

describe('Saga Tests', () => {
  describe('loadEventsSaga', () => {
    it('should not do anything,if the artist name is empty', () => {
      const saga = loadEventsSaga(loadEvents(''));

      expect(saga.next().done).toBe(true);
    });
    it('should call getEvents, with the correct name', () => {
      const saga = loadEventsSaga(loadEvents('artist'));
      const events = [{ id: 1 }, { id: 2 }];

      expect(saga.next().value).toEqual(call(getEvents, 'artist'));
      expect(saga.next(events).value).toEqual(put(loadEventsSuccess(events)));
      expect(saga.next().done).toBe(true);
    });
  });

  describe('searchArtistSaga', () => {
    it('should reset the artist infog,if the artist name is empty', () => {
      const saga = searchArtistSaga(getArtist(''));

      expect(saga.next().value).toEqual(delay(500));
      expect(saga.next().value).toEqual(put(searchArtistSuccess(null)));
      expect(saga.next().done).toBe(true);
    });
    it('should call getArtist, with the correct name', () => {
      const saga = searchArtistSaga(searchArtist('artist'));
      const artist = { id: 0 };

      expect(saga.next().value).toEqual(delay(500));
      expect(saga.next().value).toEqual(call(getArtist, 'artist'));
      expect(saga.next(artist).value).toEqual(put(searchArtistSuccess(artist)));
      expect(saga.next().done).toBe(true);
    });
  });
});
