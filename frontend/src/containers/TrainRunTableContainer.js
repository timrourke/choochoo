import { connect } from 'react-redux';
import {
  selectTrainRun,
  queryTrainRuns,
  deleteTrainRun,
  openCreateNewTrainRunModal,
  startEditingTrainRun,
} from "../actions/trainRuns";
import TrainRunTable from '../components/TrainRunTable';
import {queryTrainLines} from "../actions/trainLines";
import {queryRoutes} from "../actions/routes";
import {queryOperators} from "../actions/operators";

const mapStateToProps = state => {
  return {
    createModalOpen: state.store.createModalOpen,
    limit: state.store.limit,
    offset: state.store.offset,
    total: state.store.total,
    trainRuns: state.store.trainRuns,
    selectedTrainRun: state.store.selectedTrainRun,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTrainRun: trainRunId => {
      dispatch(deleteTrainRun(trainRunId));
    },
    openCreateNewTrainRunModal: () => {
      dispatch(openCreateNewTrainRunModal());
    },
    startEditingTrainRun: trainRun => {
      dispatch(selectTrainRun(trainRun));
      dispatch(startEditingTrainRun(trainRun));
      dispatch(queryTrainLines());
      dispatch(queryRoutes('', trainRun.line));
      dispatch(queryOperators('', trainRun.line));
    },
    queryTrainRuns: (sortOrder, sortDirection, offset) => {
      dispatch(queryTrainRuns(sortOrder, sortDirection, offset));
    },
  };
};

const TrainRunTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainRunTable);

export default TrainRunTableContainer;