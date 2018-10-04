import React, { Component } from "react";
import styled from "styled-components";
import topLogo from './../../../assets/img/logo.png'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from "react-router-dom";

import config from "../../../services/config";

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      username: "",
      historyPush: "/forgot",
      show: false,
      modalTitle: "",
      loading: false
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  recoverPassword() {
    this.setState({ loading: true })
    fetch(config.defaultURL + "/users/1/pass_recovery", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      },
      body: JSON.stringify({
        username: this.state.username
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          toast.success('New password has been sent to your email', {
            position: toast.POSITION.TOP_RIGHT,
            className:"text-center"
          })
        } else {
          toast.error('Invalid Username', {
            position: toast.POSITION.TOP_RIGHT,
            className:"text-center"
          })
        }
        this.setState({ loading: false })
      })
    );
  }

  closeSweet() {
    this.props.history.push(this.state.historyPush);
    this.setState({ show: false, username: "" });
  }

  render() {
    let errors = [...this.state.errors];
    const ulStyles = {
      listStyle: "none"
    };

    const Header = styled.div`
      width: 250px;
      margin-left: auto;
      margin-right: auto;
    `;

    let button = this.state.loading ? (
      <button
        type="button"
        className="btn button__login btn-block"
        disabled
      >
        Recover Password <i className="fa fa-spinner fa-spin" />
      </button>
    ) : (
      <button
        type="button"
        className="btn button__login btn-block"
        onClick={() => this.recoverPassword()}
      >
        Recover Password
      </button>
    )
    return (
      <div className="login-wrapper custom-back">
        <ToastContainer />
        <div className="container-center">
          <div className="panel custom-panel">
            <div className="panel-heading">
              <Header>
                <img src={topLogo} width="100%" />
              </Header>
            </div>
            <div className="panel-body">
              {errors.length > 0 ? (
                <div className="alert alert-danger alert-login">
                  <ul style={ulStyles}>
                    {errors.map((error, index) => {
                      return <li key={index}>{error}</li>;
                    })}
                  </ul>
                </div>
              ) : null}
              <form>
                <div className="form-group">
                  <input
                    id="username"
                    name="username"
                    placeholder="Please enter your username"
                    type="text"
                    onChange={value => this.handleChange(value)}
                  />
                </div>
                <div>
                  {button}
                  <br/>
                  <p>
                    <Link to="/login" className="text-white">Sign In</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Forgot;
