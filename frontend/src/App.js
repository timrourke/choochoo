import React, { Component } from 'react';
import './App.css';
import TrainRunTableContainer from './containers/TrainRunTableContainer';
import OperatorsFilterableDropdownContainer from './containers/OperatorsFilterableDropdownContainer';
import TrainLineRoutesFilterableDropdownContainer from './containers/TrainLineRoutesFilterableDropdownContainer';
import TrainLinesFilterableDropdownContainer from './containers/TrainLinesFilterableDropdownContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TrainRunTableContainer />
        <TrainLinesFilterableDropdownContainer />
        <TrainLineRoutesFilterableDropdownContainer />
        <OperatorsFilterableDropdownContainer />
      </div>
    );
  }
}

export default App;
