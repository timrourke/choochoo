import React, { Component } from 'react';
import FilterableDropdown from './components/FilterableDropdown';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FilterableDropdown buttonLabel={'Open'} />
      </div>
    );
  }
}

export default App;
