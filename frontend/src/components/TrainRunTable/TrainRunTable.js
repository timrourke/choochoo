import React, {Component} from 'react';
import SortDirIndicator from './SortDirIndicator';
import './TrainRunTable.css';

export const ASC         = 'ASC';
export const DESC        = 'DESC';
export const TRAIN_LINE  = 'TRAIN_LINE';
export const ROUTE       = 'ROUTE';
export const RUN_NUMBER  = 'RUN_NUMBER';
export const OPERATOR_ID = 'OPERATOR_ID';

const computeNewSortDirection = (newSortColumn, state) => {
  if (newSortColumn !== state.sortOrder) {
    return ASC;
  }

  return (state.sortDirection === ASC) ?
    DESC :
    ASC;
};

class TrainRunTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortOrder: RUN_NUMBER,
      sortDirection: ASC,
    };
  }

  handleHeaderClick = (newSortColumn) => {
    this.setState({
      ...this.state,
      sortOrder: newSortColumn,
      sortDirection: computeNewSortDirection(newSortColumn, this.state),
    }, () => {
      this.props.queryTrainRuns(
        this.state.sortOrder,
        this.state.sortDirection
      );
    });
  };

  render() {
    return (
      <table className="train-run-table table">
        <thead>
          <tr>
            <th className="train-run-table-column-train-line">
              <button
                className="btn btn-link"
                onClick={() => this.handleHeaderClick(TRAIN_LINE)}
              >
                Train Line
                {this.state.sortOrder === TRAIN_LINE &&
                  <SortDirIndicator sortDirection={this.state.sortDirection} />
                }
              </button>
            </th>
            <th className="train-run-table-column-route">
              <button
                className="btn btn-link"
                onClick={() => this.handleHeaderClick(ROUTE)}
              >
                Route
                {this.state.sortOrder === ROUTE &&
                  <SortDirIndicator sortDirection={this.state.sortDirection} />
                }
              </button>
            </th>
            <th className="train-run-table-column-run-number">
              <button
                className="btn btn-link"
                onClick={() => this.handleHeaderClick(RUN_NUMBER)}
              >
                Run Number
                {this.state.sortOrder === RUN_NUMBER &&
                  <SortDirIndicator sortDirection={this.state.sortDirection} />
                }
              </button>
            </th>
            <th className="train-run-table-column-operator-id">
              <button
                className="btn btn-link"
                onClick={() => this.handleHeaderClick(OPERATOR_ID)}
              >
                Operator ID
                {this.state.sortOrder === OPERATOR_ID &&
                  <SortDirIndicator sortDirection={this.state.sortDirection} />
                }
              </button>
            </th>
            <th style={{width: '50px'}}> </th>
            <th style={{width: '50px'}}> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>El</td>
            <td>Brown Line</td>
            <td>E102</td>
            <td>SJones</td>
            <td>
              <button className="btn btn-light">✏</button>
            </td>
            <td>
              <button className="btn btn-light">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

TrainRunTable.defaultProps = {
  queryTrainRuns: () => {},
};

export default TrainRunTable;