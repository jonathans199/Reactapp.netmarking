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
    let urlScrapp   = window.location.hash.split("/")

    // parent classes
    let parentDash    = urlScrapp[1]      == "dashboard" ? "active" : "no";
    let parentPack  = urlScrapp[1]      == "packages" ? "active" : "no";
    let parentMatrix  = urlScrapp[1]      == "matrix" ? "active" : "no";
    let parentPay  = urlScrapp[1]   == "pay-outs" ? "active" : "no";
    let parentStatus = urlScrapp[1]      == "status" ? "active" : "no";
    let parentTransfer  = urlScrapp[1]      == "transfers" ? "active" : "no";

    if (urlScrapp[1] == "dashboard?m=1") parentDash = "active"
      
    let content

    if (localUser.active) {
      content = (
        <Aux onResize={() => this.test()}>
          <li className={parentDash}>
            <Link to="/dashboard" className="material-ripple">
              <i className="material-icons">account_balance</i> {lang.myDashboard}
            </Link>
          </li>

          <li className={parentPack}>
            <Link to="/packages" className="material-ripple">
              <i className="material-icons">add_shopping_cart</i> {lang.myMarketplace}
            </Link>
          </li>

          <li className={parentMatrix}>
            <Link to="/matrix">
              <i className="material-icons">blur_on</i> {lang.myBinaryTree}
            </Link>
          </li>
          
          <li className={parentPay}>
            <Link to="/pay-outs">
              <i className="material-icons">timeline</i> Pay outs
            </Link>
          </li>

          <li className={parentStatus}>
            <Link to="/status">
              <i className="material-icons">poll</i> Status
            </Link>
          </li>
          
          <li className={parentTransfer}>
            <Link to="/transfers">
              <i className="material-icons">attach_money</i> Transfer
            </Link>
          </li>

        </Aux>
      )
    } else {
      content = (
        <li className={parentPack}>
          <Link to="/market/investment" className="material-ripple">
            <i className="material-icons">shopping_cart</i> {lang.myProducts}
          </Link>
        </li>
      )
    }

    return (
      <Aux>
        <div className="sidebar net__menu " role="navigation">
          <div className={this.state.classWidth}>
            <ul className="nav" id="side-menu">
              {content}
            </ul>
          </div>
        </div>
      </Aux>
    )
  }
}

export default withRouter(NavLeft)
