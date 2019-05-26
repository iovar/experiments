import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loadEvents } from '../state';
import { Loading, EventCard, Error } from '../components';
import { Link } from "react-router-dom";
import get from 'lodash.get';
import './Events.css';

export class EventsPageComponent extends Component {
  componentDidMount() {
    const { data, loading, artistName, loadEvents } = this.props;

    if ((!data || !data.length) && !loading) {
      loadEvents(artistName);
    }
  }

  renderEvents() {
    const { artistName, data } = this.props;

    return data.length ? (
      <div className="d-flex flex-column">
        {data.map(e => <EventCard key={e.id} event={e} />)}
      </div>
    ): (<div className="alert alert-light">
        No events for {artistName} found
    </div>);
  }

  render() {
    const { artistName, loading, error, data } = this.props;
    const showCards = !loading && !error && !!data;

    return (
      <div className="container page-container border">
        <div className="row position-sticky border-bottom Events-sticky-header">
          <h3 className="col-12 mt-3 mb-4">

            <Link className="btn btn-primary mr-3" to={`/`}>Go Back</Link>
            Events for { artistName }
          </h3>
        </div>
        <div className="row">
        </div>
        <div className="row">
          <div className="col-12 py-3 px-1 px-md-4">
            { showCards && this.renderEvents()  }
            { !!error && <Error error={error}/> }
            { loading && <Loading /> }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ events }, ownProps) {
  const { error, loading, data } = events;
  const artistName = get(ownProps, 'match.params.artistName');

  return {
    error,
    loading,
    data,
    artistName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadEvents: bindActionCreators(loadEvents, dispatch)
  }
}

export const Events = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventsPageComponent)
);
