import React from 'react';

export function SearchBar({ query, onChange, className }) {
  return (
    <React.Fragment>
      <div className={`${className ? className : '' }`}>
        <input type="text"
          className="w-100 form-control p-3 h-auto"
          placeholder="type artist name"
          value={query}
          onChange={(e) => onChange(e.target.value)} />
      </div>
    </React.Fragment>
  );
}

