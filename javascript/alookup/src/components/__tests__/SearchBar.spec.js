import React from 'react';
import { mount } from 'enzyme';

import { SearchBar } from '../SearchBar';

describe('SearchBar component', () => {
  it('should set value in the input', () => {
    const search = mount(
      <SearchBar query="value" onChange={() => {}} />
    );
    const input = search.find('input');

    expect(input).toHaveLength(1);
    expect(input.instance().value).toBe('value');
  });

  it('should call onChange when input changes', () => {
    const onChange = jest.fn();
    const search = mount(
      <SearchBar query="value" onChange={onChange} />
    );
    const input = search.find('input');
    input.simulate("change", { target: { value: "new val" }});

    expect(onChange).toHaveBeenLastCalledWith('new val');
  });
});
