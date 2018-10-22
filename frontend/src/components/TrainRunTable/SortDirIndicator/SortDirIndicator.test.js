import React from 'react';
import ReactDOM from 'react-dom';
import SortDirIndicator, { ASC_INDICATOR_STRING, DESC_INDICATOR_STRING } from './SortDirIndicator';

let div;

beforeEach(() => {
  div = document.createElement('div');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  ReactDOM.render(<SortDirIndicator />, div);
});

it('initially renders in ASC position', () => {
  ReactDOM.render(<SortDirIndicator />, div);

  const el = div.querySelector('span');

  expect(el.textContent).toBe(ASC_INDICATOR_STRING);
});

it('renders in ASC position', () => {
  ReactDOM.render(<SortDirIndicator sortDirection={'ASC'} />, div);

  const el = div.querySelector('span');

  expect(el.textContent).toBe(ASC_INDICATOR_STRING);
});

it('renders in DESC position', () => {
  ReactDOM.render(<SortDirIndicator sortDirection={'DESC'} />, div);

  const el = div.querySelector('span');

  expect(el.textContent).toBe(DESC_INDICATOR_STRING);
});

it('renders nothing when input prop invalid', () => {
  ReactDOM.render(<SortDirIndicator sortDirection={'something invalid'} />, div);

  const el = div.querySelector('span');

  expect(el.textContent).toBe('');
});
