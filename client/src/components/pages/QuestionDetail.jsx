import React, { Component } from 'react';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn} from 'mdbreact';
import RadioButton from '../RadioButton';
import api from '../../api';

export default class QuestionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: null,
      message: null
    }
  }

  handleRadioButtonClick = (e, rowIndex, colIndex) => {
    let newQuestion = this.state.question;
    newQuestion.rows[rowIndex].col[colIndex] = !newQuestion.rows[rowIndex].col[colIndex];
    this.setState({
      question: newQuestion
    })
  };

  handleChange = (event, key) => {  
    let index = event.target.name;
    let newQuestion = this.state.question;
    (key === "title")
    ? newQuestion.title = event.target.value
    :(key === "col")  
      ? newQuestion.colTitles[index] = event.target.value
      : newQuestion.rows[index].title = event.target.value;
    this.setState({question: newQuestion});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    api.editQuestion(this.props.match.params.questionId, this.state.question)
      .then(data => {
				console.log('TCL: QuestionDetail -> handleSubmit -> data', data)
        
        this.setState({
          question: data.question,
          message: data.success
        })

        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 3000);
      })
      .catch(err => console.log(err))
  }

  render() {
    return this.state.question 
    ? (
      <MDBContainer className="QuestionDetail">
        <form onSubmit={e => this.handleSubmit(e)}>
          {/* <h2>{this.state.title}</h2> */}
          <input className="input-lg" type="text" name="title" value={this.state.question.title} onChange={e => this.handleChange(e, "title")} /> 
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>#</th>
                {this.state.question.colTitles.map((colTitle, i) => 
                  <th key={i}>
                  <input className="input-sm" type="text" name={i} value={colTitle} onChange={e => this.handleChange(e, "col")} /> 
                  </th>
                )}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.state.question.rows.map((row, i) => 
                <tr key={i}>
                  <td>
                  {/* {row.title} */}
                  <input className="input-sm" type="text" name={i} value={row.title} onChange={e => this.handleChange(e, "row")} /> 
                  </td>
                  {row.col.map((col, j) => 
                    <td key={j}><RadioButton rowIndex={i} colIndex= {j} checked={col} handleRadioButtonClick={this.handleRadioButtonClick}/></td>
                  )}
                </tr>
              )}
            </MDBTableBody>

          </MDBTable>
          <MDBBtn type="submit" color="success">Change</MDBBtn>
        </form>
      {this.state.message && <div className="info">Success!</div>}
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