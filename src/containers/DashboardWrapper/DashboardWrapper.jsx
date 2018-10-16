import React from "react";
import NavTop from "../../components/Nav/NavTop/NavTop";
import NavLeft from "../../components/Nav/NavLeft/NavLeft";

const dashboardWrapper = props => {
  return (
    <div>
      <NavTop />
      <NavLeft />
      <div id="page-wrapper">
        <div className="content">
          <div className="main_content">{props.children}</div>
        </div>
        
      </div>
      <footer className="footer">
        © 2018 Backoffice Pro by NetMarketCap
      </footer>
    </div>
  );
};

export default dashboardWrapper;
