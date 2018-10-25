import React, { Component } from 'react';
import './App.css';
import TrainRunTableContainer from './containers/TrainRunTableContainer';
import NewTrainRunCreatorContainer
  from "./containers/NewTrainRunCreatorContainer";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <TrainRunTableContainer />
        <NewTrainRunCreatorContainer />
      </div>
    );
  }
}

export default App;
