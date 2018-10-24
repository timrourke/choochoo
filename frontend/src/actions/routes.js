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

export function queryRoutes(byName = '') {
  return dispatch => {
    axios.get(`/api/routes?name=${byName.trim()}`)
      .then((response) => {
        dispatch(receiveRoutes(response.data.routes));
      });
  };
}