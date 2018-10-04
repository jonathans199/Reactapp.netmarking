import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import logoTop from './../../../assets/img/netmarketcap-logo-widewht.png'

import "./NavTop.css";

import config from "./../../../services/config";
import ES from "../../../assets/flags/es.svg";
import US from "../../../assets/flags/us.svg";

class NavTop extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount(){
    this.verifySession()
    this.checkLangNav()
  }

  verifySession(){
    fetch(config.defaultURL + "/sessions", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            username: data.username
          })
        } else {
          this.props.history.push("/logout");
        }
      })
    )
  }

  checkLangNav(){
    let current = localStorage.getItem('lang')
    let flag    = current == 'ES' ? (US) : (ES)
    if (current == 'EN') this.setState({ lang: 'ES', flag: flag })
    if (current == 'ES') this.setState({ lang: 'EN', flag: flag })
  }

  updateLang(){
    let current = this.state.lang
    localStorage.setItem('lang', current)
    window.location.reload();
  }

  render() {
    let username = JSON.parse(localStorage.getItem('user_data')).username
    const Logout = styled.span`
      font-size: 14px;
    `;
    const Username = styled.li`
      font-size: 14px;
      font-weight: 600;
      margin-right: 10px;
      @media (max-width: 767px) {
        margin-top: 20px;
        margin-left: 20px;
      }
    `;

    return (
      <nav className="navbar navbar-fixed-top">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <i className="material-icons">apps</i>
          </button>
          <a className="navbar-brand" href="index.html">
            <img
              className="main-logo custom-logo"
              src={logoTop}
            />
          </a>
        </div>
        <div className="nav-container">
          <ul className="nav navbar-nav hidden-xs">
            <li>
              <Link to={"/"} id="fullscreen">
                <i className="material-icons">fullscreen</i>{" "}
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-top-links navbar-right">
            <li className="dropdown">
              <a
                href=""
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="material-icons">person_add</i>
              </a>
              <ul className="dropdown-menu dropdown-user">
                <li><Link to="/profile/settings">&nbsp; Hi, {username}</Link></li>
                <li className="divider" />
                <li><Link to="/profile/settings"><i className="ti-user"></i>&nbsp; Profile</Link></li>
                <li className="divider" />
                <li><Link to="/profile/invoices"><i className="ti-direction-alt"></i>&nbsp; Invoices</Link></li>
              </ul>
              
            </li>
            <li className="log_out">
              <Link to="/logout">
                <i className="material-icons">power_settings_new</i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavTop);
