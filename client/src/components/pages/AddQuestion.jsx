import React, { Component } from 'react';
import api from '../../api';


export default class AddQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
    }
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      title: this.state.title,
    }
    api.addQuestion(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          title: "",
          message: `Your Question '${this.state.title}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }
  render() {
    return (
      <div className="AddQuestion">
        <h2>Add Question</h2>
        <form>
          Title: <input type="text" value={this.state.title} name="title" onChange={e => this.handleInputChange(e)} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Create Question</button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
}