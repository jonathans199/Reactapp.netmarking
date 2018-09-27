import React from "react";
import lang from "./../../../../services/lang";

const plansPanel = props => {
  return (
    <div className="col-md-12">
      <div className={props.promoClass}>
        <div className="promo card">
          <div className="deal">
            {/* <div className="ic">
              <i className="fa fa-dollar" />
            </div> */}
            <h2>{props.type}</h2>
            <div class="rating">
              <i class="la la-star"></i>
              <i class="la la-star"></i>
              <i class="la la-star"></i>
              <i class="la la-star"></i>
              <i class="la la-star-half-o"></i>
            </div>
            <span>Buy your plan today and start getting benefits</span>
          </div>
          <div className="price">
            <span>${props.value}/</span>
            <span className="period">Up to 200% ROI</span>
          </div>
          <ul className="features">
            <li>Monday to friday payouts</li>
            <li>Withdrawals on fridays</li>
            <li><b>Trading time:</b>{" "}<code>Up to 200% ROI</code></li>
            <li>Access to all compensation plans available</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default plansPanel;
