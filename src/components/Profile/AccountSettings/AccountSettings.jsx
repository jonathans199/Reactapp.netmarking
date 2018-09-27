import React, { Component }       from "react";
import { ToastContainer, toast }  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Label } from 'reactstrap'

import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import "./AccountSettings.css";
import config from "../../../services/config";
import lang from "../../../services/lang";
import Img from "./UI/Img";

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
    fetch(config.defaultURL + "/v1/users/show/", {
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
    fetch(config.defaultURL + "/v1/users/update/", {
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
        avatar: this.state.avatarUpdated ? (this.state.imagePreviewUrl) : ('')
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
        }
      })
    );
  }

  updateUserPassword() {
    fetch(config.defaultURL + "/v1/users/update/", {
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
          className="btn btn-primary btn-rounded w-md m-b-5"
          type="button"
          disabled
        >
          Guardar cambios <i className="fa fa-spinner fa-spin" />
        </Button> 
      ) : (
        <Button
          className="btn btn-primary btn-rounded w-md m-b-5"
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
            <div class="breadcrumb-wrapper col-12">
              <div className="header-title flexBox">
                <div id="title" >
                  <h1 class="">{lang.title4}</h1>
                </div>
                <div id="path" >
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Settings</a>
                    </li>
                    <li className="active">{lang.title4}</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>

        <div className="row">
          <div className="panel panel-bd lobidrag">
            <div className="panel-heading">
              <div className="panel-title">
                <h4>{lang.subtitle4}</h4>
              </div>
            </div>
            <div className="panel-body">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label" />
                <div className="col-sm-9">
                  <div className="inbox-avatar">
                    <img
                      src={this.state.imagePreviewUrl}
                      className="img-circle border-bk "
                    />
                    <div className="inbox-avatar-text hidden-xs hidden-sm">
                      <div className="avatar-name">
                        <small>{lang.username}:</small> {this.state.userData.username}
                      </div>
                      <div>
                        <input
                          type="file"
                          className="filestyle"
                          onChange={e => this._handleImageChange(e)}
                          style={{
                            marginLeft: "-16px",
                            position: "absolute",
                            clip: "rect(0px 0px 0px 0px)"
                          }}
                          id="filestyle-0"
                          tabIndex="-1"
                        />
                        <label
                          htmlFor="filestyle-0"
                          className="btn btn-xs  btn-primary "
                        >
                          <i className="fa fa-camera" />
                          <span className="buttonText"> {lang.changeAvatar}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">{lang.linkToRefer}</label>
                <div className="col-sm-9">
                  <p className="form-control-static">
                    <strong>
                      <code>
                        {config.defaultDomain}/#/register?code={
                          this.state.userData.uuid
                        }
                      </code>
                    </strong>
                  </p>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-3 col-form-label">
                  {lang.name}
                </label>
                <div className="col-sm-9">
                  <input
                    key={this.state.userData.name ? "notLoadedYet" : "Loaded"}
                    className="form-control"
                    type="text"
                    id="name"
                    defaultValue={this.state.userData.name}
                    name="name"
                    onChange={value => this.handleChange(value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lastName" className="col-sm-3 col-form-label">
                  {lang.lastName}
                </label>
                <div className="col-sm-9">
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
                <label htmlFor="email" className="col-sm-3 col-form-label">
                  {lang.email}
                </label>
                <div className="col-sm-9">
                  <input
                    key={this.state.userData.email ? "notLoadedYet" : "Loaded"}
                    className="form-control"
                    type="email"
                    id="email"
                    defaultValue={this.state.userData.email}
                    name="email"
                    onChange={value => this.handleChange(value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <Label htmlFor="leg" className="col-sm-3 col-form-label">
                  {lang.activeLeg}
                </Label>
                <div className="col-sm-9">{userLeg}</div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="example-date-input"
                  className="col-sm-3 col-form-label"
                >
                  {lang.affiliated}
                </label>
                <div className="col-sm-9">
                  <p className="form-control-static">
                    <strong>{this.state.userData.created_at}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="panel-footer text-right">
              {button}
            </div>
          </div>

          <div className="panel panel-bd lobidrag">
            <div className="panel-heading">
              <div className="panel-title">
                <h4>{lang.passwordChange}</h4>
              </div>
            </div>
            <div className="panel-body">
              <div className="form-group row">
                <Label htmlFor="password" className="col-sm-3 col-form-label">
                  {lang.newPassword}
                </Label>
                <div className="col-sm-9">
                  <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={value => this.handleChange(value)}
                  />
                  <br/>
                  <input
                    id="password_confirmation"
                    className="form-control"
                    type="password"
                    name="password_confirmation"
                    onChange={value => this.handleChange(value)}
                  />
                  <span className="help-block">{lang.newPasswordConfirm}</span>
                </div>
              </div>
            </div>
            <div className="panel-footer text-right">
              <Button
                className="btn btn-primary btn-rounded w-md m-b-5"
                type="button"
                onClick={() => this.updateUserPassword()}
              >
                {lang.changePassword}
              </Button>
            </div>
          </div>
        </div>
      </DashboardWrapper>
    )
  }
}
