import React, {Component} from 'react';
import FilterableDropdown from './../FilterableDropdown';

const getButtonLabel = (selectedOperator) => {
  if (!selectedOperator) {
    return 'Select an operator.';
  }

  return `${selectedOperator.firstName} ${selectedOperator.lastName}`;
};

const getOptionsFromOperators = (operators) => {
  return operators.map((operator) => {
    return {
      ...operator,
      label: `${operator.firstName} ${operator.lastName}`,
    };
  });
};

export default class OperatorsFilterableDropdown extends Component {
  componentDidMount() {
    this.props.queryOperators();
  };

  render() {
    return (
      <FilterableDropdown
        buttonLabel={getButtonLabel(this.props.operators.selectedOperator)}
        filterOptions={this.props.queryOperators}
        selectOption={this.props.selectOperator}
        options={getOptionsFromOperators(this.props.operators.operators)}
        selectedOption={this.props.operators.selectedOperator}
      />
    );
  }
}