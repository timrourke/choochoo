import {
  RECEIVE_OPERATORS,
  SELECT_OPERATOR,
} from '../actions/operators';
import {
  RECEIVE_ROUTES,
  SELECT_ROUTE,
} from '../actions/routes';
import {
  RECEIVE_TRAIN_LINES,
  SELECT_TRAIN_LINE
} from '../actions/trainLines';
import {
  CLOSE_CREATE_NEW_TRAIN_RUN_MODAL,
  CREATED_NEW_TRAIN_RUN, OPEN_CREATE_NEW_TRAIN_RUN_MODAL,
  RECEIVE_TRAIN_RUNS,
  SELECT_TRAIN_RUN
} from '../actions/trainRuns';
import {
  ASC,
  RUN_NUMBER
} from "../components/TrainRunTable/TrainRunTable";

const initialState = {
  createModalOpen: false,
  isCreating: false,
  limit: 5,
  offset: 0,
  operators: [],
  routes: [],
  selectedOperator: null,
  selectedRoute: null,
  selectedTrainLine: null,
  selectedTrainRun: null,
  sortDirection: ASC,
  sortOrder: RUN_NUMBER,
  total: 0,
  trainLines: [],
  trainRuns: [],
};

const concatSelectedModelsWithOthers = (selectedTrainRun, others) => {
  const currentlySelected = [selectedTrainRun] || [];

  return currentlySelected.concat(others.filter((trainRun) => {
    return !selectedTrainRun || trainRun.id !== selectedTrainRun.id;
  })).filter((o) => o);
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case SELECT_OPERATOR:
      return {
        ...state,
        selectedOperator: action.selectedOperator,
        operators: concatSelectedModelsWithOthers(
          action.selectedOperator,
          state.operators
        ),
      };
    case RECEIVE_OPERATORS:
      return {
        ...state,
        operators: concatSelectedModelsWithOthers(
          state.selectedOperator,
          action.operators
        ),
      };
    case SELECT_ROUTE:
      return {
        ...state,
        selectedRoute: action.selectedRoute,
        routes: concatSelectedModelsWithOthers(
          action.selectedRoute,
          state.routes
        ),
      };
    case RECEIVE_ROUTES:
      return {
        ...state,
        routes: concatSelectedModelsWithOthers(
          state.selectedRoute,
          action.routes
        ),
      };
    case SELECT_TRAIN_LINE:
      return {
        ...state,
        selectedTrainLine: action.selectedTrainLine,
        trainLines: concatSelectedModelsWithOthers(
          action.selectedTrainLine,
          state.trainLines
        ),
      };
    case RECEIVE_TRAIN_LINES:
      return {
        ...state,
        trainLines: concatSelectedModelsWithOthers(
          state.selectedTrainLine,
          action.trainLines
        ),
      };
    case CREATED_NEW_TRAIN_RUN:
      return {
        ...state,
        createModalOpen: false,
        selectedOperator: null,
        selectedRoute: null,
        selectedTrainLine: null,
        selectedTrainRun: null,
      };
    case SELECT_TRAIN_RUN:
      return {
        ...state,
        selectedTrainRun: action.selectedTrainRun,
        trainRuns: concatSelectedModelsWithOthers(
          action.selectedTrainRun,
          state.trainRuns
        ),
      };
    case RECEIVE_TRAIN_RUNS:
      return {
        ...state,
        offset: action.offset,
        total: action.total,
        trainRuns: concatSelectedModelsWithOthers(
          state.selectedTrainRun,
          action.trainRuns
        ),
        sortOrder: action.sortOrder,
        sortDirection: action.sortDirection,
      };
    case OPEN_CREATE_NEW_TRAIN_RUN_MODAL:
      return {
        ...state,
        createModalOpen: true,
      };
    case CLOSE_CREATE_NEW_TRAIN_RUN_MODAL:
      return {
        ...state,
        createModalOpen: false,
        selectedOperator: null,
        selectedRoute: null,
        selectedTrainLine: null,
        selectedTrainRun: null,
      };
    default:
      return state;
  }
}
