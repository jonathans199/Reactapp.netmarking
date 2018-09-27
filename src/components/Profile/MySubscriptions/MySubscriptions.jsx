import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import styled from "styled-components";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import config from "../../../services/config";
import Modal from "./UI/Modal/Modal";
import lang from "../../../services/lang";

class MySubscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
      points: {},
      totalRewards: {
        investment: 0,
        binary: 0,
        ten_first: 0
      },
      progressBarsValues: {
        investment: 0,
        binary: 0,
        ten_first: 0
      }
    }
  }

  componentDidMount() {
    this.getData();
    this.getPoints();
    this.getTotalRewards();
  }

  getData() {
    fetch(config.defaultURL + "/v1/subscriptions", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            subscriptions: data
          });
        }
      })
    );
  }

  getPoints() {
    fetch(config.defaultURL + "/v1/points/show", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            points: data
          });
        }
      })
    );
  }

  getTotalRewards() {
    fetch(config.defaultURL + "/v1/points/total_rewards", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState(
            {
              totalRewards: data
            },
            () => {
              this.assignProgBarPerc();
            }
          );
        }
      })
    );
  }

  assignProgBarPerc() {
    const totalRewards = { ...this.state.totalRewards };
    const maxPayment = this.state.points.max_payment;
    const sum =
      totalRewards.investment + totalRewards.binary + totalRewards.ten_first;
    const partialTotal = sum / maxPayment;
    const partialInvestment = totalRewards.investment / sum;
    const partialBinary = totalRewards.binary / sum;
    const partialTenFirst = totalRewards.ten_first / sum;
    let progressBarsValues = {
      ...this.state.progressBarsValues
    };
    progressBarsValues = {
      investment: partialTotal * partialInvestment * 100,
      binary: partialTotal * partialBinary * 100,
      ten_first: partialTotal * partialTenFirst * 100
    };
    this.setState({ progressBarsValues })
  }

  indexN(cell, row, enumObject, index) {
    return <div>{index + 1}</div>;
  }

  expiration(cell, row) {
    return (
      <div>
        <br/>
        <div className="progress progress-lg">
          <div
            className={
              "progress-bar progress-bar-primary progress-bar-striped active"
            }
            role="progressbar"
            aria-valuenow={row.used_percent}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: row.used_percent + "%" }}
          >
            {row.used_percent}%
          </div>
        </div>
      </div>
    )
  }

  setStatus(cell, row) {
    let status = row.subscription_status_id == "Active" ? "text-success" : "text-danger";
    return <span className={status}>{row.subscription_status_id}</span>;
  }

  showDetails(cell, row) {
    return (
      <a
        onClick={() => this.openModal(row.id)}
        className="custom-click"
        data-toggle="modal"
        data-target="#modalSubs"
      >
        {lang.details}
      </a>
    );
  }

  openModal(id) {
    this.refs.child.setSubs(id);
  }

  valueFormat(cell, row) {
    let string = "$" + row.price + "  USD"
    return <span>{string}</span>;
  }

  render() {
    const Start = styled.div`
      float: left;
    `;
    const Stop = styled.div`
      float: right;
      text-align: right;
    `;
    const Circle = styled.p`
      border: 1px solid #333;
      height: 15px;
      width: 15px;
      margin: 10px;
      background-color: #558b2f;
      -moz-border-radius: 75px;
      -webkit-border-radius: 75px;
    `;
    const tooltip = (
      <Tooltip id="tooltip">
        <p>User max payment</p>
      </Tooltip>
    );
    const points = this.state.points;
    const progressBarsValues = { ...this.state.progressBarsValues };
    const totalRewards = { ...this.state.totalRewards };
    const sumTotalRewards =
      totalRewards.investment + totalRewards.binary + totalRewards.ten_first;
    const maxPayment = this.state.points.max_payment;
    const remaining = maxPayment - sumTotalRewards;
    const investmentTooltip = (
      <Tooltip id="tooltip">
        <p>Total: ${totalRewards.investment}</p>
      </Tooltip>
    );
    const binaryTooltip = (
      <Tooltip id="tooltip">
        <p>Total: ${totalRewards.binary}</p>
      </Tooltip>
    );
    const tenFirstTooltip = (
      <Tooltip id="tooltip">
        <p>Total: ${totalRewards.ten_first}</p>
      </Tooltip>
    );
    const totalTooltip = (
      <Tooltip id="tooltip">
        <p>
          Remaining: ${remaining} ({(remaining / maxPayment * 100).toFixed(1)}%)
        </p>
      </Tooltip>
    );

    return (
      <DashboardWrapper>
       <div className="content-header">
            <div class="breadcrumb-wrapper col-12">
              <div className="header-title flexBox">
                <div id="title" >
                  <h1 class="">{lang.title5}</h1>
                </div>
                <div id="path" >
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Settings</a>
                    </li>
                    <li className="active">{lang.title5}</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>
        <div className="row">
          <div className="panel panel-bd lobidrag">
            <div className="panel-heading">
              <div className="panel-title">
                <h4>{lang.subsList}</h4>
              </div>
            </div>
            <div className="panel-body">
              <BootstrapTable
                data={this.state.subscriptions}
                bordered={true}
                striped={true}
                condensed={true}
                hover={true}
                pagination={true}
              >
                <TableHeaderColumn
                  width="5%"
                  dataField="id"
                  dataFormat={this.indexN}
                  isKey={true}
                  headerAlign="center"
                  dataAlign="center"
                  className="textTable textTableSize"
                >
                  #
                </TableHeaderColumn>
                <TableHeaderColumn
                  width="15%"
                  dataField="plan_name"
                  headerAlign="left"
                  dataAlign="left"
                  className="textTable textTableSize"
                >
                  {lang.planName}
                </TableHeaderColumn>
                <TableHeaderColumn
                  width="10%"
                  dataFormat={(cell, row) => this.valueFormat(cell, row)}
                  dataSort={true}
                  headerAlign="center"
                  dataAlign="center"
                  className="textTable textTableSize"
                >
                  {lang.value}
                </TableHeaderColumn>
                <TableHeaderColumn
                  width="10%"
                  dataFormat={(cell, row) => this.setStatus(cell, row)}
                  dataSort={true}
                  headerAlign="center"
                  dataAlign="center"
                  className="textTable textTableSize"
                >
                  {lang.status}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={(cell, row) => this.showDetails(cell, row)}
                  headerAlign="center"
                  dataAlign="center"
                  width="12%"
                  className="textTable textTableSize"
                />
                <TableHeaderColumn
                  dataFormat={(cell, row) => this.expiration(cell, row)}
                  dataField="expiration"
                  headerAlign="center"
                  dataAlign="center"
                  className="textTable textTableSize"
                >
                  {lang.timeLine}
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
        <Modal modalID="modalSubs" ref="child" />
      </DashboardWrapper>
    );
  }
}

export default MySubscriptions;