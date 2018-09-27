import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { Button } from 'reactstrap'
import logoTop from './../../../assets/img/Logo-tradingWaves_white.png'

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
    fetch(config.defaultURL + "/v1/users/verify_session", {
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
              <button onClick={() => this.updateLang()} style={{marginTop:24, marginLeft: 20}}>
                {/* {this.state.lang} */}
                <img src={this.state.flag} className='img-responsive' style={{width:25}} />
              </button>
            </li>
          </ul>
          <ul className="nav navbar-top-links navbar-right">
            <span>
              Hello,{" "} 
            </span>
            <Username>
              {this.state.username} <i className="fa fa-user-circle-o" />
            </Username>
            <li className="log_out">
              <Link to="/logout" style={{ paddingBottom: 25}}>
                <Logout>
                  <i className="fa fa-sign-out" /> Logout
                </Logout>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavTop);
