import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import config from "../../../../services/config";
import "./../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css";
import lang from "../../../../services/lang";

class Investments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      investments: [],
      options: {
        sizePerPage: 30,
        planID: undefined
      }
    };
  }

  componentDidMount() {
    this.getData(undefined);
  }

  selectInvestment(event) {
    this.getData(event.target.value);
  }

  getData(id) {
    fetch(config.defaultURL + "/stats/investments?id=" + id, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            rewards: data.rewards,
            investments: data.user_investments,
            loaded: true
          })
        }
      })
    )
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
          headerAlign="left"
          dataAlign="left"
          width="5%"
          className="textTable textTableSize"
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="created_at"
          headerAlign="left"
          dataSort={true}
          dataAlign="left"
          className="textTable textTableSize"
        >
          Date
        </TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={(cell, row) => this.valueFormat(cell, row)}
          dataSort={true}
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
        >
          {lang.value}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="plan_id"
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
        >
          Description
        </TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={(cell, row) => this.rewardStatus(cell, row)}
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
        >
          {lang.status}
        </TableHeaderColumn>
      </BootstrapTable>
    ) : (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin" />
        <br />loading
      </div>
    );
    let investments = this.state.investments.map((investment, index) => {
      return (
        <option key={index} value={investment.id}>
          {investment.plan_id} - ${investment.plan_value} USD
        </option>
      );
    });
    return (
      <div className="panel">
        <div className="panel-body">
          {/* <div className="form-group row">
            <label className="col-lg-6 col-sm-12 col-form-label">
              {lang.investmentPlanFilter}
            </label>
            <div className="col-lg-6 col-md-9 col-sm-12">
              <select
                name="somename"
                className="form-control"
                onChange={event => this.selectInvestment(event)}
              >
                <option>----</option>
                {investments}
              </select>
            </div>
          </div> */}
          {table}
        </div>
      </div>
    );
  }
}

export default Investments;
