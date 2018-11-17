import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import DashboardWrapper from "../../containers/DashboardWrapper/DashboardWrapper";
import config from "../../services/config";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';
// import Modal from './UI/Modal/modal'
import ltc from '../../assets/crypto-icons/icon/ltc.svg'
import btc from '../../assets/crypto-icons/icon/btc.svg'
import usdt from "../../assets/crypto-icons/icon/usdt.svg";
import lang from "../../services/lang";

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
    return(<span>{name}</span>)
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
      status = (<div className='label label-pill label-danger m-r-15'>CANCELED</div>)
    else if (row.invoice_status_code == 12){
      status = (<div className='label label-pill label-success m-r-15'>COMPLETE</div>)
    } else{
      status = (<div className='label label-pill label-warning m-r-15'>AWAITING PAYMENT</div>)
    }
    return status
  }
  
  // showDetails(cell,row){
  //   return(
  //     <a onClick={() => this.openModal(row.id)} className="custom-click" data-toggle="modal"
  //         data-target="#modalInvoice" >{lang.details}</a>
  //   )
  // }
  // openModal(id)
  // {
  //   this.refs.child.setInvoice(id)
  // }
  render() {
    return (
      <DashboardWrapper>
        {/* <div className="content-header">
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
          </div> */}
        <div className="row">
          <div className="card">
            <div className="panel-body">
              <h2 className="text-center">SUPPORT</h2>
              <p className="text-center">For questions or concerns please contact us: </p>
              <h3 className="text-center">netmarketcap2018@gmail.com</h3>


              
            </div>
          </div>
        </div>
        {/* <Modal modalId="Support" ref="child" /> */}
      </DashboardWrapper>
    )
  }
}
