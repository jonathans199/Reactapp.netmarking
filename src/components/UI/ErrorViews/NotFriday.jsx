import React from "react";
import styled from "styled-components";

const notFriday = props => {
  const Main = styled.i`
    font-size: 320px;
    font-weight: 600;
    @media (max-width: 767px) {
      font-size: 220px;
    }
  `;

  return (
    <div className="middle-box text-center">
      <br />
      <br />
      <div className="row">
        <div className="col-sm-12">
          <div className="error-text2">
            <Main className="fa fa-warning bounce" />
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-sm-12">
          <div className="error-desc2">
            <p>Sorry, but withdrawals are only enabled on Fridays.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default notFriday;
