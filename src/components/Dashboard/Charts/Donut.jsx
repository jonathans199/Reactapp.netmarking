import React, { Component } from "react";

import config from "../../../services/config";
import lang from "./../../../services/lang";
import {PieChart} from 'react-easy-chart';


export default class LastUsers extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loaded: false,
      left: 0,
      current: 0,
      leftLabel: '',
      currentLabel: ''
    }
  }

  componentDidMount(){
    this.getData()
  }
  
  getData() {
    fetch(config.defaultURL + "/stats/pie",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("auth_token")
        }
      }
    ).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            left: parseFloat(data.left),
            current:  parseFloat(data.current),
            leftLabel: "Left: " + parseFloat(data.left) + "%",
            currentLabel:  "Gain: " + parseFloat(data.current) + "%"
          })
        }
      })
    )
  }

  render() {
    return (
      <div className="card statistic-box statistic-filled-12  bg-hexagons-danger">
        <div className="donut__progress" id="body">
          {/* <h2 className="text-black" style={{position:'absolute'}}>{this.state.current}%</h2> */}
          <div style={{ marginTop: 20}}>
            <PieChart
              size={340}
              labels
              data={[
                { key: this.state.currentLabel, value: 100, color: '#52af52'},
                { key: this.state.leftLabel, value: this.state.left, color: '#badfba'}
              ]}
              styles={{
                '.pie-chart-slice': {
                  stroke: 'none'
                },
                '.chart_text': {
                  fontFamily: 'serif',
                  fontSize: '15px',
                  fill: '#fff'
                }
              }}
            />
            <h3 className="card-title text-center">Account maturation</h3>
          </div>
        </div>
      </div>
    )
  }
}
