import React, {Component} from 'react';
import debounce from 'lodash.debounce';
import SortDirIndicator from './SortDirIndicator';
import './TrainRunTable.css';

export const ASC                  = 'ASC';
export const DESC                 = 'DESC';
export const TRAIN_LINE_NAME      = 'lineName';
export const ROUTE_NAME           = 'routeName';
export const RUN_NUMBER           = 'runNumber';
export const OPERATOR_COMPOUND_ID = 'operatorCompoundId';

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

  componentDidMount() {
    this.props.queryTrainRuns();
  }

  debounceQueryTrainRuns = () => {
    if (typeof this.debounce === 'function') {
      this.debounce.cancel();
    }

    this.debounce = debounce(() => {
      this.props.queryTrainRuns(
        this.state.sortOrder,
        this.state.sortDirection
      );
    }, this.props.debounceTimeout);

    this.debounce();
  };

  handleHeaderClick = (newSortColumn) => {
    this.setState({
      ...this.state,
      sortOrder: newSortColumn,
      sortDirection: computeNewSortDirection(newSortColumn, this.state),
    },
      this.debounceQueryTrainRuns
    );
  };

  render() {
    return (
      <table className="train-run-table table">
        <thead>
          <tr>
            <th className="train-run-table-column-train-line">
              <button
                className="btn btn-link"
                onClick={() => this.handleHeaderClick(TRAIN_LINE_NAME)}
              >
                Train Line
                {this.state.sortOrder === TRAIN_LINE_NAME &&
                  <SortDirIndicator sortDirection={this.state.sortDirection} />
                }
              </button>
            </th>
            <th className="train-run-table-column-route">
              <button
                className="btn btn-link"
                onClick={() => this.handleHeaderClick(ROUTE_NAME)}
              >
                Route
                {this.state.sortOrder === ROUTE_NAME &&
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
                onClick={() => this.handleHeaderClick(OPERATOR_COMPOUND_ID)}
              >
                Operator ID
                {this.state.sortOrder === OPERATOR_COMPOUND_ID &&
                  <SortDirIndicator sortDirection={this.state.sortDirection} />
                }
              </button>
            </th>
            <th style={{width: '50px'}}> </th>
            <th style={{width: '50px'}}> </th>
          </tr>
        </thead>
        <tbody>
          {this.props.trainRuns.trainRuns && this.props.trainRuns.trainRuns.length ?
            this.props.trainRuns.trainRuns.map((run) => {
              return (
                <tr key={run.id}>
                  <td>{run.trainLineName}</td>
                  <td>{run.routeName}</td>
                  <td>{run.runNumber}</td>
                  <td>{run.operatorCompoundId}</td>
                  <td>
                    <button className="btn btn-light border border-primary">✏</button>
                  </td>
                  <td>
                    <button className="btn btn-light border border-danger">🗑</button>
                  </td>
                </tr>
              );
            })
            :
            <tr>
              <td colSpan="6">
                <em>Nothing to display.</em>
              </td>
            </tr>
          }
        </tbody>
      </table>
    );
  }
}

TrainRunTable.defaultProps = {
  debounceTimeout: 500,
  queryTrainRuns: () => {},
};

export default TrainRunTable;