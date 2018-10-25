import React, {Component} from 'react';
import './NewTrainRunCreator.css';
import TrainLinesFilterableDropdownContainer
  from "../../containers/TrainLinesFilterableDropdownContainer";
import TrainLineRoutesFilterableDropdownContainer
  from "../../containers/TrainLineRoutesFilterableDropdownContainer";
import OperatorsFilterableDropdownContainer
  from "../../containers/OperatorsFilterableDropdownContainer";

export default class NewTrainRunCreator extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleClickCancel = () => {
    this.props.closeCreateNewTrainRunModal();
  };

  handleClickSave = () => {
    if (this.props.selectedTrainRun && 'id' in this.props.selectedTrainRun) {
      this.props.editTrainRun(this.props.selectedTrainRun);
    } else {
      this.props.createNewTrainRun();
    }
  };

  render() {
    if (!this.props.createModalOpen) {
      return '';
    }

    return (
      <div
        className="new-train-run-creator-wrapper"
      >
        <form onSubmit={(e) => this.handleSubmit(e)} className="new-train-run-creator">
          {this.props.selectedTrainRun && 'id' in this.props.selectedTrainRun ?
            <h3>{`Editing run ${this.props.selectedTrainRun.runNumber}`}</h3>
            :
            <h3>Create new train run</h3>
          }
          <div className="form-group">
            <label htmlFor="train-line">Train Line</label>
            <TrainLinesFilterableDropdownContainer id="train-line" />
          </div>
          {this.props.selectedTrainLine &&
          <div className="form-group">
            <label htmlFor="route">Route</label>
            <TrainLineRoutesFilterableDropdownContainer id="route" />
          </div>
          }
          {this.props.selectedTrainLine && this.props.selectedRoute &&
          <div className="form-group">
            <label htmlFor="operator">Operator</label>
            <OperatorsFilterableDropdownContainer id="operator" />
          </div>
          }
          {this.props.selectedTrainLine && this.props.selectedRoute && this.props.selectedOperator &&
            <div className="form-group">
              <button
                type="submit"
                className="create btn btn-success"
                onClick={() => this.handleClickSave()}
              >
                {this.props.selectedTrainRun && 'id' in this.props.selectedTrainRun ?
                  'Edit'
                  :
                  'Create'
                }
              </button>
            </div>
          }
          <button
            type="button"
            className="close-modal btn btn-danger"
            onClick={() => this.handleClickCancel()}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}