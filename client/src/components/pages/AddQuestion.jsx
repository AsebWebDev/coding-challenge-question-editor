import React, { Component } from 'react';
import api from '../../api';


export default class AddQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      capitals: "",
      area: "",
      description: "",
      message: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.name, this.state.description)
    let data = {
      name: this.state.name,

    }
    api.addQuesions(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          name: "",
          message: `Your Question '${this.state.name}' has been created`
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
          Name: <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Create Question</button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
}