import React, { Component } from "react";
// import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
// import SweetAlert from "react-bootstrap-sweetalert";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import config from "../../../../services/config";
import "./../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css";
import lang from "../../../../services/lang";

class Referral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      investments: [],
      options: {
        sizePerPage: 30,
        planID: undefined
      },
      counter: 0
    };
  }

  componentDidMount() {
    this.getData(undefined);
  }
  selectInvestment(event) {
    this.getData(event.target.value);
  }
  getData(id) {
    fetch(config.defaultURL + "/stats/referrals", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            rewards: data.rewards,
            counter: data.counter,
            loaded: true
          })
        }
      })
    );
  }
  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }
  rewardStatus(cell, row) {
    let classColor =
      row.reward_status_id == "Paid" ? "text-success" : "text-danger";

    return <span className={classColor}>{row.reward_status_id}</span>;
  }
  valueFormat(cell, row) {
    return <b>{row.value} USD</b>;
  }
  render() {
    let table = this.state.loaded ? (
      <BootstrapTable
        data={this.state.rewards}
        options={this.state.options}
        bordered={false}
        striped={true}
        condensed={true}
        hover={true}
        pagination={true}
        search
      >
        <TableHeaderColumn
          dataField="id"
          dataFormat={this.indexN}
          isKey={true}
          headerAlign="center"
          dataAlign="center"
          width="5%"
          className="textTable textTableSize"
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="created_at"
          headerAlign="center"
          dataAlign="center"
          className="textTable textTableSize"
          dataSort={true}
          
        >
          Date
        </TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={(cell, row) => this.valueFormat(cell, row)}
          dataSort={true}
          headerAlign="center"
          dataAlign="center"
          className="textTable textTableSize"
        >
          {lang.value}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="reward_type_id"
          headerAlign="center"
          dataAlign="center"
          className="textTable textTableSize"
        >
          {lang.type}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="plan_id"
          headerAlign="center"
          dataAlign="center"
          className="textTable textTableSize"
        >
          {lang.planName}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={(cell, row) => this.rewardStatus(cell, row)}
          headerAlign="center"
          dataAlign="center"
          className="textTable textTableSize"
        >
          {lang.status}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="user_refered"
          dataSort={true}
          headerAlign="center"
          dataAlign="center"
          className="textTable textTableSize"
        >
          {lang.referer}
        </TableHeaderColumn>
        
      </BootstrapTable>
    ) : (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin" />
        <br />loading
      </div>
    )

    return (
      <div className="panel">
        <div className="panel-body">
          <div className="form-group row">
          </div>
          {table}
        </div>
      </div>
    );
  }
}

export default Referral;
