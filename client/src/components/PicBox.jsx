import React, { Component } from "react";

class PicBox extends Component {

constructor(props) {
  super(props)
  this.state = {
    
  }
}

onClick = (nr) => () => {
  // this.setState({
  //   radio: !this.state.radio
  // });
}

render() {
  return (
    <div id="picbox"><img src={this.props.pic} alt=""/></div>
    );
  }
}

export default PicBox;