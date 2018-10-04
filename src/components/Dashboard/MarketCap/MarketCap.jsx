import React from "react";
import config from "../../../services/config";
import "./custom.css"
import lang from "./../../../services/lang";

export default class MarketCap extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      name: this.props.name,
      loaded: false
    }
  }

  componentDidMount(){
    fetch(config.defaultURL + "/market_cap",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("auth_token")
        }
      }
    )
    .then(response => response.json()
      .then(data => {
        if (response.ok) {
          this.setState({
            marketData: data,
            loaded: true
          })
        } else {
          this.setState({
            loaded: false
          })
        }
      })
    )
  }

  render() {
    let tbody = this.state.loaded ? (
        this.state.marketData.map((data, index) => {
          let image = "https://github.com/cjdowner/cryptocurrency-icons/blob/master/32/icon/" + data.symbol.toLowerCase() + ".png?raw=true"
          let percentClass = data.percent_change_24h < 0 ? ("down") : ("up")
          return(
              <tr key={index}>
                <td>
                  <img className="currency-icon" src={image} /> {data.name}
                </td>
                <td>${data.price_usd} USD</td>
                <td className={percentClass}>{data.percent_change_24h}%</td>
                <td>{data["24h_volume_usd"]} USD</td>
                <td>{data.total_supply}</td>
              </tr>
            )
          }
        )
      ) : (null)
    let tableData = this.state.loaded ? (
        <div className="table-responsive"> 
          <table className="table table-striped table-hover text-left">
            <thead>
              <tr>
                <th>{lang.cryptoCurrency}</th>
                <th>{lang.cryptoPrice}</th>
                <th>{lang.cryptoChange}</th>
                <th>{lang.cryptoVolume}</th>
                <th>{lang.cryptoSuply}</th>
              </tr>
            </thead>
            <tbody>
              {tbody}
            </tbody>
          </table>
        </div>
      ) : (<div className="text-center"><i className="fa fa-spinner fa-spin"/><br/>Loading</div>)

    return (
      <div className="panel panel-bd lobidisable">
        <div className="panel-heading">
          <div className="panel-title">
            <i className="fa fa-btc"></i>
            <h4>{lang.market}</h4>
          </div>
        </div>
        <div className="panel-body">
          <ul className="activity-list list-unstyled">
            {tableData}
          </ul>
        </div>
      </div>
    )
  }
}
