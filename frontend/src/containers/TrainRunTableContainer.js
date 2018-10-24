import { connect } from 'react-redux';
import {
  selectTrainRun,
  queryTrainRuns,
} from "../actions/trainRuns";
import TrainRunTable from '../components/TrainRunTable';

const mapStateToProps = state => {
  return {
    trainRuns: state.trainRuns,
    selectedTrainRun: state.selectedTrainRun,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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