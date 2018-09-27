import React, { Component } from "react";
import styled from "styled-components";
import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";

const userWithoutBot = props => {
  const Main = styled.i`
    font-size: 320px;
    font-weight: 600;
    @media (max-width: 767px) {
      font-size: 220px;
    }
  `;

  return (
    <div className="middle-box2 text-center">
      <div className="row">
        <div className="col-sm-12">
          <div className="error-text2">
            <Main className="material-icons bounce">cancel</Main>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-sm-12">
          <div className="error-desc2">
            <p>
              You have not purchased our bot. We invite you to obtain one and
              continue enjoying our services.{" "}
            </p>
            <a href="#/market/bot" className="btn btn-primary">
              {" "}
              <i className="fa fa-arrow-left" /> Buy a bot!{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default userWithoutBot;
