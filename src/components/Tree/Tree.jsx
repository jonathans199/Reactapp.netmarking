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
      tree: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      root: JSON.parse(localStorage.getItem("user_data")).uuid,
      treeArray: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      pointsArray: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      plansArray: [{}, {}, {}, {}, {}, {}, {}],
      botsArray: [false, false, false, false, false, false, false],
      searchValue: "",
      points: { LP: 0, RP: 0 },
      totalBots: { left_bots: 0, right_bots: 0 }
    }
  }

  componentDidMount() {
    this.getData();
    this.getTotalPoints();
  }

  getData() {
    if(this.state.root) fetch(config.defaultURL + "/v1/trees/user/" + this.state.root, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            tree: data
          });
          this.generateTreeArray();
        }
      })
    )
  }

  getTotalPoints() {
    if(this.state.root) fetch(config.defaultURL + "/v1/points/total/" + this.state.root, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            points: data
          });
        }
      })
    );
  }

  generateTreeArray() {
    let treeArray = [];
    treeArray = [
      [this.state.tree[0], this.state.tree[1]],
      [this.state.tree[2], this.state.tree[3]],
      [this.state.tree[4], this.state.tree[5]],
      [this.state.tree[6], this.state.tree[7]],
      [this.state.tree[8], this.state.tree[9]],
      [this.state.tree[10], this.state.tree[11]],
      [this.state.tree[12], this.state.tree[13]]
    ]
    this.setState(
      {
        treeArray
      },
      () => {
        this.getPoints([
          this.state.treeArray[0][0],
          this.state.treeArray[1][0],
          this.state.treeArray[2][0],
          this.state.treeArray[3][0],
          this.state.treeArray[4][0],
          this.state.treeArray[5][0],
          this.state.treeArray[6][0]
        ])
        this.getGreatestPlan([
          this.state.treeArray[0][0],
          this.state.treeArray[1][0],
          this.state.treeArray[2][0],
          this.state.treeArray[3][0],
          this.state.treeArray[4][0],
          this.state.treeArray[5][0],
          this.state.treeArray[6][0]
        ])
      }
    )
  }

  getPoints(array) {
    fetch(config.defaultURL + "/v1/points/user/1", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("auth_token")
      },
      body: JSON.stringify({
        arrays: array
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            pointsArray: data
          })
        }
      })
    )
  }

  getGreatestPlan(array) {
    fetch(config.defaultURL + "/v1/subscriptions/greatest/1", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("auth_token")
      },
      body: JSON.stringify({
        arrays: array
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            plansArray: data
          })
        }
      })
    )
  }

  changeMainRoot(e) {
    e.preventDefault()
    this.setState(
      {
        root: e.target.parentElement.getAttribute("value")
      },
      () => {
        if (this.state.root !== "No User") {
          this.getData()
          this.getTotalPoints()
        }
      }
    )
  }

  refreshParent(e) {
    e.preventDefault();
    fetch(config.defaultURL + "/v1/trees/parent_user/" + this.state.root, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("auth_token")
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState(
            {
              root: data.uuid,
              tree: data.tree_array
            },
            () => {
              this.generateTreeArray();
              this.getTotalPoints();
            }
          );
        }
      })
    );
  }

  refreshMainRoot(e) {
    e.preventDefault();
    this.setState(
      {
        root: JSON.parse(localStorage.getItem("user_data")).uuid
      },
      () => {
        this.getData()
        this.getTotalPoints()
      }
    );
  }

  setSearchValue(event) {
    this.setState({ searchValue: event.target.value });
  }

  refreshSearch() {
    if (this.state.searchValue) {
      this.setState({ loading: true })
      fetch(
        config.defaultURL + "/v1/trees/search_user/" + this.state.searchValue,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth_token")
          }
        } 
      ).then(response =>
        response.json().then(data => {
          if (response.ok) {
            this.setState(
              {
                root: data.uuid,
                tree: data.tree_array,
                loading: false
              },
              () => {
                this.generateTreeArray();
                this.getTotalPoints();
              }
            )
            toast.success("User listed successfully", {
              position: toast.POSITION.TOP_RIGHT,
              className:"text-right"
            })
          } else {
            this.setState({ loading: false})
            toast.error(data.error, {
              position: toast.POSITION.TOP_RIGHT,
              className:"text-right"
            })
          }
        })
      )
    }
  }

  render() {
    let upButton
    let searchButton
    upButton = (
      <button
        type="button"
        className="btn btn-primary w-md m-b-5"
        onClick={e => this.refreshParent(e)}
        >
        {" "}
        <i className="glyphicon glyphicon-arrow-up" /> Up
      </button>
    )
    if (this.state.tree[0] === JSON.parse(localStorage.getItem("user_data"))['username']) {
      upButton = (
        <button
          type="button"
          className="btn btn-primary w-md m-b-5"
          disabled
          >
          {" "}
          <i className="glyphicon glyphicon-arrow-up" /> Up
        </button>
      )
    }

    searchButton = (
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => this.refreshSearch()}
      >
        {" "}
        <i className="fa fa-search" />{" "}
      </button>)

    if (this.state.loading) searchButton = (
      <button
        className="btn btn-primary"
        type="button"
        disabled
      >
        {" "}
        <i className="fa fa-spinner fa-spin" />{" "}
      </button>)

    return (
      <DashboardWrapper>
        <ToastContainer />
        <div className="content-header">
            <div class="breadcrumb-wrapper col-12">
              <div className="header-title flexBox">
                <div id="title" >
                  <h1 class="">{lang.title3}</h1>
                </div>
                <div id="path" >
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Organization</a>
                    </li>
                    <li className="active">{lang.title3}</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>

        <div className="row">
          <div
            className="col-sm-9 col-md-9"
            data-lobipanel-child-inner-id="VK9TqcVBP2"
          >
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
                <div className="row">
                  <div className="col-md-4">
                    <form action="">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={lang.filterUser}
                          onChange={value => this.setSearchValue(value)}
                          onKeyPress={event => {
                            if (event.key === "Enter") {
                              event.preventDefault()
                              this.refreshSearch()
                            }
                          }}
                        />
                        <span className="input-group-btn">
                          {searchButton}
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="tree">
                      <ul className="centro">
                        <li
                          className="responsive"
                          style={{ marginLeft: "30%", height: "470px" }}
                        >
                          <User
                            username={this.state.treeArray[0][0]}
                            uuid={this.state.treeArray[0][1]}
                            leftPoints={this.state.pointsArray[0][0]}
                            rightPoints={this.state.pointsArray[0][1]}
                            plan={this.state.plansArray[0]}
                            bot={this.state.botsArray[0]}
                            clicked={e => this.changeMainRoot(e)}
                            placement="top"
                          />
                          <ul>
                            <li>
                              <User
                                username={this.state.treeArray[1][0]}
                                uuid={this.state.treeArray[1][1]}
                                leftPoints={this.state.pointsArray[1][0]}
                                rightPoints={this.state.pointsArray[1][1]}
                                plan={this.state.plansArray[1]}
                                bot={this.state.botsArray[1]}
                                clicked={e => this.changeMainRoot(e)}
                                placement="left"
                              />
                              <ul>
                                <li>
                                  <User
                                    username={this.state.treeArray[3][0]}
                                    uuid={this.state.treeArray[3][1]}
                                    leftPoints={this.state.pointsArray[3][0]}
                                    rightPoints={this.state.pointsArray[3][1]}
                                    plan={this.state.plansArray[3]}
                                    bot={this.state.botsArray[3]}
                                    clicked={e => this.changeMainRoot(e)}
                                    placement="left"
                                  />
                                </li>
                                <li>
                                  <User
                                    username={this.state.treeArray[4][0]}
                                    uuid={this.state.treeArray[4][1]}
                                    leftPoints={this.state.pointsArray[4][0]}
                                    rightPoints={this.state.pointsArray[4][1]}
                                    plan={this.state.plansArray[4]}
                                    bot={this.state.botsArray[4]}
                                    clicked={e => this.changeMainRoot(e)}
                                    placement="bottom"
                                  />
                                </li>
                              </ul>
                            </li>
                            <li className="responsive2">
                              <User
                                username={this.state.treeArray[2][0]}
                                uuid={this.state.treeArray[2][1]}
                                leftPoints={this.state.pointsArray[2][0]}
                                rightPoints={this.state.pointsArray[2][1]}
                                plan={this.state.plansArray[2]}
                                bot={this.state.botsArray[2]}
                                clicked={e => this.changeMainRoot(e)}
                                placement="right"
                              />
                              <ul>
                                <li>
                                  <User
                                    username={this.state.treeArray[5][0]}
                                    uuid={this.state.treeArray[5][1]}
                                    leftPoints={this.state.pointsArray[5][0]}
                                    rightPoints={this.state.pointsArray[5][1]}
                                    plan={this.state.plansArray[5]}
                                    bot={this.state.botsArray[5]}
                                    clicked={e => this.changeMainRoot(e)}
                                    placement="bottom"
                                  />
                                </li>
                                <li className="responsive3">
                                  <User
                                    username={this.state.treeArray[6][0]}
                                    uuid={this.state.treeArray[6][1]}
                                    leftPoints={this.state.pointsArray[6][0]}
                                    rightPoints={this.state.pointsArray[6][1]}
                                    plan={this.state.plansArray[6]}
                                    bot={this.state.botsArray[6]}
                                    clicked={e => this.changeMainRoot(e)}
                                    placement="right"
                                  />
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-footer text-right">
                {upButton}
                <button
                  type="button"
                  className="btn btn-primary w-md m-b-5 m-l-5"
                  onClick={e => this.refreshMainRoot(e)}
                >
                  {" "}
                  <i className="glyphicon glyphicon-refresh" /> {lang.refresh}
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <div
              className="panel panel-bd custom-border-1"
              data-inner-id="VK9TqcVBP2"
              data-index={0}
            >
              <div className="panel-heading ui-sortable-handle">
                <div className="panel-title">
                  <h4>
                    <i className="hvr-buzz-out fa fa-crosshairs" /> {lang.binaryVolume}
                  </h4>
                </div>
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td className="custom-border-2">
                          <p className="text-center">
                            {lang.leftPoints}: {this.state.points.LP}
                          </p>
                        </td>
                        <td className="custom-border-2">
                          <p className="text-center">
                            {lang.rightPoints}: {this.state.points.RP}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <div
              className="panel panel-bd custom-border-1"
              data-inner-id="VK9TqcVBP2"
              data-index={0}
            >
              <div className="panel-heading ui-sortable-handle">
                <div className="panel-title">
                  <h4>
                    <i className="hvr-buzz-out fa fa-braille" /> {lang.colorCode}
                  </h4>
                </div>
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <table className="table table-condensed text-left">
                    <tbody>
                      <tr>
                        <td>
                          <b>{lang.noPlan}:</b>
                        </td>
                        <td>
                          <p className="full-circle bronze_user-tr" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>{lang.planType1}:</b>
                        </td>
                        <td>
                          <p className="full-circle silver_user-tr" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>{lang.planType2}:</b>
                        </td>
                        <td>
                          <p className="full-circle gold_user-tr" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>{lang.planType3  }:</b>
                        </td>
                        <td>
                          <p className="full-circle ruby_user-tr" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>
    );
  }
}
export default Tree;