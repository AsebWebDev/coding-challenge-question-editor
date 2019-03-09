import React, { Component } from 'react';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody} from 'mdbreact';
import api from '../../api';

export default class QuestionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: null,
    }
  }
  render() {
    return this.state.question 
    ? (
      <MDBContainer className="QuestionDetail">
        <h2>{this.state.question.title}</h2>
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
              <td key={j}>
                {col ? "true" : "false"}
              </td>
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