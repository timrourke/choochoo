import React from 'react';
import './FilterableDropdownOption.css';

export const IS_ACTIVE_STRING = '✅';

const FilterableDropdownOption = ({ isActive, label, onClick }) => {
  const clickHandler = onClick || function() {};

  return <li
    className="filterable-dropdown-option"
    onClick={clickHandler}
  >
    {label}
    {isActive &&
      <span className="filterable-dropdown-option-active-indicator">
        {IS_ACTIVE_STRING}
      </span>
    }
  </li>;
};

export default FilterableDropdownOption;
