import React, { Component } from "react";

import config from "../../../services/config";
import img1  from './../../../assets/img/skills.svg'

const styles = {
  thisImg: {
    width: '115px'
  },
  
  thisContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
}

class TotalUnilevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      totalUnilevel: 0,
      getUnilevelTotal: 0
    }
  }

  componentDidMount(){
    this.getUnilevelTotal()
  }

  getUnilevelTotal() {
    fetch(config.defaultURL + "/v1/stats/totals/unilevel",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("auth_token")
        }
      }
    ).then(response =>
      response.json().then(data => {
        this.setState({ totalUnilevel: data })
      })
    )
  }


  render() {
    return (
      <div className="panel panel-bd lobidrag">
        <div className="panel-body">
          <div style={styles.thisContainer} className="col-md-4">
            <img src={img1}  alt="" style={styles.thisImg} className="img-responsive"/>
          </div>
          <div className="col-md-8 text-center">
            <h1>${this.state.totalUnilevel} USD</h1>
            <p>Total acumulado por red de referidos</p>
          </div>
        </div>
      </div>
    )
  }
}

export default TotalUnilevel
