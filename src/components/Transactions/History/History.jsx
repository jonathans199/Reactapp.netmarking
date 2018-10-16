import React, { Component } from "react";

import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import Binary from "./Tables/Binary";
import Withdrew from "./Tables/Withdrew";
import Purchases from "./Tables/Purchases";
import Investments from "./Tables/InvestmentPlans";
import Referral from "./Tables/Referral";
import Residual from './Tables/Residual'
import lang from "../../../services/lang";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_checked: false
    }
  }

  toggleChange() {
    this.setState(prevState => {
      return { is_checked: !prevState.is_checked };
    })
  }

  render() {
    const vault = this.state.vault;
    return (
      <DashboardWrapper>
      <div className="content-header">
            <div className="breadcrumb-wrapper col-12">
              <div className="header-title flexBox">
                <div id="title" >
                  <h1 className="">{lang.title8}</h1>
                </div>
                <div id="path" >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Transactions</a>
                    </li>
                    <li className="active">{lang.title8}</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-xs-12 col-sm-12 col-md-12 m-b-20">
              <div className="col-xs-2 col-sm-2 p-0">
                <ul className="nav nav-tabs tabs-left">
                  <li className="active">
                    <a href="#tab1" data-toggle="tab">
                      <i className="material-icons">account_balance_wallet</i>{" "}
                      {lang.investmentPlans}
                    </a>
                  </li>
                  <li>
                    <a href="#tab3" data-toggle="tab">
                      <i className="material-icons">person</i> {lang.unilevelBonus}
                    </a>
                  </li>
                  <li>
                    <a href="#tab6" data-toggle="tab">
                      <i className="material-icons">people</i> Matrix Bonus
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-xs-10 col-sm-10 p-0">
                <div className="extract__title">
                  STATEMENTS
                </div>
                
                <div className="tab-content">
                  <div className="tab-pane fade in active" id="tab1">
                    <Investments />
                  </div>
                  <div className="tab-pane fade " id="tab3">
                    <Referral />
                  </div>
                  <div className="tab-pane fade " id="tab6">
                    <Residual />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>
    )
  }
}

export default History;
