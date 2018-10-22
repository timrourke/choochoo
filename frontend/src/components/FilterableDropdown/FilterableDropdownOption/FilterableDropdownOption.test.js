import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import FilterableDropdownOption, {IS_ACTIVE_STRING} from './FilterableDropdownOption';

const {Simulate} = ReactTestUtils;

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

it('calls the onClick handler provided', () => {
  let passedClickHandlerWasCalled = false;

  const clickHandler = () => {
    passedClickHandlerWasCalled = true;
  };

  ReactDOM.render(<FilterableDropdownOption onClick={clickHandler} />, div);

  const el = div.querySelector('.filterable-dropdown-option');

  Simulate.click(el);

  expect(passedClickHandlerWasCalled).toBe(true);
});

it('hides the active indicator when inactive', () => {
  ReactDOM.render(<FilterableDropdownOption isActive={false} />, div);

  const el = div.querySelector('.filterable-dropdown-option');

  expect(el.textContent.indexOf(IS_ACTIVE_STRING)).toBe(-1);
});

it('displays the active indicator when active', () => {
  ReactDOM.render(<FilterableDropdownOption isActive={true} />, div);

  const el = div.querySelector('.filterable-dropdown-option');

  expect(el.textContent).toContain(IS_ACTIVE_STRING);
});