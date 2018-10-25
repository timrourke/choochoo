import axios from 'axios';

export const CREATED_NEW_TRAIN_RUN = 'CREATED_NEW_TRAIN_RUN';
export const SELECT_TRAIN_RUN      = 'SELECT_TRAIN_RUN';
export const RECEIVE_TRAIN_RUNS    = 'RECEIVE_TRAIN_RUNS';

export function createNewTrainRun() {
  return (dispatch, getState) => {
    const state = getState();

    axios.post('/api/runs', {
      run: {
        trainLine: state.store.selectedTrainLine.id,
        route: state.store.selectedRoute.id,
        operator: state.store.selectedOperator.id,
      },
    }).then((response) => {
      dispatch(createdNewTrainRun(response.data.run));
      dispatch(queryTrainRuns(
        state.store.sortOrder,
        state.store.sortDirection,
        state.store.offset
      ));
    });
  };
};

export function createdNewTrainRun(newTrainRun) {
  return {
    type: CREATED_NEW_TRAIN_RUN,
    newTrainRun,
  };
};

export function deleteTrainRun(trainRunId) {
  return (dispatch, getState) => {
    const state = getState();

    axios.delete(`/api/runs/${trainRunId}`).then(() => {
      dispatch(queryTrainRuns(
        state.store.sortOrder,
        state.store.sortDirection,
        state.store.offset
      ));
    });
  };
};

export function selectTrainRun(selectedTrainRun) {
  return {
    type: SELECT_TRAIN_RUN,
    selectedTrainRun,
  };
}

export function receiveTrainRuns(trainRuns, offset, total, sortOrder, sortDirection) {
  return {
    type: RECEIVE_TRAIN_RUNS,
    offset,
    total,
    trainRuns,
    sortOrder,
    sortDirection,
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
            response.data.meta.total,
            sortOrder,
            sortDirection
          )
        );
      });
  };
}