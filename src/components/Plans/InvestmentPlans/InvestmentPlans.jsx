import React, { Component } from "react";
import { Button } from 'reactstrap'

import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import config from "../../../services/config";
import PlansPanel from "./UI/PlansPanel";
import Modal from "../UI/Modal/Modal";
import lang from "./../../../services/lang";

export default class InvestmentPlans extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: undefined,
      planId: 0,
      showPayment: false,
      plans: [],
      value: 0
    }
  }

  componentWillMount(){
    this.getData()
  }

  getData(){
    fetch(config.defaultURL + "/v1/plans", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        this.setState({
          plans: data
        })
      })
    )
  }

  updateCart(evt){
    let total = evt.target.value * 50
    this.setState({
      value: total,
      total_plans: evt.target.value
    })
  }

  render() {
    let plans = this.state.plans.map((plan,index) => {
      let percent = index == 2 ? ("15% ") : ("12% ")
      return(
        <PlansPanel
          key={index}
          promoClass=" plan-1"
          percent={percent + lang.monthly}  
          type={plan.name}
          value={plan.price}
          days={plan.expiration_days}
        />
      ) 
    })

    return (
      <DashboardWrapper>
      <div class="content-header row">
        <div className="content-header">
            <div class="breadcrumb-wrapper col-12">
              <div className="header-title flexBox">
                <div id="title" >
                  <h1 class="">{lang.title2}</h1>
                </div>
                <div id="path" >
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Trading pack</a>
                    </li>
                    <li className="active">{lang.title2}</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>
        <div class="content-header-left col-md-6 col-md-12">
        </div>
        
      </div>
        <div className="row">
          <div className="col-md-6">
            {plans}
          </div>
          <div className="col-md-6">
            <div className="panel panel-bd lobidrag card" >
              <div className="panel-heading">
                <div className="panel-title">
                  <h4>
                    <i className="hvr-buzz-out fa fa-send-o" /> Investment form
                  </h4>
                </div>
              </div>
              <div className="panel-body">
                <form action="">
                  <div className="form-group">
                    <label >How many investment plans you will purchase</label>
                    <input onChange={(evt) => this.updateCart(evt)} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="How many plans do you want to purchase" />
                    <small id="emailHelp" className="form-text text-muted"></small>
                  </div>
                  <div className="form-group">
                    <p>Total: ${this.state.value} USD</p>
                  </div>
                  <div className="form-group">
                    <Button
                      type="button"
                      className="btn btn-danger btn-min-width box-shadow-5 btn-block"
                      color="warning"
                      onClick={() => this.refs.child.setPlan(1,this.state.value,this.state.total_plans)}
                      data-toggle="modal"
                      data-target="#modalInvestmentPlan"
                    >
                      Buy Now
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="panel panel-bd lobidrag card">
              <div className="panel-body text-center">
                  <h4 ><i className="la la-area-chart"/> Investment Rates</h4>
                  <div className="table-responsive text-left" style={{ marginTop: 25}}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>$50 USD TO $10000 USD</th>
                          <th>$10050 USD TO $20000 USD</th>
                          <th>$20050 USD TO $50000 USD</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>3% Daily</td>
                          <td>4% Daily</td>
                          <td>5% Daily</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <Modal 
          modalID="modalInvestmentPlan" 
          ref="child" 
        />
      </DashboardWrapper>
    )
  }
}
