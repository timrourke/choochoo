import axios from 'axios';

export const SELECT_OPERATOR = 'SELECT_OPERATOR';
export const RECEIVE_OPERATORS = 'RECEIVE_OPERATORS';

export function selectOperator(selectedOperator) {
  return {
    type: SELECT_OPERATOR,
    selectedOperator,
  };
}

export function receiveOperators(operators) {
  return {
    type: RECEIVE_OPERATORS,
    operators,
  };
}

export function queryOperators(byName = '', trainLineId = '') {
  return (dispatch, getState) => {
    if (!trainLineId) {
      trainLineId = getState().store.selectedTrainLine.id;
    }

    axios.get(`/api/operators?name=${byName.trim()}&trainLine=${trainLineId}`)
      .then((response) => {
        dispatch(receiveOperators(response.data.operators));
      });
  };
}
