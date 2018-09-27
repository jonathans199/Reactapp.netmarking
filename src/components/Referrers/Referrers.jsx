import React, { Component } from "react"
import { Treebeard } from 'react-treebeard'

import DashboardWrapper from "../../containers/DashboardWrapper/DashboardWrapper"
import config from "../../services/config"
import lang   from "./../../services/lang"
import TotalUnilevel from './TotalUnilevel/TotalUnilevel'

export default class Referrers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: undefined,
      planId: 0,
      showPayment: false,
      plans: [],
      data: []
    }
    this.onToggle = this.onToggle.bind(this)
  }
  
  onToggle(node, toggled){
    if(this.state.cursor){this.state.cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node })
  }

  componentWillMount(){
    this.getData()
  }

  getData(){
    fetch(config.defaultURL + "/v1/unilevel/tree", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        data = {
          name: data.name,
          toggled: true,
          children: data.children
        }

        this.setState({ data })
      })
    )
  }

  render() {
    const styles = {
      tree: {
        base: {
            listStyle: 'none',
            backgroundColor: 'transparent',
            margin: 0,
            padding: 0,
            color: '#fff',
            fontFamily: '',
            fontSize: '18px'
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 15px',
                display: 'block',
                color:'#000'
            },
            activeLink: {
                background: '#4799f1',
                color: '#fff !important'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                    width: '24px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 14,
                width: 14,
                arrow: {
                    fill: '#9DA5AB',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: '#000'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '28px',
                    verticalAlign: 'middle',
                    color: '#000'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
      }
    }

    return (
      <DashboardWrapper>
        <div className="content-header">
          <div className="header-icon">
            <i className="material-icons">call_split</i>
          </div>
          <div className="header-title">
            <h1>{lang.title9}</h1>
            <small>{lang.subtitle3}</small>
            <ol className="breadcrumb">
              <li>
                <a href="#/market/investment">{lang.account}</a>
              </li>
              <li className="active">{lang.referrers}</li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="panel panel-bd " >
              <div className="panel-heading ui-sortable-handle">
                <div className="panel-title">
                <i className="material-icons">call_split</i>
                  <h4>{lang.title9}</h4>
                </div>
              </div>
              <div className="panel-body">
                <Treebeard
                  data={this.state.data}
                  onToggle={this.onToggle}
                  style={styles}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <TotalUnilevel/>
          </div>
        </div>
      </DashboardWrapper>
    )
  }
}
