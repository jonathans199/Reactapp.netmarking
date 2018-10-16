import React, { Component } from "react";
import styled from "styled-components";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Form, Row, Col, Button } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'

import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import config from "../../../services/config";
import ltc from "./../../../assets/crypto-icons/icon/ltc.svg";
import btc from "./../../../assets/img/btc.png";
import Aux from "../../../hoc/Aux";
import NotFriday from "../../UI/ErrorViews/NotFriday";
import PendingWithdrawals from "../../UI/ErrorViews/PendingWithdrawals";
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
      currency_id: 12,
      is_checked: false,
      date: "",
      show: false,
      message: "",
      errors: [],
      pending: false,
      coupon_username: ""
    }
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

  componentDidMount() {
    this.getVault();
  }

  handleChange(event) {
    if (event.target.value != 14 && event.target.name == "currency_id")this.setState({ bonus:false })
    if (event.target.value == 14 && event.target.name == "currency_id") this.setState({ bonus:true })
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleChange() {
    this.setState(prevState => {
      return { is_checked: !prevState.is_checked };
    });
  }

  createWithdrawal() {
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
          this.setState({
            message: "Withdrawal successfully requested",
            show: true
          })
        } else {
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
    this.setState({
      show: false
    })
    window.location.reload();
  }

  render() {
    const date    = this.state.date;
    const pending = this.state.pending;
    const errors  = [...this.state.errors]
    const vault   = this.state.vault
    let content

    let destiny   = !this.state.bonus ? (
        <Aux>
          <label>To Wallet</label>
          <Input
            type="text"
            className="form-control"
            name="wallet"
            onChange={value => this.handleChange(value)}
            defaultValue={this.state.wallet}
          />
        </Aux>
      ) : (
        <Form className="form-group col-md-12">
          <label><code>Username</code> a quien deseas transladar saldo</label>
          <Input
            type="text"
            className="form-control"
            name="coupon_username"
            onChange={value => this.handleChange(value)}
            defaultValue={this.state.coupon_username}
          />
          <p>Este tipo de retiro tiene un costo de <code>5%</code> E.g: si retiras 100 USD el destinatario recibirá 95 USD</p>
        </Form>
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
                    <Col className="form-group " md="6" xs="12">
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
                      <div  className="form">  
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

                        <select
                          className="form-control form-control-success"
                          name="currency_id"
                          onChange={value => this.handleChange(value)}
                          defaultValue={this.state.currency_id}
                          style={{ border: "1px solid #5cb85c" }}
                        >
                          <option>Crypto to receive</option>
                          <option value="12">BTC</option>
                          <option value="13">LTC</option>
                        </select>

                        {destiny}
                        
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" >
                      <button
                        type="button"
                        className="btn btn-primary pull-right btn-block"
                        onClick={() => this.createWithdrawal()}
                      >
                        REQUEST PAYMENT
                      </button>
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
