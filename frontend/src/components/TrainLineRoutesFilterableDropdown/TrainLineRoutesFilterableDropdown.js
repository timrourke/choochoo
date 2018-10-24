import React, {Component} from 'react';
import FilterableDropdown from './../FilterableDropdown';

const getButtonLabel = (selectedRoute) => {
  if (!selectedRoute) {
    return 'Select a route.';
  }

  return selectedRoute.name;
};

const getOptionsFromRoutes = (routes) => {
  return routes.map((route) => {
    return {
      ...route,
      label: route.name,
    };
  });
};

export default class TrainLineRoutesFilterableDropdown extends Component {
  componentDidMount() {
    this.props.queryRoutes();
  };

  render() {
    return (
      <FilterableDropdown
        buttonLabel={getButtonLabel(this.props.routes.selectedRoute)}
        filterOptions={this.props.queryRoutes}
        selectOption={this.props.selectRoute}
        options={getOptionsFromRoutes(this.props.routes.routes)}
        selectedOption={this.props.routes.selectedRoute}
      />
    );
  }
}
