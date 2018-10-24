import {
  RECEIVE_ROUTES,
  SELECT_ROUTE
} from '../actions/routes';

const initialState = {
  selectedRoute: null,
  routes: [],
};

const concatSelectedRouteWithOthers = (selectedRoute, others) => {
  const currentlySelected = [selectedRoute] || [];

  return currentlySelected.concat(others.filter((route) => {
    return !selectedRoute || route.id !== selectedRoute.id;
  })).filter((o) => o);
};

export default function routes(state = initialState, action) {
  switch (action.type) {
    case SELECT_ROUTE:
      return {
        selectedRoute: action.selectedRoute,
        routes: concatSelectedRouteWithOthers(
          action.selectedRoute,
          state.routes
        ),
      };
    case RECEIVE_ROUTES:
      return {
        ...state,
        routes: concatSelectedRouteWithOthers(
          state.selectedRoute,
          action.routes
        ),
      };
    default:
      return state;
  }
}
