import {
  RECEIVE_TRAIN_RUNS,
  SELECT_TRAIN_RUN
} from '../actions/trainRuns';

const initialState = {
  selectedTrainRun: null,
  trainRuns: [],
};

const concatSelectedTrainRunWithOthers = (selectedTrainRun, others) => {
  const currentlySelected = [selectedTrainRun] || [];

  return currentlySelected.concat(others.filter((trainRun) => {
    return !selectedTrainRun || trainRun.id !== selectedTrainRun.id;
  })).filter((o) => o);
};

export default function trainRuns(state = initialState, action) {
  switch (action.type) {
    case SELECT_TRAIN_RUN:
      return {
        selectedTrainRun: action.selectedTrainRun,
        trainRuns: concatSelectedTrainRunWithOthers(
          action.selectedTrainRun,
          state.trainRuns
        ),
      };
    case RECEIVE_TRAIN_RUNS:
      return {
        ...state,
        trainRuns: concatSelectedTrainRunWithOthers(
          state.selectedTrainRun,
          action.trainRuns
        ),
      };
    default:
      return state;
  }
}
