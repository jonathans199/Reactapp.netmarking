import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Input } from 'reactstrap'

import config from "../../../../services/config";
import "./../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css";
import ltc from "./../../../../assets/crypto-icons/icon/ltc.svg";
import btc from "./../../../../assets/crypto-icons/icon/btc.svg";
import usdt from "./../../../../assets/crypto-icons/icon/usdt.svg";
import lang from "../../../../services/lang";

class Withdrew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      withdrew: [],
      options: {
        sizePerPage: 30
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch(config.defaultURL + "/stats/withdrew", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            withdrew: data,
            loaded: true
          });
        }
      })
    );
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  setCurrency(cell, row) {
    let pic   = row.currency_id   == "BTC" ? <img src={btc} /> : <img src={ltc} />;
    let name  = row.currency_id   == "BTC" ? "BITCOIN" : "LITECOIN";
      if (row.currency_id == "USD") name  = 'DOLAR'
      if (row.currency_id == "USD") pic   = <img src={usdt} />
    return (
      <span>
        {pic} {name}
      </span>
    );
  }

  setSettle(cell, row) {
    return <strong>{cell}</strong>;
  }

  setStatus(cell, row) {
    let classColor = cell == "Paid" ? "text-success" : "text-warning";
    return <span className={classColor}>{cell}</span>;
  }

  setWallet(cell,row){
    return(<Input value={row.txid} className="form-control" readOnly />)
  }

  render() {
    let table = this.state.loaded ? (
      <BootstrapTable
        data={this.state.withdrew}
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
          dataFormat={(cell, row) => this.setSettle(cell, row)}
          dataField="settle"
          dataSort={true}
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
        >
          {lang.value}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="fees"
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
        >
          {lang.comission}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={(cell, row) => this.setStatus(cell, row)}
          dataField="withdrawal_status_id"
          headerAlign="center"
          dataAlign="center"
          className="textTable textTableSize"
        >
          {lang.status}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={(cell, row) => this.setCurrency(cell, row)}
          headerAlign="center"
          dataAlign="center"
          className="textTable textTableSize"
        >
          {lang.currency}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={(cell,row) => this.setWallet(cell,row)}
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
        >
          {lang.wallet}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="created_at"
          dataSort={true}
          headerAlign="right"
          dataAlign="right"
          className="textTable textTableSize"
        >
          {lang.comission}
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
        <div className="panel-body">{table}</div>
      </div>
    )
  }
}

export default Withdrew;