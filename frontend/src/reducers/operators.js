import {
  RECEIVE_OPERATORS,
  SELECT_OPERATOR,
} from '../actions/operators';

const initialState = {
  selectedOperator: null,
  operators: [],
};

const concatSelectedOperatorWithOthers = (selectedOperator, others) => {
  const currentlySelected = [selectedOperator] || [];

  return currentlySelected.concat(others.filter((operator) => {
    return !selectedOperator || operator.id !== selectedOperator.id;
  })).filter((o) => o);
};

export default function operators(state = initialState, action) {
  switch (action.type) {
    case SELECT_OPERATOR:
      return {
        selectedOperator: action.selectedOperator,
        operators: concatSelectedOperatorWithOthers(
          action.selectedOperator,
          state.operators
        ),
      };
    case RECEIVE_OPERATORS:
      return {
        ...state,
        operators: concatSelectedOperatorWithOthers(
          state.selectedOperator,
          action.operators
        ),
      };
    default:
      return state;
  }
}
