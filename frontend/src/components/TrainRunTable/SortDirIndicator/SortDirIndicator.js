import React, {Component} from 'react';

const ASC  = 'ASC';
const DESC = 'DESC';

export const ASC_INDICATOR_STRING  = ' 🔼';
export const DESC_INDICATOR_STRING = ' 🔽';

class SortDirIndicator extends Component {
  getSortDirIndicator = () => {
    switch (this.props.sortDirection) {
      case ASC:
        return ASC_INDICATOR_STRING;
      case DESC:
        return DESC_INDICATOR_STRING;
      default:
        return '';
    }
  };

  render() {
    return (
      <span className="sort-dir-indicator">
        {this.getSortDirIndicator()}
      </span>
    );
  }
}

SortDirIndicator.defaultProps = {
  sortDirection: ASC,
};

export default SortDirIndicator;