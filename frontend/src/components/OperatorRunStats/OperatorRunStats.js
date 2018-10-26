import React, {Component} from 'react';
import {RadialChart} from "react-vis";
import './OperatorRunStats.css';

const filterStatsByTrainLineId = (stat, trainLineId) => {
  return parseInt(stat.trainLineId, 10) === parseInt(trainLineId, 10);
};

export default class OperatorRunStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredCell: false,
    };
  }

  componentDidMount() {
    this.props.queryOperatorRunStats(this.props.trainLineId);
  }

  getDataFromStats = (trainLineStats, trainLineId) => {
    const relevantData = trainLineStats.filter(stat => {
      return filterStatsByTrainLineId(stat, trainLineId);
    });

    const totalRuns = relevantData
      .reduce((acc, stat) => {
      return acc + parseInt(stat.numRuns, 10);
    }, 0);

    return relevantData.map((stat) => {
      return {
        angle: totalRuns / stat.numRuns,
        label: `${stat.operator.firstName} ${stat.operator.lastName}`,
        numRuns: stat.numRuns,
        trainLineName: stat.trainLineName,
      };
    });
  };

  render() {
    if (!this.props.operatorRunStats || !this.props.operatorRunStats.length) {
      return <em>No operator run stats available for train line {this.props.trainLineId}.</em>
    }

    const data = this.getDataFromStats(
      this.props.operatorRunStats,
      this.props.trainLineId
    );

    return (
      <div className="operator-run-stats">
        {data && data.length &&
          <em>{data[0].trainLineName}: Num runs per operator</em>
        }
        <RadialChart
          data={data}
          getLabel={d => d.numRuns.toString()}
          labelsAboveChildren={true}
          labelsStyle={{fontSize: 12, fill: '#000'}}
          showLabels
          width={300}
          height={300}
          onValueMouseOver={v => {
            this.setState({hoveredCell: v});
          }}
          onValueMouseOut={() => this.setState({hoveredCell: false})}
        />
        {this.state.hoveredCell ?
          <em>Operator: {this.state.hoveredCell.label}</em>
          :
          <em>&nbsp;</em>
        }
      </div>
    );
  }
}