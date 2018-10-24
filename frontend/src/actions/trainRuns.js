import axios from 'axios';

export const SELECT_TRAIN_RUN = 'SELECT_TRAIN_RUN';
export const RECEIVE_TRAIN_RUNS = 'RECEIVE_TRAIN_RUNS';

export function selectTrainRun(selectedTrainRun) {
  return {
    type: SELECT_TRAIN_RUN,
    selectedTrainRun,
  };
}

export function receiveTrainRuns(trainRuns) {
  return {
    type: RECEIVE_TRAIN_RUNS,
    trainRuns,
  };
}

export function queryTrainRuns(sortOrder = '', sortDirection = '') {
  return dispatch => {
    axios.get(`/api/runs?sortOrder=${sortOrder}&sortDirection=${sortDirection}`)
      .then((response) => {
        dispatch(receiveTrainRuns(response.data.runs));
      });
  };
}