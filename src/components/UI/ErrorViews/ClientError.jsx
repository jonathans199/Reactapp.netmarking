import React from "react";

const clientError = props => {
  return (
    <div className="middle-box2">
      <div className="row">
        <div className="col-sm-12">
          <div className="error-text2">
            <h1>404</h1>
            <h3>
              <span>Page</span>
              <br className="hidden-xs" /> Not Found
            </h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="error-desc">
            <p>
              Sorry, but the page you are looking for has note been found. Try
              checking the URL for error, then hit the refresh button on your
              browser or try found something else in our app. Or login again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default clientError;
