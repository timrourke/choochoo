import { connect } from 'react-redux';
import {
  selectTrainRun,
  queryTrainRuns, deleteTrainRun, openCreateNewTrainRunModal,
} from "../actions/trainRuns";
import TrainRunTable from '../components/TrainRunTable';

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
    selectTrainRun: selectedTrainRun => {
      dispatch(selectTrainRun(selectedTrainRun));
      dispatch(queryTrainRuns());
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