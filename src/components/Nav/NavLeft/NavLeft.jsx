import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Aux from "../../../hoc/Aux";
import "./NavLeft.css";
import lang from "../../../services/lang";

class NavLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      classWidth: "sidebar-nav navbar-collapse collapse"
    }
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions)
  }

  updateDimensions() {
    let classWidth
    let reelContainerWidth = window.innerWidth;
    if (reelContainerWidth <= 768) {} 
    if (reelContainerWidth >= 768) {}
  }

  render() {
    const localUser = JSON.parse(localStorage.getItem("user_data"))
    let activeClass = "custom-ul-show nav nav-second-level collapse in"
    let hiddenClass = "custom-ul-hidden"
    let urlScrapp   = window.location.hash.split("/")

    // parent classes
    let parentProfile = urlScrapp[1]      == "profile" ? "active" : "no";
    let parentDash    = urlScrapp[1]      == "dashboard" ? "active" : "no";
    let parentMarket  = urlScrapp[1]      == "market" ? "active" : "no";
    let parentTransactions = urlScrapp[1] == "transactions" ? "active" : "no";
    let parentBinary  = urlScrapp[1]      == "binary" ? "active" : "no";
    let referrerTree  = urlScrapp[1]      == "referrers" ? "active" : "no";

    if (urlScrapp[1] == "dashboard?m=1") parentDash = "active"
      
    // child classes
    let childProfile      = urlScrapp[1]  == "profile" ? activeClass : hiddenClass;
    let childMarket       = urlScrapp[1]  == "market" ? activeClass : hiddenClass;
    let childTransactions = urlScrapp[1]  == "transactions" ? activeClass : hiddenClass;
    let content

    if (localUser.active) {
      content = (
        <Aux onResize={() => this.test()}>
          <li className={parentDash}>
            <Link to="/dashboard" className="material-ripple">
              <i className="la la-television" /> {lang.myDashboard}
            </Link>
          </li>

          <li className={parentMarket}>
            <Link to="/market/investment" className="material-ripple">
              <i className="la la-cubes"></i> {lang.myMarketplace}
            </Link>
          </li>

          <li className={parentBinary}>
            <Link to="/binary">
              <i className="la la-sitemap"></i> {lang.myBinaryTree}
            </Link>
          </li>

          <li className={parentProfile}>
            <Link to="/profile/settings">
              <i className="la la-cog"></i> {lang.myConfiguration}
              <span className="la la-angle-right " />
            </Link>
            <ul className={childProfile}>
              <li className={urlScrapp[2] == "settings" ? "active" : "no"}>
                <Link to="/profile/settings">{lang.myProfile}</Link>
              </li>
              <li className={urlScrapp[2] == "subscriptions" ? "active" : "no"}>
                <Link to="/profile/subscriptions">{lang.myPlans}</Link>
              </li>
              <li className={urlScrapp[2] == "invoices" ? "active" : "no"}>
                <Link to="/profile/invoices">{lang.myInvoices}</Link>
              </li>
            </ul>
          </li>
          
          <li className={parentTransactions}>
            <Link to="/transactions/withdrawal">
              <i className="la la-paste"></i> {lang.myTransactions}
              <span className="la la-angle-right " />
            </Link>
            <ul className={childTransactions}>
              <li className={urlScrapp[2] == "withdrawal" ? "active" : "no"}>
                <Link to="/transactions/withdrawal">{lang.myWithdrew}</Link>
              </li>
              <li className={urlScrapp[2] == "history" ? "active" : "no"}>
                <Link to="/transactions/history">{lang.myHistory}</Link>
              </li>
            </ul>
          </li>
        </Aux>
      )
    } else {
      content = (
        <li className={parentMarket}>
          <Link to="/market/investment" className="material-ripple">
            <i className="material-icons">shopping_cart</i> {lang.myProducts}
          </Link>
        </li>
      )
    }

    return (
      <Aux>
        <div className="sidebar" role="navigation">
          <div className={this.state.classWidth}>
            <ul className="nav" id="side-menu">
              <li className="nav-heading ">
              </li>
              {content}
            </ul>
          </div>
        </div>
        <div className="control-sidebar-bg" />
      </Aux>
    )
  }
}

export default withRouter(NavLeft)
