import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import FilterableDropdownOption from './FilterableDropdownOption';
import './FilterableDropdown.css';
const enhanceWithClickOutside = require('react-click-outside');

const isOptionActive = (selectedOption, currentOption) => {
  if (!selectedOption) {
    return false;
  }

  return selectedOption.id === currentOption.id;
};

class FilterableDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingOptions: false,
      searchString: '',
    };
  }

  handleClickOutside() {
    this.closeMenu();
  }

  closeMenu() {
    this.setState({
      ...this.state,
      isShowingOptions: false,
    });
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

  handleOptionSelected = (optionSelected) => {
    this.props.selectOption(optionSelected);

    this.closeMenu();
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
            {this.props.isFilterable &&
              <input
                className="form-control"
                placeholder="Search..."
                type="search"
                onKeyUp={e => this.handleKeyUp(e.target.value)}
              />
            }
            <ul>
              {this.props.options && this.props.options.length ?
                this.props.options.map((option, index) => {
                  return <FilterableDropdownOption
                    isActive={isOptionActive(this.props.selectedOption, option)}
                    key={`filterable-dropdown-option-${index}`}
                    label={option.label}
                    onClick={() => this.handleOptionSelected(option)}
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
  isFilterable: true,
  filterOptions: () => {},
  selectOption: () => {},
};

export default enhanceWithClickOutside(FilterableDropdown);