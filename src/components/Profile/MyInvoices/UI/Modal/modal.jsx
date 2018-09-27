import React, { Component } from "react";
import { Col, Row, Table, Button, Input } from 'reactstrap'

import config from "../../../../../services/config";
import lang from "../../../../../services/lang";

export default class Modal extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: true,
      step: 1,
      invoice: '',
      title: 'null'
    }
  }

  setInvoice(value) {
    this.setState({ loaded: false })
    fetch(config.defaultURL + "/v1/invoices/" + value, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {  
        this.setState({
          loaded: true,
          title: data.uuid,
          invoice: data
        })
      })
    )
  }

  setStatus(e){
    if (e == "Pending") return (<span className="label label-warning m-r-15">{e}</span>)
    if (e == "Paid") return (<span className="label label-success m-r-15">{e}</span>)
    if (e == "Cancelled") return (<span className="label label-danger m-r-15">{e}</span>)
  }

  render(){
    let invoice = this.state.invoice
    let txid = invoice.txid ? (
      <tr>
        <td>{lang.txid}</td>
        <td>
          <Input 
            className="form-control"
            value={invoice.txid}
            readOnly
          />
          <small>
            <a href={"https://blockchain.info/es/tx/" + invoice.txid} target="_blank">
            Check <i className='fa fa-arrow-right'/>
            </a>
          </small>
        </td>
      </tr>) : (null)
    let  modalContent = (
        <div className='table-responsive'>
          <Table>
            <tbody>
            <tr>
              <td>{lang.plan}</td>
              <td><code>{invoice.plan_id}</code></td>
            </tr>
            <tr>
              <td>{lang.status}</td>
              <td><b>{this.setStatus(invoice.invoice_status_id)}</b></td>
            </tr>
            <tr>
              <td>{lang.cryptoPrice}</td>
              <td>{invoice.price} {invoice.currency_id}</td>
            </tr>
            <tr>
              <td>{lang.fees}</td>
              <td>{invoice.fees} {invoice.currency_id}</td>
            </tr>
            <tr>
              <td>{lang.total}</td>
              <td>{invoice.total} {invoice.currency_id}</td>
            </tr>
            <tr>
              <td>{lang.wallet}</td>
              <td>
                <Input
                value={invoice.wallet}
                className="form-control"
                readOnly
                />
              </td>
            </tr>
            {txid}
            <tr>
              <td>{lang.created}</td>
              <td><samp>{invoice.created_at}</samp></td>
            </tr>
            <tr>
              <td>{lang.updated}</td>
              <td><samp>{invoice.updated_at}</samp></td>
            </tr>
            
            </tbody>
          </Table>
        </div>
      )

    if (!this.state.loaded) { modalContent = (<div className="text-center"><i className='fa fa-spinner fa-spin'/><br/>Loading</div>) }
    return (
      <div
        className="modal fade"
        id={this.props.modalId}
      >
        <div className="modal-dialog modal-lg">
          <div className='modal-content'>
            <div className="modal-header">
              <h4 className="js-title-step text-center">
                <i className="fa fa-paper-plane" aria-hidden="true"></i>{" "} Invoice #{this.state.title}
              </h4>
            </div>
            <div className="modal-body center">
              {modalContent}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary btn-outline " data-dismiss="modal">
                <i className="fa fa-times" /> Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
