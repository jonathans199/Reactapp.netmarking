import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import config from "../../../services/config";
import PlansPanel from "./UI/PlansPanel";
import Modal from "../UI/Modal/Modal";
import lang from "./../../../services/lang";
import SweetAlert from 'react-bootstrap-sweetalert'

export default class InvestmentPlans extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectView: false,
      invoice: undefined,
      planId: 0,
      showPayment: false,
      plans: [],
      value: 0
    }
  }

  componentWillMount(){
    this.getData()
    let active = JSON.parse(localStorage.getItem('user_data')).active_plan
    // this.setState({ active })

    // var token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiZDc3ODY5ZjEtNDU4Yi00NjAzLTg0MzUtOTc0MTJlZjU0ZWExIiwiZXhwIjoxNTQwMjEwMjQ5fQ.3vj8kPNIzmAqJ4g_arOlv3V3sGBCfKSfzk4s5-n3w8g';

    // var decoded = jwtDecode(token);
    // console.log(decoded);

  }

  getData(){
    fetch(config.defaultURL + "/plans", {
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
    let sweet
    if (this.state.redirectView) return(<div><Redirect to="/dashboard" /></div>)

    if(this.state.active) sweet = (
      <SweetAlert 
        confirmBtnBsStyle="warning"
        title="You already have an active package" 
        onConfirm={() => this.setState({ redirectView: true }) } 
      />
    )

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
          clicked={() => this.refs.child.setPlan(plan.id,plan.price)}
        />
      ) 
    })

    return (
      <DashboardWrapper>
        {sweet}
        <div className="content-header">
          <div className="breadcrumb-wrapper col-12">
            <div className="header-title flexBox">
              <div id="title" >
                <h1>{lang.title2}</h1>
              </div>
              <div id="path" >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Packages</a>
                  </li>
                  <li className="active">{lang.title2}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="panel-body">
                {/* <h4 className="text-center">Packages</h4> */}
                <div className='table-responsive'>

                <table className="table">
                  <thead>
                    <tr>
                      <td className="text-center">NAME</td>
                      <td className="text-center">PRICE</td>
                      <td className="text-center">ROI %</td>
                      <td className="text-center">PAYOUTS</td>
                      <td className="text-center">WITHDRAWALS</td>
                      <td className="text-center"></td>
                    </tr>
                  </thead>
                  <tbody>
                    {plans}
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
