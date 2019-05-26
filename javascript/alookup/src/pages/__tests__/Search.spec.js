import React from 'react';
import { mount } from 'enzyme';

import { SearchPageComponent } from '../Search';
import { Error, Loading } from '../../components';

describe('Search page component', () => {
  it('should render without crashing', () => {
    mount(<SearchPageComponent searchArtist={() => {}} />);
  });

  it('should call searchArtist on load, if no infois there', () => {
    const searchArtist = jest.fn();
    mount(
      <SearchPageComponent
        query="artist"
        searchArtist={searchArtist}/>
    );

    expect(searchArtist).toHaveBeenLastCalledWith('artist');
  });

  it('should not call searchArtist on load, if data is there', () => {
    const searchArtist = jest.fn();
    mount(
      <SearchPageComponent
        query="artist"
        info={{ id: 1  }}
        searchArtist={searchArtist}/>
    );

    expect(searchArtist).not.toBeCalled();
  });

  it('should render error', () => {
    const wrapper = mount(
      <SearchPageComponent
        query="artist"
        loading={true}
        error="ErrorOccured"
        searchArtist={() => {}}/>
    );

    expect(wrapper.contains(
      <Error error={"ErrorOccured"} />
    )).toBe(true);
  });

  it('should render loading', () => {
    const wrapper = mount(
      <SearchPageComponent
        query="artist"
        loading={true}
        searchArtist={() => {}}/>
    );

    expect(wrapper.contains(
      <Loading />
    )).toBe(true);
  });
});
