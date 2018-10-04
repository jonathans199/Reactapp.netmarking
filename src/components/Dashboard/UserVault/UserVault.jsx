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
      <div className="panel panel-bd lobidisable">
        <div className="panel-body text-right">
          <h2>{lang.availableBalance}</h2>
          <h1 className='text-success makemoneybigger'>{balance}</h1>
        </div>
      </div>
    )
  }
}
