import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Row, Col } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import config from "../../../services/config";
import Aux from "../../../hoc/Aux";
import lang from "../../../services/lang";
import Transactions from './../History/Tables/Withdrew';
import "./styles.css"

class Withdrawal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vault: {
        balance_btc: 0,
        balance_ltc: 0,
        balance_usd: 0
      },
      value: 0,
      wallet: "",
      comment: "",
      currency_id: null,
      is_checked: false,
      date: "",
      show: false,
      message: "",
      errors: [],
      pending: false,
      coupon_username: ""
    }
  }

  componentWillMount() {
    this.getVault()
    this.parseWallet(null)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  parseWallet(event){
    let selectedWallet
    let currencyID
    let ltcWallet = JSON.parse(localStorage.getItem('user_data'))['ltc_wallet']
    let btcWallet = JSON.parse(localStorage.getItem('user_data'))['btc_wallet']
    
    if (!event) selectedWallet = btcWallet
    if(event && event.target.value === "12") {
      selectedWallet = btcWallet
      currencyID = "12"
    }
    if(event && event.target.value === "13") {
      selectedWallet = ltcWallet
      currencyID = "13"
    }

    this.setState({wallet: selectedWallet, currency_id: currencyID})
  }
  
  createWithdrawal() {
    this.setState({loading:true})
    fetch(config.defaultURL + "/withdrawals/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("auth_token")
      },
      body: JSON.stringify({
        withdrawal_type_id: 11,
        value: this.state.value,
        currency_id: this.state.currency_id,
        wallet: this.state.wallet,
        comments: this.state.comments,
        coupon_username: this.state.coupon_username
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({loading:false})
          this.setState({
            message: "Withdrawal successfully requested",
            show: true
          })
        } else {
          this.setState({loading:false})
          data.errors.map((m) => {
            toast.error(m, {
              position: toast.POSITION.TOP_RIGHT,
              className:"text-center"
            })
          })
        }
      })
    );
  }

  closeSweet() {
    this.setState({show: false})
    window.location.reload()
  }

  getVault() {
    fetch(config.defaultURL + "/vaults/user", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            vault: data
          })
        }
      })
    )
  }

  render() {
    let button
    let content
    const date    = this.state.date;
    const pending = this.state.pending;
    const errors  = [...this.state.errors]
    const vault   = this.state.vault

    if(this.state.loading) button = (
      <button
        type="button"
        className="btn btn-primary pull-right btn-block"
        disabled
      >
        LOADING <i className="fa fa-spinner fa-spin"/>
      </button>
    )
    
    if(!this.state.loading) button = (
      <button
        type="button"
        className="btn btn-primary pull-right btn-block"
        onClick={() => this.createWithdrawal()}
      >
        REQUEST PAYMENT
      </button>
    )

    if(!this.state.currency_id) button = (
      <button
        type="button"
        className="btn btn-primary pull-right btn-block"
        disabled
      >
        REQUEST PAYMENT
      </button>
    )

    let destiny   = (
        <Aux>
          <label>To Wallet <small><Link to="/profile/settings"> (EDIT WALLETS) </Link></small></label>
          <Input
            type="text"
            className="form-control"
            name="wallet"
            readOnly
            value={this.state.wallet}
          />
          
        </Aux>
      )

      content = (
        <Aux>
          <ToastContainer />
          <div className="content-header">
            <div className="breadcrumb-wrapper col-12">
              <div className="header-title flexBox">
                <div id="title" >
                  <h1 className="">Payment Request</h1>
                </div>
                <div id="path" >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Transfers</a>
                    </li>
                    <li className="active">Payment Request</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          
          <Row>
            <Col xs="12" sm="12">
              <div className="card">
                <div className="panel-body">
                  <h4 className="text-center">
                    {lang.withdrawForm}
                  </h4>
                  <Row className="withdrawal__container">
                    <Col md="6" xs="12">
                      <div  className="wallet">
                        <div className="card vault__content-4">
                          <div className="panel-body text-left" style={{ width: '70%' }} >
                            <h3>Available balance</h3>
                            <h2 className='text-white'>${vault.balance_usd} USD</h2>
                          </div>
                          <div>
                            <i className="la la-suitcase"></i>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md="6" xs="12" >
                      <Row>
                        <Col md="6">
                          <label>Amount to request USD</label>
                          <Input
                            name="value"
                            type="text"
                            className="form-control"
                            aria-label="Amount (to the nearest dollar)"
                            onChange={value => this.handleChange(value)}
                            defaultValue={this.state.value}
                          />

                          <small className="text-muted">
                            {lang.minimumWithdraw} $50 USD
                          </small>
                        </Col>

                        <Col md="6">
                          <label>Crypto to Receive</label>
                          <select
                            className="form-control form-control-success"
                            name="currency_id"
                            onChange={value => this.parseWallet(value)}
                            defaultValue={this.state.currency_id}
                            style={{ border: "1px solid #5cb85c" }}
                          >
                            <option value="0">---</option>
                            <option value="12">BTC</option>
                            <option value="13">LTC</option>
                          </select>
                        </Col>

                        <Col md="12">
                          {destiny}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" >
                      {button}
                    </Col>
                  </Row>

                  <Row style={{ marginTop: 30}}>
                    <Col md="12">
                      <h4 className="text-center">Past payments</h4>
                      <Transactions/>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <SweetAlert
            show={this.state.show}
            title={this.state.message}
            onConfirm={() => this.closeSweet()}
          />
      </Aux>
    )

    return <DashboardWrapper>{content}</DashboardWrapper>;
  }
}

export default Withdrawal
