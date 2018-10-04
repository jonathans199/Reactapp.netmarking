import React, { Component } from "react";
// import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
// import SweetAlert from "react-bootstrap-sweetalert";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import config from "../../../../services/config";
import "./../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css";
// import Modal from './UI/Modal/modal.js'
import ltc from "./../../../../assets/crypto-icons/icon/ltc.svg";
import btc from "./../../../../assets/crypto-icons/icon/btc.svg";
import usdt from "./../../../../assets/crypto-icons/icon/usdt.svg";
import lang from "../../../../services/lang";

class Purchases extends Component {
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
    fetch(config.defaultURL + "/stats/purchases", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            purchases: data,
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
    return <b>{row.price} </b>;
  }
  setCurrency(cell, row) {
    let pic = row.currency_id == "BTC" ? <img src={btc} /> : <img src={ltc} />;
    let name = row.currency_id == "BTC" ? "BITCOIN" : "LITECOIN";
      if (row.currency_id == "USD") name  = 'DOLAR'
      if (row.currency_id == "USD") pic   = <img src={usdt} />
    return (
      <span>
        {pic} {name}
      </span>
    );
  }
  txidFormat(cell, row) {
    return <input defaultValue={row.txid} className="form-control"  disabled />;
  }
  walletFormat(cell, row) {
    return <input defaultValue={row.wallet} className="form-control" disabled  />;
  }
  render() {
    let table = this.state.loaded ? (
      <BootstrapTable
        data={this.state.purchases}
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
          width="5%"
          dataAlign="center"
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
          dataField="plan_id"
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
        >
          {lang.planName}
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
          dataFormat={(cell, row) => this.txidFormat(cell, row)}
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
        >
          {lang.txid}
        </TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={(cell, row) => this.walletFormat(cell, row)}
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
          readonly
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
          {lang.created}
        </TableHeaderColumn>  
      </BootstrapTable>
    ) : (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin" />
        <br />loading
      </div>
    );
    return (
      <div className="panel">
        <div className="panel-body">{table}</div>
      </div>
    );
  }
}

export default Purchases;
