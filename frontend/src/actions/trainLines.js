import axios from 'axios';

export const SELECT_TRAIN_LINE   = 'SELECT_TRAIN_LINE';
export const RECEIVE_TRAIN_LINES = 'RECEIVE_TRAIN_LINES';

export function selectTrainLine(selectedTrainLine) {
  return {
    type: SELECT_TRAIN_LINE,
    selectedTrainLine,
  };
}

export function receiveTrainLines(trainLines) {
  return {
    type: RECEIVE_TRAIN_LINES,
    trainLines,
  };
}

export function getTrainLine(trainLineId) {
  return dispatch => {
    const promise = axios.get(`api/trainLines/${trainLineId}`);
    promise
      .then((response) => {
        dispatch(selectTrainLine(response.data.trainLine));
      });
    return promise;
  };
}

export function queryTrainLines() {
  return dispatch => {
    axios.get('/api/trainLines')
      .then((response) => {
        dispatch(receiveTrainLines(response.data.trainLines));
      });
  };
}