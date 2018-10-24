import {
  RECEIVE_TRAIN_LINES,
  SELECT_TRAIN_LINE
} from '../actions/trainLines';

const initialState = {
  selectedTrainLine: null,
  trainLines: [],
};

const concatSelectedTrainLineWithOthers = (selectedTrainLine, others) => {
  const currentlySelected = [selectedTrainLine] || [];

  return currentlySelected.concat(others.filter((trainLine) => {
    return !selectedTrainLine || trainLine.id !== selectedTrainLine.id;
  })).filter((o) => o);
};

export default function trainLines(state = initialState, action) {
  switch (action.type) {
    case SELECT_TRAIN_LINE:
      return {
        selectedTrainLine: action.selectedTrainLine,
        trainLines: concatSelectedTrainLineWithOthers(
          action.selectedTrainLine,
          state.trainLines
        ),
      };
    case RECEIVE_TRAIN_LINES:
      return {
        ...state,
        trainLines: concatSelectedTrainLineWithOthers(
          state.selectedTrainLine,
          action.trainLines
        ),
      };
    default:
      return state;
  }
}
