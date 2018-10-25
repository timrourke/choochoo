import axios from 'axios';
import {getOperator, selectOperator} from "./operators";
import {getTrainLine, selectTrainLine} from "./trainLines";
import {getRoute, selectRoute} from "./routes";

export const CREATED_NEW_TRAIN_RUN            = 'CREATED_NEW_TRAIN_RUN';
export const SELECT_TRAIN_RUN                 = 'SELECT_TRAIN_RUN';
export const RECEIVE_TRAIN_RUNS               = 'RECEIVE_TRAIN_RUNS';
export const OPEN_CREATE_NEW_TRAIN_RUN_MODAL  = 'OPEN_CREATE_NEW_TRAIN_RUN_MODAL';
export const CLOSE_CREATE_NEW_TRAIN_RUN_MODAL = 'CLOSE_CREATE_NEW_TRAIN_RUN_MODAL';

export function openCreateNewTrainRunModal() {
  return {
    type: OPEN_CREATE_NEW_TRAIN_RUN_MODAL,
  };
}

export function closeCreateNewTrainRunModal() {
  return {
    type: CLOSE_CREATE_NEW_TRAIN_RUN_MODAL,
  };
}

export function createNewTrainRun() {
  return (dispatch, getState) => {
    const state = getState();

    axios.post('/api/runs', {
      run: {
        line: state.store.selectedTrainLine.id,
        route: state.store.selectedRoute.id,
        operator: state.store.selectedOperator.id,
      },
    }).then(() => {
      dispatch(createdNewTrainRun());
      dispatch(queryTrainRuns(
        state.store.sortOrder,
        state.store.sortDirection,
        state.store.offset
      ));
    });
  };
};

export function createdNewTrainRun() {
  return {
    type: CREATED_NEW_TRAIN_RUN,
  };
}

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
}

export function editTrainRun(trainRun) {
  return (dispatch, getState) => {
    const state = getState();

    axios.put(`/api/runs/${trainRun.id}`,
      {
        run: {
          id: trainRun.id,
          line: state.store.selectedTrainLine.id,
          route: state.store.selectedRoute.id,
          operator: state.store.selectedOperator.id,
        },
      })
      .then(() => {
        dispatch(createdNewTrainRun());
        dispatch(queryTrainRuns(
          state.store.sortOrder,
          state.store.sortDirection,
          state.store.offset
        ));
      })
  };
}

export function startEditingTrainRun(trainRun) {
  return dispatch => {
    const promises = [
      dispatch(getOperator(trainRun.operator)),
      dispatch(getTrainLine(trainRun.line)),
      dispatch(getRoute(trainRun.route)),
    ];

    Promise.all(promises).then((values) => {
      const results = values.reduce((acc, current) => {
        if ('operator' in current.data) {
          acc.operator = current.data.operator;
        }

        if ('trainLine' in current.data) {
          acc.trainLine = current.data.trainLine;
        }

        if ('route' in current.data) {
          acc.route = current.data.route;
        }

        return acc;
      }, {});

      dispatch(selectTrainLine(results.trainLine));
      dispatch(selectOperator(results.operator));
      dispatch(selectRoute(results.route));
      dispatch(openCreateNewTrainRunModal());
    });
  };
}

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