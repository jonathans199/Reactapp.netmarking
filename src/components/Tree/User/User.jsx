import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import logoMain from './../../../assets/img/inverLogo.png'
import active from './../../../assets/img/logo_icon.png'
import direct from './../../../assets/img/direct.png'


import "./User.css";
import config from "../../../services/config";


class User extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const plan = this.props.plan
    const bot = this.props.bot
    let colorUserClass = "silver_user";
    let botIconClass = "fa fa-user fa-3x";
    let username
    let logo = logoMain
    
    const tooltip = (<Tooltip id="tooltip">CREATED: {(this.props.uuid).split("T")[0]}</Tooltip>)

    // if (username === 'No User') logo = active
    if (this.props.username.split("-").length > 1) {
      username = this.props.username.split("-")[1]
      logo = direct
    } else if(this.props.username.split("-").length === 1 && this.props.username === "No User") {
      logo = logoMain
      username = this.props.username.split("-")[0]
    } else {
      logo = active
      username = ''
      if(this.props.username.split("-")[0] === JSON.parse(localStorage.getItem('user_data'))['username']) username = this.props.username.split("-")[0]
    }

    return (
      <OverlayTrigger 
        placement={this.props.placement}
        overlay={tooltip}
        >
        <a
          href="javascript:void(0)"
          value={this.props.uuid}
        >
          <img className="icon-logo" src={logo} alt=""/>
          <p className="smallText tree__container">
            {username}
          </p>
        </a>
      </OverlayTrigger>
    );
  }
}

export default User;
