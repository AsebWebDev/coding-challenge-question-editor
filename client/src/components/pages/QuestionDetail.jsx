// FIXME: Overlapping screen, when adding too many columns

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn} from 'mdbreact';
import RadioButton from '../RadioButton';
import PicBox from '../PicBox';
import api from '../../api';

export default class QuestionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: null,
      message: null,
      fileForUpload: null,      
      picturePreview: null,
      fileUploadClicked: false
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
          message: data.message
        })

        setTimeout(() => {
          this.setState({
            question: data.question,
            message: null
          });
        }, 3000);
      })
      .catch(err => console.log(err))
  }

  addCol = (event) => {
    event.preventDefault();
    let newQuestion = this.state.question;
    newQuestion.rows.map((row, i) => row.col.push(false));
    newQuestion.colTitles.push("Col"+(newQuestion.colTitles.length+1))
    this.setState({
      question: newQuestion
    })
  }

  addRow = (event) => {
    event.preventDefault();
    let newQuestion = this.state.question;
    let newTitle = "Row"+(newQuestion.rows.length+1);
    let newRow = {col:[], title: newTitle};
    for (let i = 0; i < newQuestion.colTitles.length; i++) newRow.col.push(false);
    newQuestion.rows.push(newRow)
    this.setState({
      question: newQuestion
    })
  }

  handleFileUploadChange = (e) => {
    e.preventDefault();  
    const file = e.target.files[0];
    this.setState({
      fileForUpload: file,
      picturePreview: URL.createObjectURL(file)
    })
  }

  handleFileUpload = (e) => {
    e.preventDefault();  
    if (this.state.fileForUpload) {
      api.addPicture(this.state.fileForUpload)
        .then(data => {
          this.setState({message: "Upload Successfull!"})
        })
        .catch(err => console.log(err))
    } else {
      this.setState({message: "please choose a file"})
    }
    setTimeout(() => {
      this.setState({
        message: null
      });
    }, 3000);
  }

  render() {
    return this.state.question 
    ? (
      <MDBContainer className="QuestionDetail">
        {this.state.fileUploadClicked && 
          <form id="fileupload" onSubmit={e => this.handleFileUpload(e)}>
            <input type="file" onChange={e => this.handleFileUploadChange(e)}/><MDBBtn color="primary">send</MDBBtn>
            {this.state.picturePreview && <img src={this.state.picturePreview} alt="uploadedpicture" />}
          </form>
        }

        <form onSubmit={e => this.handleSubmit(e)}>
          <input className="input-lg" type="text" name="title" value={this.state.question.title} onChange={e => this.handleChange(e, "title")} /> 
          <MDBTable>
            <MDBTableHead>
              <tr>
                <td></td>
                <td></td>
                {this.state.question.colTitles.map((colTitle, i) => 
                  <td key={i}>
                  <PicBox pic="https://static.thenounproject.com/png/396915-200.png"/>
                  </td>
                )}
              </tr>
              <tr>
                <th></th>
                <th></th>
                {this.state.question.colTitles.map((colTitle, i) => 
                  <th key={i}>
                  <input className="input-sm" type="text" name={i} value={colTitle} onChange={e => this.handleChange(e, "col")} /> 
                  </th>
                )}
                <th>
                  <Link to="#" onClick={e => this.addCol(e)}> 
                    <PicBox pic="https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/plus-big-512.png"/>
                  </Link>
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.state.question.rows.map((row, i) => 
                <tr key={i}>
                  <td><PicBox pic="https://static.thenounproject.com/png/396915-200.png"/></td>
                  <td>
                    <input className="input-sm" type="text" name={i} value={row.title} onChange={e => this.handleChange(e, "row")} /> 
                  </td>
                  {row.col.map((col, j) => 
                    <td key={j}><RadioButton rowIndex={i} colIndex= {j} checked={col} handleRadioButtonClick={this.handleRadioButtonClick}/></td>
                  )}
                </tr>
              )}
              <th>
                <Link to="#" onClick={e => this.addRow(e)}>
                  <PicBox pic="https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/plus-big-512.png"/>
                </Link>
              </th> 
              {/* FIXME: Error in Console "Text nodes cannot appear as a child of..." */}
              
            </MDBTableBody>

          </MDBTable>
          <MDBBtn type="submit" color="success">Change</MDBBtn>
        </form>
      {this.state.message && <div className="info">{this.state.message}</div>}
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