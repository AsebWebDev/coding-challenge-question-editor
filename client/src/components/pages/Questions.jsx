import React, { Component } from 'react';
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
        <h2>List of Questions</h2>
        {this.state.questions.map(c => <li key={c._id}>{c.name}</li>)}
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