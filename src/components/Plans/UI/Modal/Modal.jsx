import React, { Component } from "react"
import QRCode from "qrcode.react"
import { Form, Input, Row, Button } from 'reactstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ltc from './../../../../assets/crypto-icons/icon/ltc.svg'
import btc from './../../../../assets/crypto-icons/icon/btc.svg'
import config from "../../../../services/config"
import './custom.css'
import Aux from './../../../../hoc/Aux'
import Wallet from './../../../Dashboard/UserVault/UserVault'
import lang from "./../../../../services/lang"

const initState = {
  loaded: true,
  step: 1,
  invoice: null,
  title: null,
  repurchaseLoad: false
}

export default class Modal extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: true,
      step: 1,
      invoice: null,
      title: null,
      repurchaseLoad: false,
      total_plans:0
    }
  }

  setPlan(planID,price,total_plans){
    this.setState({
      loaded: true,
      plan_id: planID,
      step: 1,
      price: price,
      invoice: null,
      title: lang.selectPayment,
      total_plans:total_plans
    })
  }

  createInvoice(value) {
    this.setState({ loaded: false, paymentMethod: value })
    fetch(config.defaultURL + "/invoices", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      },
      body: JSON.stringify({
        plan_id: this.state.plan_id,
        currency_id: value,
        total_plans: this.state.total_plans
      })
    }).then(response =>
      response.json().then(data => {
        this.setState({
          invoice: data,
          loaded:true,
          step:2,
          title: 'Send your payment'
        })
      })
    )
  }


  render(){
    let modalContent
    if (this.state.step == 1){
      modalContent = (
        <Row className="col-md-12">
          <div onClick={() => this.createInvoice(12)} className="card bg-light card-body mb-3 col-md-12 col-xs-12 text-center payment-container">
            <img src={btc} className="payment-methods img-responsive center-block" />
            <br/>
            <h4>BITCOIN</h4>
          </div>
          <div onClick={() => this.createInvoice(13)} className="card bg-light card-body mb-3 col-md-12 col-xs-12 text-center payment-container">
            <img src={ltc} className="payment-methods img-responsive center-block" />
            <br/>
            <h4>LITECOIN</h4>
          </div>
        </Row>
      )
    }

    if (this.state.step == 2 && this.state.invoice){ 
      let invoice     = this.state.invoice
      let qrcode      = <QRCode value={invoice.wallet} size={250} />
      let coinSymbol  = this.state.paymentMethod === 13 ? (<img src={ltc} style={{ maxWidth:'16px' }} />) : (<img src={btc} style={{ maxWidth:'16px' }} />)
      let counText    = this.state.paymentMethod === 13 ? ('LTC') : ('BTC')
      modalContent = (
        <Form>
          <div className="form-group center-block text-center">
            <h3>TOTAL TO PAY: {invoice.total} {counText}</h3>
            {qrcode}
          </div>
          <div >
            <small>WALLET</small>
            <Input 
              key={invoice.wallet ? "notLoadedYet" : "loaded"}
              type="text"
              className="form-control text-right unclickeable"  
              value={invoice.wallet}  
              autoFocus
              disabled
              />
          </div>
        </Form>
      )
    }

    if (this.state.step == 3) {
      let button  = <Button className="btn btn-lg btn-success" disabled> {lang.notEnoughBalance} </Button>
        if (this.state.repurchaseLoad) button = <Button className="btn btn-lg btn-success" disabled> {lang.proccesing} <i className="fa fa-spinner fa-spin"/></Button>
      modalContent = (
        <Aux>
          <p>{lang.purchaseModalText1}</p>
          <Wallet
            refs={(balance) => this.setState({ walletBalance: balance })}
            requestBalance={true}
          />
          {button}
        </Aux>
      )
    }

    if (this.state.step == 4) {
      modalContent = (
        <Aux>
          <p>{lang.repurchaseSuccessText}</p>
          <Wallet
            refs={(balance) => this.setState({ walletBalance: balance })}
            ref="balanceChild"
            requestBalance={true}
          />
        </Aux>
      )
    }
    if (!this.state.loaded) modalContent = (<div className="text-center"><i className='fa fa-spinner fa-spin'/><br/>Loading</div>)

    return (
      <div className="modal fade" id={this.props.modalID} >
        <ToastContainer />
        <div className="modal-dialog">
          <div className='modal-content'>
            <div className="modal-body modal__body-content">
              <h4 className="text-center">CRYPTO PAYMENT</h4>
              {modalContent}
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => this.setState(initState)}
                className="btn btn-warning btn-block " 
                data-dismiss="modal"
                >
                <i className="fa fa-exchange" aria-hidden="true"></i> BACK
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
