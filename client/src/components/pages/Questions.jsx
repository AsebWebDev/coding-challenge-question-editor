import React, { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import api from '../../api';

export default class Questions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: []
    }
  }
  handleDelete = (id) => {
    api.deleteQuestion(id)
    .then(data => {
      this.setState({
        questions: this.state.questions.filter(c => c._id !== id),
        message: data.message
      })
      // Remove the message after 3 seconds
      setTimeout(() => {
        this.setState({
          message: null
        })
      }, 3000)
    })
  }

  render() {
    return (
      <div className="Questions">
      <ul>
        {this.state.questions.map(c => 
          <li key={c._id}><Link to={"/questions/" + c._id}><h3>{c.title}</h3></Link><MDBBtn color="danger" onClick={e => this.handleDelete(c._id)}>Delete</MDBBtn></li>
        )}
      </ul>

      </div>
    );
  }
  
  componentDidMount() {
    api.getQuestions()
      .then(questions => {
        this.setState({
          questions: questions
        })
      })
      .catch(err => console.log(err))
  }
}