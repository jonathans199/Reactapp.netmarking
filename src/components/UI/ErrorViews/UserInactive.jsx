import React from "react";
import DashboardWrapper from "../../../containers/DashboardWrapper/DashboardWrapper";
import userInactiveImage from "./../../../assets/img/userinactive.svg";

const userInactive = props => {
  return (
    <DashboardWrapper>
      <div className="middle-box2 text-center">
        <div className="row">
          <div className="col-sm-12">
            <img
              src={userInactiveImage}
              alt=""
              className="img-responsive center-block"
              width="40%"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="error-desc2">
              <h1> This user is inactive</h1>
              <a href="#/market/investment" className="btn btn-primary">
                {" "}
                <i className="fa fa-arrow-left" /> Invesment{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default userInactive;
