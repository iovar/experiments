import React from 'react';
import './Loading.css';

export function Loading() {
  return (
    <div className="Loading-container d-flex align-items-center justify-content-center">
      <div className="Loading-spinner">
        <div className="Loading-subspinner" />
      </div>
    </div>
  );
}
