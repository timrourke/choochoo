import axios from 'axios';

export const SELECT_TRAIN_RUN = 'SELECT_TRAIN_RUN';
export const RECEIVE_TRAIN_RUNS = 'RECEIVE_TRAIN_RUNS';

export function selectTrainRun(selectedTrainRun) {
  return {
    type: SELECT_TRAIN_RUN,
    selectedTrainRun,
  };
}

export function receiveTrainRuns(trainRuns, offset, total) {
  return {
    type: RECEIVE_TRAIN_RUNS,
    offset,
    total,
    trainRuns,
  };
}

export function queryTrainRuns(sortOrder = '', sortDirection = '', offset = 0) {
  return dispatch => {
    axios.get(`/api/runs?sortOrder=${sortOrder}&sortDirection=${sortDirection}&offset=${offset}`)
      .then((response) => {
        dispatch(
          receiveTrainRuns(
            response.data.runs,
            response.data.meta.offset,
            response.data.meta.total
          )
        );
      });
  };
}