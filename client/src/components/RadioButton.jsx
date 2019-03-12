import React, { Component } from "react";

class RadioButton extends Component {

constructor(props) {
  super(props)
  this.state = {
    radio: this.props.checked
  }
}

onClick = (nr) => () => {
  this.setState({
    radio: !this.state.radio
  });
}

render() {
  return (
    <input 
    onChange={this.onClick()} 
    onClick={e => this.props.handleRadioButtonClick(e, this.props.rowIndex, this.props.colIndex)} 
    checked={this.props.checked} 
    type="radio" />
    );
  }
}

export default RadioButton;