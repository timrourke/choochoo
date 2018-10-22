import React, {Component} from 'react';
import SortDirIndicator from './SortDirIndicator';
import './TrainRunTable.css';

const ASC         = 'ASC';
const DESC        = 'DESC';
const TRAIN_LINE  = 'TRAIN_LINE';
const ROUTE       = 'ROUTE';
const RUN_NUMBER  = 'RUN_NUMBER';
const OPERATOR_ID = 'OPERATOR_ID';

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
      sortDirection: (this.state.sortDirection === ASC) ?
        DESC :
        ASC,
    });
  };

  render() {
    return (
      <table className="train-run-table table">
        <thead>
          <tr>
            <th>
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
            <th>
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
            <th>
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
            <th>
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

export default TrainRunTable;