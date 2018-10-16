import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import DashboardWrapper from "../../containers/DashboardWrapper/DashboardWrapper";
import "./Tree.css";
import config from "../../services/config"
import User from "./User/User"
import lang from "./../../services/lang"
import Matrix from './Matrix/Matrix'

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrices: [],
      matrixID: 0
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    fetch(config.defaultURL + "/trees", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          if(data.length > 0) this.selectMatrix(data[0])
          this.setState({
            matrices: data
          })
        }
      })
    )
  }

  selectMatrix(matrix){
    this.setState({matrixID: matrix.id})
    this.refs.child.setMatrix(matrix)
  }

  render() {
    let content
    let matrices = this.state.matrices.map((matrix,index) => {
      return (
        <li className={this.state.matrixID == matrix.id ? "active" : ""} key={index}>
          <a href="#tab1" data-toggle="tab" onClick={() => this.selectMatrix(matrix)}>
            <i className="la la-puzzle-piece"></i>{" "}
            {matrix.plan} - ${matrix.plan_price} USD
          </a>
        </li>
      )
    })

    if(this.state.matrices.length === 0) matrices = (
      <li className={"active"}  >
        <a href="#tab1" data-toggle="tab" >
          <i className="la la-puzzle-piece"></i>{" "}
          No active matrices
        </a>
      </li>)
    
    return (
      <DashboardWrapper>
        <ToastContainer />
        <div className="content-header">
          <div className="breadcrumb-wrapper col-12">
            <div className="header-title flexBox">
              <div id="title" >
                <h1 className="">{lang.title3}</h1>
              </div>
              <div id="path" >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Organization</a>
                  </li>
                  <li className="active">{lang.title3}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 m-b-20">
            <div className="col-xs-2 col-sm-2 p-0">
              <ul className="nav nav-tabs tabs-left">
                {matrices}
              </ul>
            </div>
            <div className="col-xs-10 col-sm-10 p-0">
              <div className="extract__title">
                MATRICES
              </div>
              
              <div className="tab-content">
                <div className="tab-pane fade in active" id="tab1">
                  <div className="panel">
                    <div className="panel-body" style={{minHeight: 450}}>
                      <Matrix
                        ref="child"
                      />
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
export default Tree