import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

import config from "../../../services/config";
import lang from "./../../../services/lang";

export default class LastUsers extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loaded: false,
      users: []
    }
  }

  componentDidMount(){
    this.getData()
  }

  getData() {
    fetch(config.defaultURL + "/users",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("auth_token")
        }
      }
    ).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            users: data
          })
        }
      })
    )
  }
  render() {
    let users = this.state.users.map((user,index) => {
      return( 
        <li className="activity-warning" key={index}>
          <small className="text-muted">{lang.ago} {user.created_at}</small>
          <p>{user.username} {lang.registered}</p>
        </li>
      )
    })
    return (
      <div className="panel panel-bd lobidisable">
        <div className="panel-heading">
          <div className="panel-title">
            <i className="ti-stats-up"></i>
            <h4>{lang.lastUsers}</h4>
          </div>
        </div>
        <div className="panel-body">
          <ul className="activity-list list-unstyled">
            {users}
          </ul>
        </div>
      </div>
    )
  }
}
