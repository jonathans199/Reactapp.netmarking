import React from "react";

const plansPanel = props => {
  return (
    <div className="col-md-4 col-sm-12 col-xs-12">
      <div className={props.promoClass}>
        <div className="promo card">
          <div className="deal">
            <h2>{props.type}</h2>
            <div className="rating">
              <i className="la la-star"></i>
              <i className="la la-star"></i>
              <i className="la la-star"></i>
              <i className="la la-star"></i>
              <i className="la la-star-half-o"></i>
            </div>
            <span>Buy your plan today and start getting benefits</span>
          </div>
          <div className="price">
            <span>${props.value}/</span>
            <span className="period">Up to 200% ROI</span>
          </div>
          <ul className="features">
            <li>Monday to Sunday payouts</li>
            <li>Withdrawals on fridays</li>
            <li><b>Package time:</b> DOUBLE</li>
            <li>Access to all compensation plans</li>
          </ul>
          <button 
            onClick={props.clicked}
            data-toggle="modal" 
            data-target="#modalInvestmentPlan" 
            className="btn btn-block button__login"> 
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default plansPanel
