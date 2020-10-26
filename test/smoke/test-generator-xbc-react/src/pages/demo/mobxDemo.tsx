import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("oneStore")
@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
       <h1>birds为:{this.props.oneStore.birds}</h1>
       <h1>birds为:{this.props.oneStore.birdCount}</h1>
        <button onClick={() => {this.props.oneStore.addBird(2)}}>
            增加数字
        </button>
      </div>
    );
  }
}
export default Home;
