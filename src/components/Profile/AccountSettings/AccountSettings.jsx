import React, { Component }       from "react";
import { ToastContainer, toast }  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Label } from 'reactstrap'

import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import "./AccountSettings.css";
import config from "../../../services/config";
import lang from "../../../services/lang";

export default class AccountSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countryData: [],
      userData: {},
      loading: false
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    fetch(config.defaultURL + "/users/show/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({ 
            imagePreviewUrl: data.avatar.medium,
            userData: data 
          })
        }
      })
    )
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateUserData() {
    this.setState({ loading: true })
    fetch(config.defaultURL + "/users/update/", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      },
      body: JSON.stringify({
        document: this.state.document,
        name: this.state.name,
        last_name: this.state.last_name,
        email: this.state.email,
        right: this.state.right,
        country: this.state.country,
        city: this.state.city,
        address: this.state.address,
        phone: this.state.phone,
        about: this.state.about,
        avatar: this.state.avatarUpdated ? (this.state.imagePreviewUrl) : (''),
        btc_wallet: this.state.btcWallet,
        ltc_wallet: this.state.ltcWallet
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.getUser()
          toast.success("🚀 Profile updated", {
            position: toast.POSITION.TOP_RIGHT,
            className:"text-center"
          })
          this.setState({ loading: false })
          localStorage.setItem('user_data', JSON.stringify(data))
        }
      })
    );
  }

  updateUserPassword() {
    fetch(config.defaultURL + "/users/update/", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      },
      body: JSON.stringify({
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          toast.success("🚀 Password changed", {
            position: toast.POSITION.TOP_RIGHT,
            className:"text-center"
          })
        } else {
          toast.error(data.message[0], {
            position: toast.POSITION.TOP_RIGHT,
            className:"text-center"
          })
        }
      })
    )
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        avatarUpdated: true
      })
    }
    reader.readAsDataURL(file);
  }

  render() {
    let button  = this.state.loading ? (
        <Button
          className="btn btn-primary btn-block w-md m-b-5"
          type="button"
          disabled
        >
          Guardar cambios <i className="fa fa-spinner fa-spin" />
        </Button> 
      ) : (
        <Button
          className="btn btn-primary btn-block w-md m-b-5"
          type="button"
          onClick={() => this.updateUserData()}
        >
          Guardar cambios
        </Button>
      )
    let userLeg = (
      <select
        id="leg"
        className="form-control"
        name="right"
        onChange={value => this.handleChange(value)}
        value={0}
      >
        <option value="1">Right</option>
        <option value="0" >
          Left
        </option>
      </select>
    )

    if (this.state.userData.right) {
      userLeg = (
        <select
          id="leg"
          className="form-control"
          name="right"
          onChange={value => this.handleChange(value)}
        >
          <option value="1" selected>
            Right
          </option>
          <option value="0">Left</option>
        </select>
      );
    }
    
    return (
      <DashboardWrapper>
        <ToastContainer />
        <div className="content-header">
          <div className="breadcrumb-wrapper col-12">
            <div className="header-title flexBox">
              <div id="title" >
                <h1 className="">{lang.title4}</h1>
              </div>
              <div id="path" >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Settings</a>
                  </li>
                  <li className="active">{lang.title4}</li>
                </ol>
              </div>

            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="panel-body">
                <h4 className="text-center">{lang.subtitle4}</h4>
                <div className="form-group row">
                  <label className="col-md-12 ">
                    {lang.name}
                  </label>
                  <div className="col-md-12">
                    <input
                      key={this.state.userData.name ? "notLoadedYet" : "Loaded"}
                      className="form-control "
                      type="text"
                      id="name"
                      defaultValue={this.state.userData.name}
                      name="name"
                      onChange={value => this.handleChange(value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="lastName" className="col-md-12">
                    {lang.lastName}
                  </label>
                  <div className="col-md-12">
                    <input
                      key={
                        this.state.userData.last_name ? "notLoadedYet" : "Loaded"
                      }
                      className="form-control"
                      type="text"
                      id="lastName"
                      defaultValue={this.state.userData.last_name}
                      name="last_name"
                      onChange={value => this.handleChange(value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="email" className="col-md-12">
                    {lang.email}
                  </label>
                  <div className="col-md-12">
                    <input
                      key={this.state.userData.email ? "notLoadedYet" : "Loaded"}
                      className="form-control"
                      type="email"
                      defaultValue={this.state.userData.email}
                      name="email"
                      onChange={value => this.handleChange(value)}
                    />
                  </div>
                </div>
                <hr/>
                <div className="form-group row">
                  <label htmlFor="btcWallet" className="col-md-12">
                    BTC Wallet
                  </label>
                  <div className="col-md-12">
                    <input
                      key={this.state.userData.btc_wallet ? "notLoadedYet" : "Loaded"}
                      className="form-control btc-input"
                      type="btc_wallet"
                      defaultValue={this.state.userData.btc_wallet}
                      name="btcWallet"
                      onChange={value => this.handleChange(value)}
                    />
                  </div>
                </div>
                
                <div className="form-group row">
                  <label htmlFor="ltcWallet" className="col-md-12">
                    LTC Wallet
                  </label>
                  <div className="col-md-12">
                    <input
                      key={this.state.userData.ltc_wallet ? "notLoadedYet" : "Loaded"}
                      className="form-control ltc-input"
                      type="ltc_wallet"
                      defaultValue={this.state.userData.ltc_wallet}
                      name="ltc_wallet"
                      onChange={value => this.handleChange(value)}
                    />
                  </div>
                </div>

              </div>
              <div className="panel-footer text-right">
                {button}
              </div>
            </div>
            </div>
            <div className="col-md-6">
            <div className="card">
              <div className="panel-body">
                <h4 className="text-center">Password Update</h4>
                <div className="form-group row">
                  <Label htmlFor="password" className="col-md-12">
                    {lang.newPassword}
                  </Label>
                  <div className="col-md-12">
                    <input
                      id="password"
                      className="form-control"
                      type="password"
                      name="password"
                      onChange={value => this.handleChange(value)}
                    />
                    <br/>
                  <Label htmlFor="password" className="col-md-12">
                    Password confirmation
                  </Label>
                    <input
                      id="password_confirmation"
                      className="form-control"
                      type="password"
                      name="password_confirmation"
                      onChange={value => this.handleChange(value)}
                    />
                  </div>
                </div>
              </div>
              <div className="panel-footer text-right">
                <Button
                  className="btn btn-primary btn-block w-md m-b-5"
                  type="button"
                  onClick={() => this.updateUserPassword()}
                >
                  {lang.changePassword}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>
    )
  }
}
