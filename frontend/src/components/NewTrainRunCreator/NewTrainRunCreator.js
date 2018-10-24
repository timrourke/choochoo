import React, {Component} from 'react';
import './NewTrainRunCreator.css';
import TrainLinesFilterableDropdownContainer
  from "../../containers/TrainLinesFilterableDropdownContainer";
import TrainLineRoutesFilterableDropdownContainer
  from "../../containers/TrainLineRoutesFilterableDropdownContainer";
import OperatorsFilterableDropdownContainer
  from "../../containers/OperatorsFilterableDropdownContainer";

export default class NewTrainRunCreator extends Component {
  render() {
    return (
      <form className="new-train-run-creator">
        <div className="form-group">
          <label htmlFor="train-line">Train Line</label>
          <TrainLinesFilterableDropdownContainer id="train-line" />
        </div>
        <div className="form-group">
          <label htmlFor="route">Route</label>
          <TrainLineRoutesFilterableDropdownContainer id="route" />
        </div>
        <div className="form-group">
          <label htmlFor="operator">Operator</label>
          <OperatorsFilterableDropdownContainer />
        </div>
        <button type="submit" className="create btn btn-success">Create</button>
      </form>
    );
  }
}