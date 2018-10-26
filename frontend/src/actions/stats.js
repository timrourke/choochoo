import axios from 'axios';

export const RECEIVE_OPERATOR_RUN_STATS = 'RECEIVE_OPERATOR_RUN_STATS';

export function queryOperatorRunStats(lineId) {
  return dispatch => {
    axios.get(`/api/trainLines/${lineId}/stats`).then(response => {
      dispatch(receiveOperatorRunStats(response.data));
    });
  };
}

export function receiveOperatorRunStats(stats) {
  return {
    type: RECEIVE_OPERATOR_RUN_STATS,
    stats,
  };
}