import React, { Component } from 'react';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody} from 'mdbreact';
import RadioButton from '../RadioButton';
import api from '../../api';

export default class QuestionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: null,
    }
  }

  handleRadioButtonClick = (e, rowIndex, colIndex) => {
    let newQuestion = this.state.question;
    newQuestion.rows[rowIndex].col[colIndex] = !newQuestion.rows[rowIndex].col[colIndex];
    this.setState({
      question: newQuestion
    })
  };

  handleChange = (event, direction) => {  
    let index = event.target.name;
    let newQuestion = this.state.question;
    (direction === "col")  
    ? newQuestion.colTitles[index] = event.target.value
    : newQuestion.rows[index].title = event.target.value;
    this.setState({question: newQuestion});
  }


  render() {
    return this.state.question 
    ? (
      <MDBContainer className="QuestionDetail">
        <h2>{this.state.title}</h2>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>#</th>
              {this.state.question.colTitles.map((colTitle, i) => 
                <th key={i}>
                <input type="text" name={i} value={colTitle} onChange={e => this.handleChange(e, "col")} /> 
                </th>
              )}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {this.state.question.rows.map((row, i) => 
              <tr key={i}>
                <td>
                {/* {row.title} */}
                <input type="text" name={i} value={row.title} onChange={e => this.handleChange(e, "row")} /> 
                </td>
                {row.col.map((col, j) => 
                  <td key={j}><RadioButton rowIndex={i} colIndex= {j} checked={col} handleRadioButtonClick={this.handleRadioButtonClick}/></td>
                )}
              </tr>
            )}
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    )
    :(<div></div>);
  }
  componentDidMount() {
    api.getQuestion(this.props.match.params.questionId)
      .then(question => {
        this.setState({
          question: question,
        })
      })
      .catch(err => console.log(err))
  }
}