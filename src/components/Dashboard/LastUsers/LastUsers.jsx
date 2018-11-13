import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

import config from "../../../services/config";
import lang from "./../../../services/lang";
import _ from 'lodash'

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
    let flags = ['https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/us.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/co.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/fr.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/ca.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/es.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/ar.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/mx.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/au.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/it.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/be.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/ru.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/br.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/ch.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/cn.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/eg.svg',
      'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/de.svg']
    let users = this.state.users.map((user,index) => {
      let randomFlag = _.sample(flags)
      return( 
        <tr key={index}>
          <td><img src={randomFlag} style={{width:50}} alt=""/></td>
          <td>{user.plan}</td>
          <td>{user.created_at.split("T")[0]}</td>
          <td>{user.created_at.split("T")[1].split("-")[0].split(".")[0]}</td>
        </tr>
      )
    })
    return (
      <div className="card">
        <div className="panel-body">
          <h4 className="text-center">Last plans on the system</h4>
          <div className="table-responsive" style={{ marginTop: 40}} >
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Plan</th>
                  <th>Date</th>
                  <th>Hour</th>
                </tr>
              </thead>
              <tbody>
                {users}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
