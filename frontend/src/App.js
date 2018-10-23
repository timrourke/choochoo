import React, { Component } from 'react';
import './App.css';
import TrainRunTable from "./components/TrainRunTable";
import OperatorsFilterableDropdownContainer from "./containers/OperatorsFilterableDropdownContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TrainRunTable />
        <OperatorsFilterableDropdownContainer />
      </div>
    );
  }
}

export default App;
