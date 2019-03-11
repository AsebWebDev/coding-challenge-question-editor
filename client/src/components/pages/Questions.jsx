import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default class Questions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: []
    }
  }
  render() {
    return (
      <div className="Questions">
        {this.state.questions.map(c => 
          <li key={c._id}><Link to={"/questions/" + c._id}>{c.title}</Link></li>
        )}
      </div>
    );
  }
  componentDidMount() {
    api.getQuestions()
      .then(questions => {
        console.log(questions)
        this.setState({
          questions: questions
        })
      })
      .catch(err => console.log(err))
  }
}