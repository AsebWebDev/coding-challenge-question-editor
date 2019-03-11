import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Questions from './pages/Questions';
import QuestionDetail from './pages/QuestionDetail';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: []
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Question Editor</h1>
          <NavLink to="/" exact>Questions</NavLink>
        </header>
        <Switch>
          <Route path="/" exact component={Questions} />
          <Route path="/questions/:questionId" exact component={QuestionDetail} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}