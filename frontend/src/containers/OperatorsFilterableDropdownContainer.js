import { connect } from 'react-redux';
import {
  selectOperator,
  queryOperators
} from "../actions/operators";
import OperatorsFilterableDropdown from '../components/OperatorsFilterableDropdown';

const mapStateToProps = state => {
  return {
    operators: state.store.operators,
    selectedOperator: state.store.selectedOperator,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectOperator: selectedOperator => {
      dispatch(selectOperator(selectedOperator));
      dispatch(queryOperators());
    },
    queryOperators: (byName, trainLineId) => {
      dispatch(queryOperators(byName, trainLineId));
    },
  };
};

const OperatorsFilterableDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OperatorsFilterableDropdown);

export default OperatorsFilterableDropdownContainer;