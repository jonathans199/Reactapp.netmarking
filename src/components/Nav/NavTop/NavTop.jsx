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

  componentDidMount(){
    this.verifySession()
    this.checkLangNav()
    this.widgetCreate()
  }

  widgetCreate(){
    const script = document.createElement("script");

    script.async = true;

    script.text = 'baseUrl = "https://widgets.cryptocompare.com/";var scripts = document.getElementsByTagName("script");var embedder = scripts[ scripts.length - 1 ];var cccTheme = {"General":{}};(function (){var appName = encodeURIComponent(window.location.hostname);if(appName==""){appName="local";}var s = document.createElement("script");s.type = "text/javascript";s.async = true;var theUrl = baseUrl+"serve/v3/coin/header?fsyms=BTC,ETH,XMR,LTC&tsyms=USD,EUR,CNY,GBP";s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;document.getElementById("charts-1").appendChild(s);})();'
    document.body.appendChild(script)
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

    return (
      <nav className="navbar navbar-fixed-top">
        <div className="navbar__container">
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
            <a className="navbar-brand" href="/#/dashboard">
              <img
                className="main-logo custom-logo"
                src={logoTop}
              />
            </a>
          </div>
          
          <div className="nav-container navbar__container-widgets">
            <ul className="nav navbar-nav hidden-xs navbar__container-charts">
              <li id="charts-1"></li>
            </ul>
            <ul className="nav navbar-top-links navbar-right navbar__container-links">
              <li className="dropdown">
                <a
                  href=""
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="dropdowm-icon ti-settings"></i>
                </a>
                <ul className="dropdown-menu dropdown-user">
                  <li><Link to="/profile/settings">&nbsp; Hi, {username}</Link></li>
                  <li className="divider" />
                  <li><Link to="/profile/settings"><i className="ti-user"></i>&nbsp; Profile</Link></li>
                  <li className="divider" />
                  <li><Link to="/profile/invoices"><i className="ti-direction-alt"></i>&nbsp; Invoices</Link></li>
                  <li><Link to="/support"><i className="ti-settings"></i>&nbsp; Support</Link></li>
                </ul>
                
              </li>
              <li className="log_out">
                <Link to="/logout">
                  <i className="material-icons">power_settings_new</i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavTop);
