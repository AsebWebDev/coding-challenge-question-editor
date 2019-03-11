import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PicBox from './PicBox';
import RadioButton from './RadioButton';


class Row extends Component {

constructor(props) {
  super(props)
  this.state = {

  }
}

handleRadioButtonClick = (e, rowIndex, colIndex) => {
  let newQuestion = this.props.question;
  newQuestion.rows[rowIndex].col[colIndex] = !newQuestion.rows[rowIndex].col[colIndex];
  this.setState({ question: newQuestion })
};

render() {
  let {i, row } = this.props;
  return (
      <tr key={i}>
      <td><Link to="#" onClick={e => this.props.handleFileUploadClick(e, i, 'row')}><PicBox pic={row.picture}/></Link></td>
      <td>
        <input className="input-sm" type="text" name={i} value={row.title} onChange={e => this.props.handleChange(e, "row")} /> 
      </td>
      {row.col.map((col, j) => 
        <td key={j}><RadioButton rowIndex={i} colIndex= {j} checked={col} handleRadioButtonClick={this.handleRadioButtonClick}/></td>
      )}
      </tr>
   
    );
  }
}

export default Row;