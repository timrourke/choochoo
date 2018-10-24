import React, { Component } from 'react';
import './App.css';
import TrainRunTableContainer from './containers/TrainRunTableContainer';
import NewTrainRunCreator from './components/NewTrainRunCreator';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <TrainRunTableContainer />
        <NewTrainRunCreator />
      </div>
    );
  }
}

export default App;
