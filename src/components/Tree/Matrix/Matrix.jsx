import React, { Component } from "react";
import User from './../User/User'
import Aux from './../../../hoc/Aux'

class Matrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      tree: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      root: JSON.parse(localStorage.getItem("user_data")).uuid,
      treeArray: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    }
  }

  setMatrix(matrix){
    this.setState({
      treeArray: this.generateTreeArray(matrix.users),
      active: true
    })
  }

  generateTreeArray(arry) {
    let total = 15
    arry = arry.map((user) => {
      return [user.created_at, user.username] 
    })
    if (arry.length < total) {
      Array(total - arry.length).fill().map(()=>{ arry.push(['No User','No User'])})
    }
    return arry
  }

  render() {
    let content = (
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
    )

    if(!this.state.active) content = (
      <h2 className="text-center">
        <i className="la la-arrow-left"></i>
        {" "}
        Select a matrix first
      </h2>
    )
    return (
      <Aux>
        <div className="row">
          <div className="col-md-12">
            <div className="tree">
              {content}
            </div>
          </div>
        </div>
      </Aux>
    )
  }
}

export default Matrix;
