import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import FilterableDropdown from './FilterableDropdown';

const { Simulate } = ReactTestUtils;

let div;

beforeEach(() => {
  div = document.createElement('div');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  ReactDOM.render(<FilterableDropdown />, div);
});

it('renders initially in a closed state', () => {
  ReactDOM.render(<FilterableDropdown />, div);

  const menuEl = div.querySelector('.filterable-dropdown-menu');

  expect(menuEl).toBeNull();
});

it('opens menu on button click', () => {
  ReactDOM.render(<FilterableDropdown />, div);

  const button = div.querySelector('button');

  Simulate.click(button);

  const menuEl = div.querySelector('.filterable-dropdown-menu');

  expect(menuEl).toBeTruthy();
});

it('closes menu', () => {
  ReactDOM.render(<FilterableDropdown />, div);

  const button = div.querySelector('button');

  Simulate.click(button);
  Simulate.click(button);

  const menuEl = div.querySelector('.filterable-dropdown-menu');

  expect(menuEl).toBeNull();
});

it('renders empty message when nothing matches', () => {
  ReactDOM.render(<FilterableDropdown />, div);

  const button = div.querySelector('button');

  Simulate.click(button);

  const menuEl = div.querySelector('.filterable-dropdown-menu');

  expect(menuEl.textContent).toBe('Nothing to display.');
});

it('renders menu options', () => {
  const options = [
    {
      label: 'option 1',
    },
    {
      label: 'option 2',
    },
    {
      label: 'option 3',
    }
  ];

  ReactDOM.render(<FilterableDropdown options={options} />, div);

  const button = div.querySelector('button');

  Simulate.click(button);

  const optionsLabels = Array.prototype.slice.apply(div.querySelectorAll('li'))
    .map((el) => el.textContent)
    .join(' ');

  expect(optionsLabels).toBe('option 1 option 2 option 3');
});

it('selects an option', () => {
  let actualSelectedOption = null;

  const selectOption = (selectedOption) => {
    actualSelectedOption = selectedOption;
  };

  const options = [
    {
      label: 'option 1',
    },
    {
      label: 'option 2',
    }
  ];

  ReactDOM.render(
    <FilterableDropdown
      options={options}
      selectOption={selectOption}
    />,
    div
  );

  const button = div.querySelector('button');

  Simulate.click(button);

  const secondOption = div.querySelectorAll('.filterable-dropdown-option')[1];

  Simulate.click(secondOption);

  expect(actualSelectedOption).toBe(options[1]);
});

it('filters options on key up', (done) => {
  const expectedInputValue = 'some search string';

  let filterOptionsCalledWith = null;

  const filterOptionsStub = (str) => {
    filterOptionsCalledWith = str;
  };

  ReactDOM.render(
    <FilterableDropdown
      debounceTimeout={0}
      filterOptions={filterOptionsStub}
    />,
    div
  );

  const el = div.querySelector('.filterable-dropdown');
  const button = el.querySelector('button');

  Simulate.click(button);

  const input = el.querySelector('input');

  input.value = expectedInputValue;
  Simulate.change(input);
  Simulate.keyUp(input);

  setTimeout(() => {
    expect(filterOptionsCalledWith).toBe(expectedInputValue);

    done();
  }, 0);
});
