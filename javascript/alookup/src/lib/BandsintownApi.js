const PROTOCOL = 'https://'
const HOST = 'rest.bandsintown.com';
const BASE_PATH = '/artists'
const APP_ID = 'alookup'

export function getArtist(artistName) {
  const url = `${PROTOCOL}${HOST}${BASE_PATH}/${artistName}?app_id=${APP_ID}`;

  return fetch(url).then(response => response.json())
}

export function getEvents(artistName) {
  const url = `${PROTOCOL}${HOST}${BASE_PATH}/${artistName}/events?app_id=${APP_ID}`;

  return fetch(url).then(response => response.json())
}
