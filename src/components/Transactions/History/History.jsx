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
            <div className="panel panel-bd lobidrag">
              <div className="panel-heading">
                <div className="panel-title">
                  <h4>
                    <i className="fa fa-money" /> {lang.stats}
                  </h4>
                </div>
              </div>
              <div className="panel-body">
                <div className="col-xs-12 col-sm-12 col-md-12 m-b-20">
                  <ul className="nav nav-tabs">
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
                    <li>
                      <a href="#tab4" data-toggle="tab">
                        <i className="material-icons">store</i> {lang.purchases}
                      </a>
                    </li>
                    <li>
                      <a href="#tab5" data-toggle="tab">
                        <i className="material-icons">send</i> {lang.whitdrew}
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade in active" id="tab1">
                      <div className="panel-body">
                        <p>
                          <strong>
                            {lang.historyText1}
                          </strong>
                        </p>
                        <Investments />
                      </div>
                    </div>
                    <div className="tab-pane fade " id="tab3">
                      <div className="panel-body">
                        <p>
                          <strong>{lang.historyText3}</strong>
                        </p>
                        <Referral />
                      </div>
                    </div>
                    <div className="tab-pane fade " id="tab4">
                      <div className="panel-body">
                        <p>
                          <strong>
                            {lang.historyText4}
                          </strong>
                        </p>
                        <Purchases />
                      </div>
                    </div>
                    <div className="tab-pane fade " id="tab5">
                      <div className="panel-body">
                        <p>
                          <strong>{lang.historyText5}</strong>
                        </p>
                        <Withdrew />
                      </div>
                    </div>
                    <div className="tab-pane fade " id="tab6">
                      <div className="panel-body">
                        <Residual />
                      </div>
                    </div>
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
