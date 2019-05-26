import React from 'react';

const BASE_URL = 'https://maps.googleapis.com/maps/api/staticmap';
const OPTIONS = 'zoom=14&size=320x320&maptype=roadmap';
const KEY = 'AIzaSyCJVDReVh1sfRZYGCAr2ehjzc7Xxjmoxdg'

export function EventCard({ event }) {
  const { venue, datetime } = event;
  const { name, city, country, longitude, latitude } = venue;

  const dateObj = new Date(Date.parse(datetime));
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  const url = `${BASE_URL}?center=${latitude},${longitude}&${OPTIONS}&markers=color:blue%7Clabel:S%7C${longitude},${latitude}&key=${KEY}`;

  return (
    <div className="card d-flex flex-sm-row flex-nowrap w-100" >
      <div>
        <img className="ArtistCart-img d-block"
             src={url} alt="location on map" />
      </div>

      <div className="card-body py-3">
        <h5 className="card-title mb-1">{name}</h5>
        <p className="small font-weight-bold">
          {city}, {country}
        </p>

        <div className="card-text">
          <p className="mb-0">Date: <strong>{date}</strong></p>
          <p>Time: <strong>{time}</strong></p>
        </div>
      </div>
    </div>
  );
}
