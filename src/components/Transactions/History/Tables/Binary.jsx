import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import config from "../../../../services/config";
import "./../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css";
import lang from "../../../../services/lang";

class Binary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      binary: [],
      options: {
        sizePerPage: 30
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch(config.defaultURL + "/stats/binary", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            binary: data,
            loaded: true
          });
        }
      })
    );
  }
  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  valueFormat(cell, row) {
    return <b>{row.value} USD</b>;
  }
  rewardStatus(cell, row) {
    let classColor =
      row.reward_status_id == "Paid" ? "text-success" : "text-danger";
    return <span className={classColor}>{row.reward_status_id}</span>;
  }
  render() {
    let table = this.state.loaded ? (
      <BootstrapTable
        data={this.state.binary}
        options={this.state.options}
        bordered={true}
        striped={true}
        condensed={true}
        hover={true}
        pagination={true}
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
          #
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
          dataField="reward_type_id"
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
        >
          {lang.type}
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
          dataField="created_at"
          dataSort={true}
          headerAlign="right"
          dataAlign="right"
          className="textTable textTableSize"
        >
          {lang.created}
        </TableHeaderColumn>
      </BootstrapTable>
    ) : (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin" />
        <br/>loading
      </div>
    );
    return (
      <div className="panel">
        <div className="panel-body">{table}</div>
      </div>
    );
  }
}

export default Binary;
