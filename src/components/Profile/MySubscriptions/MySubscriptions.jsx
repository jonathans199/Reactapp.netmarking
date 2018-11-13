import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

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
  }

  getData() {
    fetch(config.defaultURL + "/subscriptions", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            subscriptions: data
          })
        }
      })
    );
  }

  indexN(cell, row, enumObject, index) {
    return <div>{index + 1}</div>;
  }

  expiration(cell, row) {
    let current =  row.used_percent.toFixed(3)
    return (
      <div>
        <br/>
        <div className="progress progress-lg">
          <div
            className={
              "progress-bar progress-bar-primary progress-bar-striped active"
            }
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: current + "%" }}
          >
            {current}%
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
    let string = "$" + row.plan_value + "  USD"
    return <span>{string}</span>;
  }

  render() {
    return (
      <DashboardWrapper>
       <div className="content-header">
          <div className="breadcrumb-wrapper col-12">
            <div className="header-title flexBox">
              <div id="title" >
                <h1 className="">My Packages</h1>
              </div>
              <div id="path" >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Settings</a>
                  </li>
                  <li className="active">{lang.title5}</li>
                </ol>
              </div>

            </div>
          </div>
        </div>
        <div className="row col-md-12">
          <div className="card">
            <div className="panel-heading">
              <div className="panel-title">
                <h4>{lang.subsList}</h4>
              </div>
            </div>
            <div className="panel-body">
              <BootstrapTable
                data={this.state.subscriptions}
                bordered={false}
                striped={true}
                condensed={true}
                hover={true}
                pagination={true}
                search
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