import React from 'react';
import './ArtistCard.css';
import { Link } from "react-router-dom";

export function ArtistCard({ info }) {
  const noFB = !info.facebook_page_url;
  const hasEvents = info.upcoming_event_count > 0;

  return (
    <div className="card d-flex flex-sm-row flex-nowrap w-100" >
      <div>
        <img className="ArtistCart-img d-block"
             src={info.image_url} alt="artist" />
      </div>
      <div className="card-body py-3 d-flex flex-column justify-content-between">
        <h5 className="card-title">{info.name}</h5>
        <div className="card-text pb-2">
          There are <strong>{info.upcoming_event_count}</strong> upcoming event(s) for {info.name}. {
            hasEvents &&
              <Link to={`/events/${info.name}`}>
                Click here to See them
              </Link>
            }
        </div>
        <div className="text-right">
          <a className={`btn btn-primary ${ noFB ? 'disabled': ''}`}
             href={info.facebook_page_url}
             target="_blank"
             rel="noopener noreferrer" >
            See {info.name} on Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
