import React, { Component } from "react";

import config from "../../../services/config";
import img1  from './../../../assets/img/management.svg'

const styles = {
  thisImg: {
    width: '115px'
  },
  
  thisContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
}

class TotalBinary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      totalBinary: 0,
      getUnilevelTotal: 0
    }
  }

  componentDidMount(){
    this.getBinaryTotal()
  }

  getBinaryTotal() {
    fetch(config.defaultURL + "/stats/totals/binary",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("auth_token")
        }
      }
    ).then(response =>
      response.json().then(data => {
        this.setState({ totalBinary: data })
      })
    )
  }

  render() {
    return (
      <div className="col-sm-12 col-md-3">
        <div className="panel panel-bd lobidrag">
          <div className="panel-body">
            <div style={styles.thisContainer} className="col-md-4">
              <img src={img1}  alt="" style={styles.thisImg} className="img-responsive"/>
            </div>
            <div className="col-md-8 text-center">
              <h1>${this.state.totalBinary} USD</h1>
              <p>Total acumulado en red binaria</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TotalBinary
