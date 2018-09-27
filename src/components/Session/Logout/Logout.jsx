import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    window.location.replace("#/login");
  }
  render() {
    return <div className="row" />;
  }
}

export default Logout;
