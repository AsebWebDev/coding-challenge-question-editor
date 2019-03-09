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
    console.log("handleRadioButtonClick clicked")
    let newQuestion = this.state.question;
    console.log("Vorher: " + newQuestion.rows[rowIndex].col[colIndex])
    newQuestion.rows[rowIndex].col[colIndex] = !newQuestion.rows[rowIndex].col[colIndex];
    console.log("Nachher: " + newQuestion.rows[rowIndex].col[colIndex])

    this.setState({
      question: newQuestion
    })
  };

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
              <th key={i}>{colTitle}</th>
            )}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {this.state.question.rows.map((row, i) => 
            <tr key={i}>
              <td>{row.title}</td>
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