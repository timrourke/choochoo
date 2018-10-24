import { connect } from 'react-redux';
import {
  selectTrainLine,
  queryTrainLines
} from "../actions/trainLines";
import TrainLinesFilterableDropdown from '../components/TrainLinesFilterableDropdown';

const mapStateToProps = state => {
  return {
    trainLines: state.trainLines,
    selectedTrainLine: state.selectedTrainLine,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectTrainLine: selectedTrainLine => {
      dispatch(selectTrainLine(selectedTrainLine));
      dispatch(queryTrainLines());
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