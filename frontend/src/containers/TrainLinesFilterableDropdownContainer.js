import { connect } from 'react-redux';
import {
  selectTrainLine,
  queryTrainLines
} from "../actions/trainLines";
import TrainLinesFilterableDropdown from '../components/TrainLinesFilterableDropdown';
import {queryRoutes} from "../actions/routes";
import {queryOperators} from "../actions/operators";

const mapStateToProps = state => {
  return {
    trainLines: state.store.trainLines,
    selectedTrainLine: state.store.selectedTrainLine,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectTrainLine: selectedTrainLine => {
      dispatch(selectTrainLine(selectedTrainLine));
      dispatch(queryTrainLines());
      dispatch(queryRoutes('', selectedTrainLine.id));
      dispatch(queryOperators('', selectedTrainLine.id));
    },
    queryTrainLines: byName => {
      dispatch(queryTrainLines(byName));
    },
  };
};

const TrainLinesFilterableDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainLinesFilterableDropdown);

export default TrainLinesFilterableDropdownContainer;