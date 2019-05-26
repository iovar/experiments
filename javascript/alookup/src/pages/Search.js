import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';
import { SearchBar, Loading, ArtistCard, Error } from '../components';
import { connect } from 'react-redux'
import { searchArtist } from '../state';
import './Layout.css';

export class SearchPageComponent extends Component {
  componentDidMount() {
    const { info, loading, query, searchArtist } = this.props;

    if ((!info || Object.keys(info).length === 0) && !loading) {
      searchArtist(query);
    }
  }

  render() {
    const { query, searchArtist, loading, error, info } = this.props;
    const showCard = !loading && !error && !!info;

    return (
      <div className="container page-container border">
        <div className="row">
          <h2 className="col-12 mt-3 mb-4 text-center">
            A(rtist) Lookup
          </h2>
        </div>
        <div className="row">
          <SearchBar
            className="col-12 pb-3 px-1 px-md-4"
            query={query}
            onChange={(val) => searchArtist(val)} />
        </div>
        <div className="row">
          <div className="col-12 py-3 px-1 px-md-4">
            { showCard && <ArtistCard info={info} /> }
            { !!error && <Error error={error}/> }
            { loading && <Loading /> }
            { !error && !loading && !info  && (
              <div className="alert alert-light">
                No artist found
              </div>)}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ artist }) {
  const { query, info, loading, error } = artist;

  return {
    query,
    info,
    loading,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchArtist: bindActionCreators(searchArtist, dispatch)
  }
}

export const Search = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent)
);
