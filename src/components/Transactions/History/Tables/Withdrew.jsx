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
        {name}
      </span>
    );
  }

  setSettle(cell, row) {
    return <strong>{cell}</strong>;
  }

  setStatus(cell, row) {
    let status
    if (row.withdrawal_status_id === "Cancelled")
      status = (<div className='label label-pill label-danger m-r-15'>CANCELED</div>)
    else if (row.withdrawal_status_id === "Paid"){
      status = (<div className='label label-pill label-success m-r-15'>COMPLETE</div>)
    } else{
      status = (<div className='label label-pill label-warning m-r-15'>AWAITING PAYMENT</div>)
    }
    return status
  }

  setWallet(cell,row){
    return(<Input value={row.wallet} className="form-control" readOnly />)
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
          hidden
        >
          #
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="created_at"
          dataSort={true}
          headerAlign="left"
          dataAlign="left"
          className="textTable textTableSize"
        >
          Date
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
          dataFormat={(cell, row) => this.setCurrency(cell, row)}
          headerAlign="left"
          dataAlign="left"
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
          dataFormat={(cell, row) => this.setStatus(cell, row)}
          dataField="withdrawal_status_id"
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
    )
    return (
      <div>
        {table}
      </div>
    )
  }
}

export default Withdrew;