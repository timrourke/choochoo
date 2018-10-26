import React, { Component } from 'react';
import './App.css';
import TrainRunTableContainer from './containers/TrainRunTableContainer';
import NewTrainRunCreatorContainer
  from "./containers/NewTrainRunCreatorContainer";
import OperatorRunStatsContainer from "./containers/OperatorRunStatsContainer";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <TrainRunTableContainer />
        <NewTrainRunCreatorContainer />
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <OperatorRunStatsContainer trainLineId={1} />
            </div>
            <div className="col-sm">
              <OperatorRunStatsContainer trainLineId={2} />
            </div>
            <div className="col-sm">
              <OperatorRunStatsContainer trainLineId={3} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
