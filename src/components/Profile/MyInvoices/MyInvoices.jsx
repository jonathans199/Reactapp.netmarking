import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import config from "../../../services/config";
import './../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';
import Modal from './UI/Modal/modal'
import ltc from './../../../assets/crypto-icons/icon/ltc.svg'
import btc from './../../../assets/crypto-icons/icon/btc.svg'
import usdt from "./../../../assets/crypto-icons/icon/usdt.svg";
import lang from "../../../services/lang";

export default class MyInvoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myInvoices: [],
      show: false,
      options: {
        sizePerPage: 30
      }
    }
  }

  componentDidMount() {
    this.getData()
  }

  setCurrency(cell,row){
    let pic  = row.currency_id  == 'BTC' ? (<img src={btc} />) : (<img src={ltc} />)
    let name  = row.currency_id == 'BTC' ? ('BITCOIN') : ('LITECOIN')
      if (row.currency_id == "USD") name  = 'DOLAR'
      if (row.currency_id == "USD") pic   = <img src={usdt} />
    return(<span>{pic} {name}</span>)
  }

  getData() {
    fetch(config.defaultURL + "/invoices", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            myInvoices: data
          })
        }
      })
    );
  }

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  invoiceStatus(cell,row){
    let status
    if (row.invoice_status_code == 13)
      status = (<div className='text-danger'>{row.invoice_status_id}</div>)
    else if (row.invoice_status_code == 12){
      status = (<div className='text-success'>{row.invoice_status_id}</div>)
    } else{
      status = (<div className='text-warning'>{row.invoice_status_id}</div>)
    }
    return status
  }
  
  showDetails(cell,row){
    return(
      <a onClick={() => this.openModal(row.id)} className="custom-click" data-toggle="modal"
          data-target="#modalInvoice" >{lang.details}</a>
    )
  }
  openModal(id)
  {
    this.refs.child.setInvoice(id)
  }
  render() {
    return (
      <DashboardWrapper>
        <div className="content-header">
            <div className="breadcrumb-wrapper col-12">
              <div className="header-title flexBox">
                <div id="title" >
                  <h1 className="">{lang.title6}</h1>
                </div>
                <div id="path" >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Settings</a>
                    </li>
                    <li className="active">{lang.title6}</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>
        <div className="row">
          <div className="panel panel-bd lobidrag">
            <div className="panel-heading">
              <div className="panel-title">
                <h4>{lang.invoicesList}</h4>
              </div>
            </div>
            <div className="panel-body">
              <BootstrapTable
                data={this.state.myInvoices}
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
                  dataSort={true}
                  width="5%"
                  headerAlign="center"
                  dataAlign="center"
                  className="textTable textTableSize"
                >
                  #
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="plan_id"
                  headerAlign="left"
                  dataAlign="left"
                  width="15%"
                  className="textTable textTableSize"
                >
                  {lang.planName}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="total"
                  dataSort={true}
                  headerAlign="center"
                  dataAlign="center"
                  className="textTable textTableSize"
                >
                  {lang.value}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={(cell,row) => this.setCurrency(cell,row)}
                  headerAlign="center"
                  dataAlign="center"
                  className="textTable textTableSize"
                >
                  {lang.currency}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="invoice_status_id"
                  dataFormat={(cell,row) => this.invoiceStatus(cell,row)}
                  dataSort={true}
                  headerAlign="center"
                  dataAlign="center"
                  className="textTable textTableSize"
                >
                  {lang.status}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="created_at"
                  headerAlign="center"
                  dataAlign="center"
                  className="textTable textTableSize"
                >
                  {lang.created}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={(cell,row) => this.showDetails(cell,row)}
                  headerAlign="center"
                  dataAlign="center"
                  className="textTable textTableSize"
                >
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
        <Modal modalId="modalInvoice" ref="child" />
      </DashboardWrapper>
    )
  }
}
