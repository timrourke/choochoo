import { connect } from 'react-redux';
import {
  selectRoute,
  queryRoutes
} from "../actions/routes";
import TrainLineRoutesFilterableDropdown from '../components/TrainLineRoutesFilterableDropdown';

const mapStateToProps = state => {
  return {
    routes: state.store.routes,
    selectedRoute: state.store.selectedRoute,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectRoute: selectedRoute => {
      dispatch(selectRoute(selectedRoute));
      dispatch(queryRoutes());
    },
    queryRoutes: (byName, trainLineId)  => {
      dispatch(queryRoutes(byName, trainLineId));
    },
  };
};

const TrainLineRoutesFilterableDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainLineRoutesFilterableDropdown);

export default TrainLineRoutesFilterableDropdownContainer;