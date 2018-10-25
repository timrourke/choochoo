import React, {Component} from 'react';
import FilterableDropdown from './../FilterableDropdown';

const getButtonLabel = (selectedTrainLine) => {
  if (!selectedTrainLine) {
    return 'Select a train line.';
  }

  return selectedTrainLine.name;
};

const getOptionsFromTrainLines = (trainLines) => {
  return trainLines.map((trainLine) => {
    return {
      ...trainLine,
      label: trainLine.name,
    };
  });
};

export default class TrainLinesFilterableDropdown extends Component {
  componentDidMount() {
    this.props.queryTrainLines();
  };

  render() {
    return (
      <FilterableDropdown
        buttonLabel={getButtonLabel(this.props.selectedTrainLine)}
        filterOptions={this.props.queryTrainLines}
        isFilterable={false}
        selectOption={this.props.selectTrainLine}
        options={getOptionsFromTrainLines(this.props.trainLines)}
        selectedOption={this.props.selectedTrainLine}
      />
    );
  }
}