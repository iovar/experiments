import React from 'react';

export function Error({ error }) {
  return (
    <div className="alert alert-danger">
      { error }
    </div>
  );
}
