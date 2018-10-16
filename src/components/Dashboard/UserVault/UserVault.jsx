import React from 'react';
import config from "../../../services/config";
import lang from "./../../../services/lang";

export default class UserVault extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      loading: false,
      userProfit: 0,
      wallets:{}
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
            wallets: data,
            loading: false
          })
        }
      })
    )
  }
  
  render() {
    let balanceUnilevel = this.state.wallets.total_unilevel
    let balanceMatrix = this.state.wallets.total_matrices
    let balanceTrading = this.state.wallets.total_trading
    let balanceTotal = this.state.wallets.total_rewards
      // if (this.state.loading) balance = <i className="fa fa-spinner fa-spin"/>
    return (
      <div className="vault__content">
        <div className="card vault__content-4">
          <div className="panel-body text-left" style={{ width: '70%' }}>
            <h3>TOTAL EARNINGS</h3>
            <h2 className='text-white'>${balanceTotal} USD</h2>
          </div>
          <div>
            <i className="la la-rocket"></i>
          </div>
        </div>

        <div className="card vault__content-1">
          <div className="panel-body text-left">
            <h3>TRADING TOTAL TIME</h3>
            <h2 className='text-white'>${balanceTrading} USD</h2>
          </div>
        </div>
        
        <div className="card vault__content-2">
          <div className="panel-body text-left">
            <h3>UNILEVEL TOTAL TIME</h3>
            <h2 className='text-white'>${balanceUnilevel} USD</h2>
          </div>
        </div>

        <div className="card vault__content-3">
          <div className="panel-body text-left">
            <h3>MATRIX TOTAL TIME</h3>
            <h2 className='text-white'>${balanceMatrix} USD</h2>
          </div>
        </div>
      </div>
    )
  }
}
