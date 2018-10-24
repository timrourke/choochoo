import { connect } from 'react-redux';
import {
  selectRoute,
  queryRoutes
} from "../actions/routes";
import TrainLineRoutesFilterableDropdown from '../components/TrainLineRoutesFilterableDropdown';

const mapStateToProps = state => {
  return {
    routes: state.routes,
    selectedRoute: state.selectedRoute,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectRoute: selectedRoute => {
      dispatch(selectRoute(selectedRoute));
      dispatch(queryRoutes());
    },
    queryRoutes: byName => {
      dispatch(queryRoutes(byName));
    },
  };
};

const TrainLineRoutesFilterableDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainLineRoutesFilterableDropdown);

export default TrainLineRoutesFilterableDropdownContainer;