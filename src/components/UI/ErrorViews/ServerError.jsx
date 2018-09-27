import React from "react";
import styled from "styled-components";

const serverError = props => {
  const Main = styled.h1`
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
            <Main className="bounce">Off</Main>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="error-desc2">
            <p>Your bot is off. Turn it on and start watching your monitor.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default serverError;
