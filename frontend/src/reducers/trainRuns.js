import {
  RECEIVE_TRAIN_RUNS,
  SELECT_TRAIN_RUN
} from '../actions/trainRuns';

const initialState = {
  limit: 5,
  offset: 0,
  selectedTrainRun: null,
  total: 0,
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
        ...state,
        selectedTrainRun: action.selectedTrainRun,
        trainRuns: concatSelectedTrainRunWithOthers(
          action.selectedTrainRun,
          state.trainRuns
        ),
      };
    case RECEIVE_TRAIN_RUNS:
      return {
        ...state,
        offset: action.offset,
        total: action.total,
        trainRuns: concatSelectedTrainRunWithOthers(
          state.selectedTrainRun,
          action.trainRuns
        ),
      };
    default:
      return state;
  }
}
