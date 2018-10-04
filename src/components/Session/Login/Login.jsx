import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import topLogo from './../../../assets/img/logo.png'
import config from "../../../services/config"
import { ToastContainer, toast } from 'react-toastify'

import './custom.css'

const asyncLocalStorage = {
  setItem: function(key, value) {
    return Promise.resolve().then(function() {
      localStorage.setItem(key, value);
    })
  },
  getItem: function(key) {
    return Promise.resolve().then(function() {
      return localStorage.getItem(key);
    })
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      loading: false
    };
  }

  componentDidMount() {
    const auth = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("user_data"));
    if (auth && user.active) {
      this.props.history.push("/dashboard");
    } else if (auth) {
      this.props.history.push("/packages");
    }
  }

  submitForm() {
    this.setState({
      loading: true
    })
    fetch(config.defaultURL + "/sessions", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          asyncLocalStorage
            .setItem("auth_token", data["auth_token"])
            .then(() => {
              asyncLocalStorage.setItem(
                "user_data",
                JSON.stringify(data["user"])
              );
            })
            .then(() => {
              const user = JSON.parse(localStorage.getItem("user_data"));
              if (user.active) {
                this.props.history.push("/dashboard?m=1");
              } else {
                this.props.history.push("/packages?m=1");
              }
            });
        } else if (response.status === 401) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
            className:"text-center"
          })
          this.setState({
            loading: false
          })
        }
      })
    )
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    let button = this.state.loading ? (
      <a className="btn button__login  btn-block" disabled>
        Log In <i className="fa fa-spinner fa-spin" />
      </a>
    ) : (
      <a
        className="btn button__login  btn-block"
        onClick={() => this.submitForm()}
      >
        Log In
      </a>
    )
    let errors = this.state.errors.length > 0 ? (
        <div className="text-center">
          <code>{this.state.errors}</code>
          <br/>
          <br/>
        </div>
      ) : (null)

    const Header = styled.div`
      width: 250px;
      margin-left: auto;
      margin-right: auto;
    `;
    return <div className="login-wrapper custom-back">
        <ToastContainer />
        <div className="container-center">
          <div className="panel custom-panel">
            <div className="panel-heading text-center">
              <Header>
                <img src={topLogo} width="100%" />
              </Header>
            </div>
            <div className="panel-body">
              <form id="loginForm"  noValidate>
                {errors}
                <div className="form-group">
                    <input autoComplete="nope"  id="username" type="text"  name="username" placeholder="Username" onChange={value => this.handleChange(value)} />
                </div>
                <div className="form-group">

                    <input autoComplete="nope" id="pass" type="password"  name="password" placeholder="Password" onChange={value => this.handleChange(value)} />
                </div>
                <div>
                  <div className="checkbox checkbox-btk text-white">
                    <input id="checkbox3" type="checkbox" />
                    <label htmlFor="checkbox3">Remember me</label>
                  </div>
                  {button}
                  <br/>
                  <p>
                    <Link to="/forgot" className="text-white">Forgot Password</Link>
                  </p>
                  <p>
                    <Link to="/register" className="text-white"> Register</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Login;
