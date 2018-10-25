import axios from 'axios';

export const SELECT_ROUTE = 'SELECT_ROUTE';
export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';

export function selectRoute(selectedRoute) {
  return {
    type: SELECT_ROUTE,
    selectedRoute,
  };
}

export function receiveRoutes(routes) {
  return {
    type: RECEIVE_ROUTES,
    routes,
  };
}

export function queryRoutes(byName = '', trainLineId = '') {
  return (dispatch, getState) => {
    if (!trainLineId) {
      trainLineId = getState().store.selectedTrainLine.id;
    }

    axios.get(`/api/routes?name=${byName.trim()}&trainLine=${trainLineId}`)
      .then((response) => {
        dispatch(receiveRoutes(response.data.routes));
      });
  };
}