import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from "./../../../services/config";
import lang from "./../../../services/lang";

export default class ReferalLinks extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loaded: false,
      right: undefined
    }
  }

  componentDidMount(){
    this.getUser()
  }

  getUser() {
    fetch(config.defaultURL + "/users/show/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            right: data.right
          })
        }
      })
    )
  }

  handleChange(event) {
    let right =  event.target.value
    fetch(config.defaultURL + "/users/update/", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      },
      body: JSON.stringify({
        right: right
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.getUser()
          toast.info("🚀 PIERNA ACTUALIZADA", {
            position: toast.POSITION.TOP_RIGHT,
            className: "text-center"
          })
        }
      })
    )
  }

  handleFocus(event) {
    event.target.select();
  }

  render(){
    let leg = !this.state.right ?  (0) : (1)
    return(
      <div className="panel">
        <div className="panel-body" >
          <div className="form-control-static col-md-12">
            <strong>{lang.linkToRefer}:</strong> 
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-link" />
              </span>
              <input 
                className="form-control" 
                defaultValue={config.defaultDomain + "/#/register?code=" + JSON.parse(localStorage.getItem("user_data")).username} 
                onFocus={this.handleFocus}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}