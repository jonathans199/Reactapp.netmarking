import React, { Component } from "react";
import styled from "styled-components";
import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import Aux from "../../../hoc/Aux";
import config from "../../../services/config";
import SweetAlert from "react-bootstrap-sweetalert";

class BotProPending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showApisForm: false,
      modalTitle: ""
    };
  }

  componentDidMount() {
    this.verifyKeys();
  }

  verifyKeys() {
    fetch(config.defaultURL + "/botpro/verify_keys", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          if (data.code == 200) {
            this.setState({
              showApisForm: false
            });
          } else {
            this.setState({
              showApisForm: true
            });
          }
        }
      })
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  createUserKeys() {
    fetch(config.defaultURL + "/botpro/create_keys/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      },
      body: JSON.stringify({
        market: this.state.market,
        default_api_key: this.state.default_api_key,
        default_api_secret: this.state.default_secret_key,
        default_trading_key: this.state.trading_api_key,
        default_trading_secret: this.state.trading_secret_key
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState(
            {
              modalTitle: "Api keys saved",
              show: true
            },
            () => {
              this.verifyKeys();
            }
          );
        }
      })
    );
  }

  closeSweet() {
    this.setState({ show: false });
  }

  render() {
    const Main = styled.i`
      font-size: 320px;
      font-weight: 600;
      @media (max-width: 767px) {
        font-size: 220px;
      }
    `;
    let content;
    const showForm = this.state.showApisForm;

    if (showForm) {
      content = (
        <Aux>
          <div className="row">
            <div className="col-sm-12">
              <div className="error-desc2">
                <p>
                  Please send us your api keys to complete your bot activation
                  request.
                </p>
                <div className="panel panel-bd lobidrag">
                  <div className="panel-heading">
                    <div className="panel-title text-left">
                      <h4>Api keys form</h4>
                    </div>
                  </div>
                  <div className="panel-body">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Market</label>
                      <div className="col-sm-9">
                        <select
                          className="form-control"
                          type="text"
                          id="market"
                          name="market"
                          onChange={value => this.handleChange(value)}
                        >
                          <option>-----</option>
                          <option>BITTREX</option>
                          <option>BINANCE</option>
                          <option>POLONIEX</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Default api key
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          type="text"
                          id="default_api_key"
                          name="default_api_key"
                          onChange={value => this.handleChange(value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Default api secret
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          type="text"
                          id="default_secret_key"
                          name="default_secret_key"
                          onChange={value => this.handleChange(value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Trading api key
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          type="text"
                          id="trading_api_key"
                          name="trading_api_key"
                          onChange={value => this.handleChange(value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Trading api secret
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          type="text"
                          id="trading_secret_key"
                          name="trading_secret_key"
                          onChange={value => this.handleChange(value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">
                    <button
                      className="btn btn-primary btn-rounded w-md m-b-5"
                      type="button"
                      onClick={() => this.createUserKeys()}
                    >
                      Save info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Aux>
      );
    } else {
      content = (
        <Aux>
          <div className="row">
            <div className="col-sm-12">
              <div className="error-text2">
                <Main className="material-icons bounce">query_builder</Main>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-sm-12">
              <div className="error-desc2">
                <p>
                  You have a pending request for the activation of your bot. In
                  a short time this request will be answered.
                </p>
                <a href="#/dashboard" className="btn btn-primary">
                  {" "}
                  <i className="fa fa-arrow-left" /> Dashboard!{" "}
                </a>
              </div>
            </div>
          </div>
        </Aux>
      );
    }
    return (
      <div className="middle-box2 text-center">
        {content}
        <SweetAlert
          custom
          showCancel={false}
          showConfirm={true}
          confirmBtnText="OK"
          confirmBtnBsStyle="primary"
          show={this.state.show}
          title={this.state.modalTitle}
          onConfirm={() => this.closeSweet()}
        />
      </div>
    );
  }
}

export default BotProPending;
