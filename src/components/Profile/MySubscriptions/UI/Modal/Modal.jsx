import React, { Component } from "react";

import config from "../../../../../services/config";
import { Table, Row, Col, Button } from 'reactstrap'
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

  setSubs(value) {
    this.setState({ loaded: false })
    fetch(config.defaultURL + "/subscriptions/" + value, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        this.setState({
          loaded: true,
          title: '#' + data.uuid,
          invoice: data
        })
      })
    )
  }

  setStatus(row){
    let status = row == 'Active' ? ('success') : ('danger')
    return(<span className={"label label-" + status + " m-r-15 text-white"}>{row}</span>)
  }

  render(){
    let subs = this.state.invoice
    let  modalContent = (          
        <div className='table-responsive'>
          <Table>
            <tbody>
            <tr>
              <td>{lang.plan}</td>
              <td>{subs.plan_name}</td>
            </tr>
            <tr>
              <td>{lang.planValue}</td>
              <td>${subs.plan_value} USD</td>
            </tr>
            <tr>
              <td>{lang.status}</td>
              <td>
                {this.setStatus(subs.subscription_status_id)}
              </td>
            </tr>
            <tr>
              <td>{lang.created}</td>
              <td><samp>{subs.created_at}</samp></td>
            </tr>
            </tbody>
          </Table>
        </div>
      )

    if (!this.state.loaded) modalContent = (<div className="text-center"><i className='fa fa-spinner fa-spin'/><br/>Loading</div>)
    return (
      <div
        className="modal fade "
        id={this.props.modalID}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="js-title-step">{this.state.title}</h4>
            </div>
            <div className="modal-body center">
              {modalContent}
            </div>
            <div className="modal-footer">
              <Button className="btn btn-primary btn-outline " data-dismiss="modal">
                <i className="fa fa-times" /> {lang.close}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
