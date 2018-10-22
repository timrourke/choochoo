import React from 'react';
import ReactDOM from 'react-dom';
import FilterableDropdownOption from './FilterableDropdownOption';

let div;

beforeEach(() => {
  div = document.createElement('div');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  ReactDOM.render(<FilterableDropdownOption />, div);
});

it('shows the correct label', () => {
  const expectedLabel = 'some label text';
  ReactDOM.render(<FilterableDropdownOption label={expectedLabel} />, div);

  const el = div.querySelector('.filterable-dropdown-option');

  expect(el.textContent).toBe(expectedLabel);
});
