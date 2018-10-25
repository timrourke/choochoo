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

const getNextOffset = (currentOffset, currentLimit, total) => {
  if (currentOffset + currentLimit > (total - 1)) {
    return total - 1;
  }

  return currentOffset + currentLimit;
};

const getPrevOffset = (currentOffset, currentLimit) => {
  if (currentOffset - currentLimit < 0) {
    return 0;
  }

  return currentOffset - currentLimit;
};

class TrainRunTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
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
        this.state.sortDirection,
        this.state.offset
      );
    }, this.props.debounceTimeout);

    this.debounce();
  };

  handleClickIncrementOffset = () => {
    this.setState({
      ...this.state,
      offset: getNextOffset(
        this.state.offset,
        this.props.limit,
        this.props.total
      ),
    },
      this.debounceQueryTrainRuns
    );
  };

  handleClickDecrementOffset = () => {
    this.setState({
        ...this.state,
        offset: getPrevOffset(
          this.state.offset,
          this.props.limit
        ),
      },
      this.debounceQueryTrainRuns
    );
  };

  handleDeleteClick = (trainRunId) => {
    if (typeof this.deleteDebounce === 'function') {
      this.deleteDebounce.cancel();
    }

    this.deleteDebounce = debounce(() => {
      this.props.deleteTrainRun(trainRunId);
    }, this.props.debounceTimeout);

    this.deleteDebounce();
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
      <div className="train-run-wrapper">
        <table className="train-run-table table table-striped">
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
          {this.props.trainRuns && this.props.trainRuns.length ?
            this.props.trainRuns.map((run) => {
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
                    <button
                      className="btn btn-light border border-danger"
                      onClick={() => this.handleDeleteClick(run.id)}
                    >
                      🗑
                    </button>
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
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Previous"
                onClick={() => this.handleClickDecrementOffset()}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </button>
            </li>
            <li className="page-item page-item-spacer"> </li>
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Next"
                onClick={() => this.handleClickIncrementOffset()}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

TrainRunTable.defaultProps = {
  debounceTimeout: 500,
  queryTrainRuns: () => {},
};

export default TrainRunTable;