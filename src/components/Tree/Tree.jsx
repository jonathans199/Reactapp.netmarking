import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import DashboardWrapper from "../../containers/DashboardWrapper/DashboardWrapper";
import "./Tree.css";
import config from "../../services/config"
import User from "./User/User"
import lang from "./../../services/lang"

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrices: false,
      tree: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      root: JSON.parse(localStorage.getItem("user_data")).uuid,
      treeArray: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    if(this.state.root) fetch(config.defaultURL + "/trees/user/" + this.state.root, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            matrices: true,
            treeArray: this.generateTreeArray(data.users)
          })
        } else {
          this.setState({
            matrices: false
          })
        }
      })
    )
  }

  generateTreeArray(arry) {
    let total = 15
    arry = arry.map((user) => { 
      return [user.uuid, user.username] 
    })
    if (arry.length < total) {
      Array(total - arry.length).fill().map(()=>{ arry.push([0,0])})
    }
    return arry
  }

  render() {
    let content
    if(this.state.matrices) content = (
      <div className="row">
        <div className="col-md-12">
          <div className="tree">
          <ul className="matrix__align">
              <li className="responsive">
                <User
                  username={this.state.treeArray[0][1]}
                  uuid={this.state.treeArray[0][0]}
                  clicked={e => this.changeMainRoot(e)}
                  placement="top"
                />
                <ul>
                  <li>
                    <User
                      username={this.state.treeArray[1][1]}
                      uuid={this.state.treeArray[1][0]}
                      clicked={e => this.changeMainRoot(e)}
                      placement="left"
                    />
                    <ul>
                      <li>
                        <User
                          username={this.state.treeArray[3][1]}
                          uuid={this.state.treeArray[3][0]}
                          clicked={e => this.changeMainRoot(e)}
                          placement="left"
                        />
                        <ul>
                          <li>
                            <User
                              username={this.state.treeArray[7][1]}
                              uuid={this.state.treeArray[7][0]}
                              clicked={e => this.changeMainRoot(e)}
                              placement="bottom"
                            />
                          </li>
                          <li className="responsive3">
                            <User
                              username={this.state.treeArray[8][1]}
                              uuid={this.state.treeArray[8][0]}
                              clicked={e => this.changeMainRoot(e)}
                              placement="right"
                            />
                          </li>
                        </ul>
                      </li>
                      <li>
                        <User
                          username={this.state.treeArray[4][1]}
                          uuid={this.state.treeArray[4][0]}
                          clicked={e => this.changeMainRoot(e)}
                          placement="bottom"
                        />
                        <ul>
                          <li>
                            <User
                              username={this.state.treeArray[9][1]}
                              uuid={this.state.treeArray[9][0]}
                              clicked={e => this.changeMainRoot(e)}
                              placement="bottom"
                            />
                          </li>
                          <li className="responsive3">
                            <User
                              username={this.state.treeArray[10][1]}
                              uuid={this.state.treeArray[10][0]}
                              clicked={e => this.changeMainRoot(e)}
                              placement="right"
                            />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="responsive2">
                    <User
                      username={this.state.treeArray[2][1]}
                      uuid={this.state.treeArray[2][0]}
                      clicked={e => this.changeMainRoot(e)}
                      placement="right"
                    />
                    <ul>
                      <li>
                        <User
                          username={this.state.treeArray[5][1]}
                          uuid={this.state.treeArray[5][0]}
                          clicked={e => this.changeMainRoot(e)}
                          placement="bottom"
                        />
                        <ul>
                          <li>
                            <User
                              username={this.state.treeArray[11][1]}
                              uuid={this.state.treeArray[11][0]}
                              clicked={e => this.changeMainRoot(e)}
                              placement="bottom"
                            />
                          </li>
                          <li className="responsive3">
                            <User
                              username={this.state.treeArray[12][1]}
                              uuid={this.state.treeArray[12][0]}
                              clicked={e => this.changeMainRoot(e)}
                              placement="right"
                            />
                          </li>
                        </ul>
                      </li>
                      <li className="responsive3">
                        <User
                          username={this.state.treeArray[6][1]}
                          uuid={this.state.treeArray[6][0]}
                          clicked={e => this.changeMainRoot(e)}
                          placement="right"
                        />
                        <ul>
                          <li>
                            <User
                              username={this.state.treeArray[13][1]}
                              uuid={this.state.treeArray[13][0]}
                              clicked={e => this.changeMainRoot(e)}
                              placement="bottom"
                            />
                          </li>
                          <li className="responsive3">
                            <User
                              username={this.state.treeArray[14][1]}
                              uuid={this.state.treeArray[14][0]}
                              clicked={e => this.changeMainRoot(e)}
                              placement="right"
                            />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )

    if(!this.state.matrices) content = (
      <div className="text-center" style={{ height: 400 }}>
        <h1>
          No active matrices
        </h1>
      </div>
    )
    return (
      <DashboardWrapper>
        <ToastContainer />
        <div className="content-header">
          <div className="breadcrumb-wrapper col-12">
            <div className="header-title flexBox">
              <div id="title" >
                <h1 className="">{lang.title3}</h1>
              </div>
              <div id="path" >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Organization</a>
                  </li>
                  <li className="active">{lang.title3}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12" >
            <div
              className="panel panel-bd "
              data-inner-id="VK9TqcVBP2"
              data-index={0}
            >
              <div className="panel-heading ui-sortable-handle">
                <div className="panel-title">
                  <i className="fa fa-sitemap" /> <h4>{lang.title3}</h4>
                </div>
              </div>
              <div className="panel-body">
                {content}
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>
    );
  }
}
export default Tree;