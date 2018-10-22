import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import TrainRunTable, {
  ASC,
  DESC,
  TRAIN_LINE,
  ROUTE,
  RUN_NUMBER,
  OPERATOR_ID,
} from './TrainRunTable';
import {
  ASC_INDICATOR_STRING,
  DESC_INDICATOR_STRING
} from './SortDirIndicator/SortDirIndicator';

const {Simulate} = ReactTestUtils;

let div;

beforeEach(() => {
  div = document.createElement('div');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  ReactDOM.render(<TrainRunTable />, div);
});

it('initially renders sorting by run number ascending', () => {
  ReactDOM.render(<TrainRunTable />, div);

  const runNumberColumnHeader = div.querySelector('.train-run-table-column-run-number');

  const otherColumnHeadersTextContents = Array.prototype.slice.call(div.querySelectorAll('th'))
    .filter((el) => {
      const classNames = Array.prototype
        .slice
        .call(el.classList)
        .join('');

      return !/[\w-]+run-number/.test(classNames);
    })
    .map((el) => el.textContent)
    .join('');

  expect(runNumberColumnHeader.textContent).toBe('Run Number' + ASC_INDICATOR_STRING);
  expect(otherColumnHeadersTextContents.indexOf(ASC_INDICATOR_STRING)).toBe(-1);
  expect(otherColumnHeadersTextContents.indexOf(DESC_INDICATOR_STRING)).toBe(-1);
});

it('queries train routes when sort order changes', () => {
  let actualSortOrder = null;
  let actualSortDirection = null;

  const queryTrainRunsStub = (sortOrder, sortDirection) => {
    actualSortOrder = sortOrder;
    actualSortDirection = sortDirection;
  };

  ReactDOM.render(<TrainRunTable queryTrainRuns={queryTrainRunsStub} />, div);

  const operatorIdColumnHeader = div.querySelector('.train-run-table-column-operator-id button');

  Simulate.click(operatorIdColumnHeader);

  expect(actualSortOrder).toBe(OPERATOR_ID);
  expect(actualSortDirection).toBe(ASC);
});

it('queries train routes when sort direction changes', () => {
  let actualSortOrder = null;
  let actualSortDirection = null;

  const queryTrainRunsStub = (sortOrder, sortDirection) => {
    actualSortOrder = sortOrder;
    actualSortDirection = sortDirection;
  };

  ReactDOM.render(<TrainRunTable queryTrainRuns={queryTrainRunsStub} />, div);

  const operatorIdColumnHeader = div.querySelector('.train-run-table-column-run-number button');

  Simulate.click(operatorIdColumnHeader);

  expect(actualSortOrder).toBe(RUN_NUMBER);
  expect(actualSortDirection).toBe(DESC);
});
