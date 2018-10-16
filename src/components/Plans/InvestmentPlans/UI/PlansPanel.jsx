import React from "react";

const plansPanel = props => {
  return (
    <tr className={props.promoClass}>
      <td className='text-center'>
        <h2>{props.type}</h2>
        <p className="rating">
          <i className="la la-star"></i>
          <i className="la la-star"></i>
          <i className="la la-star"></i>
          <i className="la la-star"></i>
          <i className="la la-star-half-o"></i>
        </p>
      </td>
      <td className=" text-center plan__price">
        ${props.value} USD
      </td>
      <td className="text-center">
        <span className="period">Up to 200%</span>
      </td>
      <td className="text-center">
        <p>Monday to Sunday payouts</p>
      </td>
      <td className="text-center">
        <p><i className="fa fa-clock-o"></i> Every day</p>
      </td>
      <td className="text-center">
        <button 
          onClick={props.clicked}
          data-toggle="modal" 
          data-target="#modalInvestmentPlan" 
          className="btn btn-block btn-danger  "> 
          Buy Now
        </button>
      </td>
    </tr>
  )
}

export default plansPanel
