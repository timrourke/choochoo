import {connect} from 'react-redux';
import {
  queryOperatorRunStats,
} from '../actions/stats';
import OperatorRunStats from "../components/OperatorRunStats/OperatorRunStats";

const mapStateToProps = state => {
  return {operatorRunStats: state.store.operatorRunStats};
};

const mapDispatchToProps = dispatch => {
  return {
    queryOperatorRunStats: (trainLineId) => {
      dispatch(queryOperatorRunStats(trainLineId));
    },
  };
};

const OperatorRunStatsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OperatorRunStats);

export default OperatorRunStatsContainer;