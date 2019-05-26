import React from 'react';
import { mount } from 'enzyme';

import { StaticRouter } from 'react-router'

import { EventsPageComponent } from '../Events';
import { Error, Loading } from '../../components';


describe('Events page component', () => {
  it('should render without crashing', () => {
    mount(
      <StaticRouter location="loc" context={{}}>
        <EventsPageComponent loadEvents={() => {}}/>
      </StaticRouter>
    );
  });

  it('should call loadEvents on load, if no data is there', () => {
    const loadEvents = jest.fn();
    mount(
      <StaticRouter location="loc" context={{}}>
        <EventsPageComponent
          artistName="artist"
          loadEvents={loadEvents}/>
      </StaticRouter>
    );

    expect(loadEvents).toHaveBeenLastCalledWith('artist');
  });

  it('should not call loadEvents on load, if data is there', () => {
    const loadEvents = jest.fn();
    mount(
      <StaticRouter location="loc" context={{}}>
        <EventsPageComponent
          artistName="artist"
          data={[{ id: 1 , venue: {} }]}
          loadEvents={loadEvents}/>
      </StaticRouter>
    );

    expect(loadEvents).not.toBeCalled();
  });

  it('should render error', () => {
    const wrapper = mount(
      <StaticRouter location="loc" context={{}}>
        <EventsPageComponent
          artistName="artist"
          loading={true}
          error="ErrorOccured"
          loadEvents={() => {}}/>
      </StaticRouter>
    );

    expect(wrapper.contains(
      <Error error={"ErrorOccured"} />
    )).toBe(true);
  });

  it('should render loading', () => {
    const wrapper = mount(
      <StaticRouter location="loc" context={{}}>
        <EventsPageComponent
          artistName="artist"
          loading={true}
          loadEvents={() => {}}/>
      </StaticRouter>
    );

    expect(wrapper.contains(
      <Loading />
    )).toBe(true);
  });
});
