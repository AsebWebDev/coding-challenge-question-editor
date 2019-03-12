// FIXME: Overlapping screen, when adding too many columns

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBAnimation} from 'mdbreact';
import Row from '../Row';
import PicBox from '../PicBox';
import Statistics from './Statistics';
import api from '../../api';

export default class QuestionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: null,
      message: null,
      fileForUpload: null,      
      picturePreview: null,
      fileUploadClicked: false,
      fileUploadClickedDirection: '',
      fileUploadClickedIndex: null,
      imageCounter: 0
    }
  }


  handleChange = (event, key) => {  
    let index = event.target.name;
    let newQuestion = this.state.question;
    (key === "title")
    ? newQuestion.title = event.target.value
    :(key === "col")  
      ? newQuestion.cols[index].title = event.target.value
      : newQuestion.rows[index].title = event.target.value;
    this.setState({question: newQuestion});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    api.editQuestion(this.props.match.params.questionId, this.state.question)
      .then(data => {        
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
    newQuestion.cols.push({
      title: "Col"+(newQuestion.cols.length+1),
      picture: "https://static.thenounproject.com/png/396915-200.png"
    })
    this.setState({ question: newQuestion })
  }

  addRow = (event) => {
    event.preventDefault();
    let newQuestion = this.state.question;
    let newTitle = "Row"+(newQuestion.rows.length+1);
    let newRow = {col:[], title: newTitle, picture: "https://static.thenounproject.com/png/396915-200.png"};
    for (let i = 0; i < newQuestion.cols.length; i++) newRow.col.push(false);
    newQuestion.rows.push(newRow)
    this.setState({ question: newQuestion })
  }

  handleFileUploadClick = (e, i, direction) => {
    e.preventDefault();  
    this.setState({
      fileUploadClicked: !this.state.fileUploadClicked,
      fileUploadClickedDirection: direction,
      fileUploadClickedIndex: i
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
    let file = this.state.fileForUpload;
    let index = this.state.fileUploadClickedIndex;
    let direction = this.state.fileUploadClickedDirection;
    let questionId = this.props.match.params.questionId;
    e.preventDefault();  
    if (this.state.fileForUpload) {
      api.addPicture(file, index, direction, questionId)
        .then(data => {
          this.setState({
            message: "Upload Successfull!",
            imageCounter: this.state.imageCounter + 1
          })
        })
        .catch(err => console.log(err))
    } else this.setState({message: "please choose a file"});
  
    setTimeout(() => {
      this.setState({ message: null });
    }, 3000);
  }

  render() {
    return this.state.question 
    ? (
      <MDBContainer className="QuestionDetail d-flex flex-row">
        <div className="left">
          {this.state.fileUploadClicked && 
            <MDBAnimation type="slideInLeft">
              <form id="fileupload" onSubmit={e => this.handleFileUpload(e)}>
                <input type="file" onChange={e => this.handleFileUploadChange(e)}/>
                {this.state.picturePreview && <img src={this.state.picturePreview} alt="uploadedpicture" />}
                <MDBBtn type="submit" color="primary">send</MDBBtn>
              </form> 
            </MDBAnimation>  
          }
          <form onSubmit={e => this.handleSubmit(e)}>
            <input id="title" className="input-lg" type="text" name="title" value={this.state.question.title} onChange={e => this.handleChange(e, "title")} /> 
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <td></td>
                  <td></td>
                  {this.state.question.cols.map((col, i) => 
                    <td key={i}>
                    <Link to="#" onClick={e => this.handleFileUploadClick(e, i, 'col')}>
                      <PicBox pic={col.picture}/>
                    </Link>
                    </td>
                  )}
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  {this.state.question.cols.map((col, i) => 
                    <th key={i}>
                    <input className="input-sm" type="text" name={i} value={col.title} onChange={e => this.handleChange(e, "col")} /> 
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
                  <Row key={i} i={i} question={this.state.question} handleChange={this.handleChange} handleFileUploadClick={this.handleFileUploadClick} row={row}/>
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
        </div>

        <Statistics question={this.state.question} counter={this.state.imageCounter}/>

      </MDBContainer>
    )
    :(<div></div>);
  }
  componentDidMount() {
    api.getQuestion(this.props.match.params.questionId)
      .then(question => {
        this.setState({ question: question })
      })
      .catch(err => console.log(err))
  }
}