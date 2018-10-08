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
    // this.getData()
    this.createWidget()
  }

  createWidget(){

    const script = document.createElement("script");

    script.async = true;

    script.text = 'baseUrl = "https://widgets.cryptocompare.com/";var scripts = document.getElementsByTagName("script");var embedder = scripts[ scripts.length - 1 ];(function (){var appName = encodeURIComponent(window.location.hostname);if(appName==""){appName="local";}var s = document.createElement("script");s.type = "text/javascript";s.async = true;var theUrl = baseUrl+"serve/v3/coin/chart?fsym=BTC&tsyms=USD,EUR,CNY,GBP";s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;;document.getElementById("charts-2").appendChild(s);})();'
    
    document.body.appendChild(script)
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
      <div className="card">
        <div className="panel-body" id="charts-2">
          <h4 className="text-left">Crypto Data</h4>
        </div>
      </div>
    )
  }
}