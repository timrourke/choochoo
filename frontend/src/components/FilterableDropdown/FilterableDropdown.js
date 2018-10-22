import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import FilterableDropdownOption from './FilterableDropdownOption';
import './FilterableDropdown.css';

class FilterableDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingOptions: false,
      searchString: '',
    };
  }

  handleButtonClick = () => {
    return this.setState({
      ...this.state,
      isShowingOptions: !this.state.isShowingOptions
    });
  };

  handleKeyUp = (newSearchString = '') => {
    if (typeof this.debounce === 'function') {
      this.debounce.cancel();
    }

    this.debounce = debounce(() => {
      this.props.filterOptions(newSearchString);
    }, this.props.debounceTimeout);

    this.debounce();
  };

  render() {
    return (
      <div className="filterable-dropdown">
        <button
          className="btn btn-primary"
          onClick={e => this.handleButtonClick(e)}
        >{this.props.buttonLabel}</button>
        {this.state.isShowingOptions &&
          <div className="filterable-dropdown-menu">
            <input
              className="form-control"
              placeholder="Search..."
              type="search"
              onKeyUp={e => this.handleKeyUp(e.target.value)}
            />
            <ul>
              {this.props.options && this.props.options.length ?
                this.props.options.map((option, index) => {
                  return <FilterableDropdownOption
                  key={`filterable-dropdown-option-${index}`}
                  label={option.label}
                  />;
                })
                : <em>Nothing to display.</em>
              }
            </ul>
          </div>
        }
      </div>
    );
  }
}

FilterableDropdown.defaultProps = {
  buttonLabel: '',
  debounceTimeout: 500,
  filterOptions: () => {},
};

export default FilterableDropdown;