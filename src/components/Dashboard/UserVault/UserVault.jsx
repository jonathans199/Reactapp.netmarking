import React from 'react';
import config from "../../../services/config";
import lang from "./../../../services/lang";

export default class UserVault extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      loading: false,
      userProfit: 0
    }
  }

  componentDidMount(){
    this.setState({ loading: true })
    this.getData()
  }

  getData(){
    fetch(config.defaultURL + "/vaults/user",
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
          if (this.props.requestBalance) this.props.refs(data.balance_usd)
          this.setState({
            userProfit: data.balance_usd,
            loading: false
          })
        }
      })
    )
  }
  
  render() {
    let balance = '$' + this.state.userProfit + 'USD'
      if (this.state.loading) balance = <i className="fa fa-spinner fa-spin"/>
    return (
      <div className="vault__content">
        <div className="card vault__content-1">
          <div className="panel-body text-left">
            <h3>TRADING TOTAL TIME</h3>
            <h2 className='text-white'>{balance}</h2>
          </div>
        </div>
        
        <div className="card vault__content-2">
          <div className="panel-body text-left">
            <h3>UNILEVEL TOTAL TIME</h3>
            <h2 className='text-white'>{balance}</h2>
          </div>
        </div>

        <div className="card vault__content-3">
          <div className="panel-body text-left">
            <h3>MATRIX TOTAL TIME</h3>
            <h2 className='text-white'>{balance}</h2>
          </div>
        </div>
      </div>
    )
  }
}
