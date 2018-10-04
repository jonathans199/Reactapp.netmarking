import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";


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
    let planName

    // if (Object.keys(plan).length !== 0) {
    //   switch (plan.plan_id) {
    //     case 1:
    //       colorUserClass = "silver_user";
    //       break;
    //     case 2:
    //       colorUserClass = "gold_user";
    //       break;
    //     case 3:
    //       colorUserClass = "ruby_user";
    //       break;
    //     case 4:
    //       colorUserClass = "sapphire_user";
    //       break;
    //     case 5:
    //       colorUserClass = "emerald_user";
    //       break;
    //     case 6:
    //       colorUserClass = "diamond_user";
    //       break;
    //   }
    //   planName = plan.plan_name + ", " + plan.plan_value;
    // } else {
    //   colorUserClass = "bronze_user";
    //   planName = "No plans";
    // }

    const tooltip = (
      <Tooltip id="tooltip">
        <p>{this.props.leftPoints + " / " + this.props.rightPoints}</p>
        <p>{"Plan: " + planName}</p>
      </Tooltip>
    )

    return (
      <OverlayTrigger 
        placement={this.props.placement}
        overlay={tooltip}
        onClick={this.props.clicked}
        >
        <a
          href="javascript:void(0)"
          className={colorUserClass}
          onClick={this.props.clicked}
          value={this.props.uuid}
        >
          <p className="smallText">
            <strong>{this.props.username}</strong>
          </p>
          <i className={botIconClass} />
        </a>
      </OverlayTrigger>
    );
  }
}

export default User;
