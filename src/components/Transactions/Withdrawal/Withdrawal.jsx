import React, { Component } from "react";
import styled from "styled-components";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Form, Row, Col, Button } from 'reactstrap'

import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import config from "../../../services/config";
import ltc from "./../../../assets/crypto-icons/icon/ltc.svg";
import btc from "./../../../assets/img/btc.png";
import Aux from "../../../hoc/Aux";
import NotFriday from "../../UI/ErrorViews/NotFriday";
import PendingWithdrawals from "../../UI/ErrorViews/PendingWithdrawals";
import lang from "../../../services/lang";
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
          this.setState({
            errors: data.errors
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
    let content
    let checked

    if (pending) {
      content = <PendingWithdrawals />
    } else {
      const errors  = [...this.state.errors]
      const vault   = this.state.vault
      checked       = this.state.is_checked
      
      let destiny   = !this.state.bonus ? (
          <Aux>
            <div className="form-group col-md-12">
              <label>{lang.destinyWallet}</label>
              <Input
                type="text"
                className="form-control"
                name="wallet"
                onChange={value => this.handleChange(value)}
                defaultValue={this.state.wallet}
              />
            </div>
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
        <div className="content-header">
            <div className="breadcrumb-wrapper col-12">
              <div className="header-title flexBox">
                <div id="title" >
                  <h1 className="">{lang.title7}</h1>
                </div>
                <div id="path" >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Transactions</a>
                    </li>
                    <li className="active">{lang.title7}</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>
          <Row>
            <Col xs="12" sm="4">
              <div className="statistic-box statistic-filled-12">
                <h2>
                  <i className="fa fa-dollar" />
                  <span className="count-number"> {vault.balance_usd}</span>
                </h2>
                <div className="small">{lang.balanceIn} USD</div>
                <div className="sparkline1 text-center" />
              </div>
              <div className="statistic-box statistic-filled-12">
                <h2>
                  <img src={btc} width="10%" />
                  <span className="count-number"> {vault.balance_btc}</span>
                </h2>
                <div className="small">{lang.balanceIn} BTC</div>
                <div className="sparkline1 text-center" />
              </div>
              <div className="statistic-box statistic-filled-12">
                <h2>
                  <img src={ltc} />
                  <span className="count-number"> {vault.balance_ltc}</span>
                </h2>
                <div className="small">{lang.balanceIn} LTC</div>
                <div className="sparkline1 text-center" />
              </div>
            </Col>
            <Col xs="12" sm="8">
              <div className="panel panel-bd lobidrag">
                <div className="panel-heading">
                  <div className="panel-title">
                    <h4>
                      <i className="hvr-buzz-out fa fa-send-o" /> {lang.withdrawForm}
                    </h4>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="form-row">
                    <Col className="form-group" md="12">
                      {errors.length > 0
                        ? errors.map((error, index) => {
                            return (
                              <div key={index}>
                                <code>{error}</code>
                                <br/>
                              </div>
                            )
                          })
                        : null}
                    </Col>
                  </div>
                  <div className="form-row">
                    <Form className="form-group col-md-6">
                      <label>{lang.amountToWithdraw} USD</label>
                      <div className="input-group">
                        <span className="input-group-addon">$</span>
                        <Input
                          name="value"
                          type="text"
                          className="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          onChange={value => this.handleChange(value)}
                          defaultValue={this.state.value}
                        />
                        <span className="input-group-addon">
                          <b>USD</b>
                        </span>
                      </div>
                      <small className="text-muted">
                        {lang.minimumWithdraw} $100 USD
                      </small>
                    </Form>
                    <Form className="form-group col-md-6">
                      <label>{lang.whithdrawType}</label>
                      <select
                        className="form-control form-control-success"
                        name="currency_id"
                        onChange={value => this.handleChange(value)}
                        defaultValue={this.state.currency_id}
                        style={{ border: "1px solid #5cb85c" }}
                      >
                        <option>----</option>
                        <option value="12">BTC</option>
                        <option value="13">LTC</option>
                        <option value="14">{lang.sellBalance}</option>
                      </select>
                    </Form>
                  </div>

                  <div className="form-row">
                    {destiny}
                  </div>

                  <Col md="12">
                    <div className="form-group">
                      <label>{lang.notes}</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="comments"
                        onChange={value => this.handleChange(value)}
                        defaultValue={this.state.wallet}
                      />
                    </div>
                    <div className="">
                      <label className="form-check-label">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          checked={this.state.is_checked}
                          onClick={() => this.toggleChange()}
                        />{" "}
                        {lang.acceptTerms}
                      </label>
                    </div>
                    <Button
                      type="button"
                      className="btn btn-primary pull-right"
                      disabled={!checked}
                      onClick={() => this.createWithdrawal()}
                    >
                      {lang.request}
                    </Button>
                  </Col>
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
    }
    return <DashboardWrapper>{content}</DashboardWrapper>;
  }
}

export default Withdrawal
