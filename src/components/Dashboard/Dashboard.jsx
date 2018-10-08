import React, { Component } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import DashboardWrapper from "../../containers/DashboardWrapper/DashboardWrapper"
import RewardCharts from "./RewardsChart/RewardsChart"
import ReferalLinks from "./ReferalLinks/ReferalLinks"
import LastUsers from "./LastUsers/LastUsers"
import MarketCap from "./MarketCap/MarketCap"
import UserVault from "./UserVault/UserVault"
import config from "./../../services/config"
import lang from "./../../services/lang"

window.Chart      = require("chart.js")
window.Highcharts = require("highcharts")

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
    this.state = {
      windowWidth: initialWidth - 100
    }
  }

  componentDidMount() {
    if (this.props.location.search === "?m=1") {
      toast.success("Welcome " + JSON.parse(localStorage.getItem("user_data")).username, {
        position: toast.POSITION.TOP_RIGHT,
        className:"text-center"
      })
    }
  }

  closeSweet() {
    this.setState({ show: false });
  }

  render() {
    return (
      <DashboardWrapper>
        <ToastContainer />
        <div className="content-header">
          <div className="breadcrumb-wrapper col-12">
            <div className="header-title flexBox">
              <div id="title" >
                <h1 className="">{lang.title1}</h1>
              </div>
              <div id="path" >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a>
                  </li>
                  <li className="active">{lang.title1}</li>
                </ol>
              </div>

            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <ReferalLinks />
          </div>
          <div className="col-sm-12 col-md-8">
            <RewardCharts />
            {/* <MarketCap /> */}
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <UserVault />
            {/* <LastUsers /> */}
          </div>
        </div>
      </DashboardWrapper>
    )
  }
}
