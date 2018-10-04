import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { LineChart, PieChart } from 'react-chartkick';

import config from "../../../services/config";
import lang from "./../../../services/lang";

export default class RewardsChart extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      loaded: false
    }
  }

  componentDidMount(){
    this.getData()
  }

  getData() {
    fetch( config.defaultURL + "/rewards",
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
            data: data,
            loaded: true
          })
        }
      })
    )
  }

  render() {
    let chart = (<div className='text-center'><i className='fa fa-spinner fa-spin'/><br/>Loading</div>)
    if (this.state.loaded) {
      let data = (this.state.data).map((rew, index) => {
        return([[rew.date], rew.value])
      })
      chart = <LineChart  data={data} colors={["#329add"]} /> 
    }

    return (
      <div className="panel panel-bd lobidrag">
        <div className="panel-heading">
          <div className="panel-title">
            <h4>{lang.monthlyProfit}</h4>
          </div>
        </div>
        <div className="panel-body">
          {chart}
        </div>
      </div>
    )
  }
}