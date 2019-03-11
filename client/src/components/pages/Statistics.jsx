import React, { Component } from "react";

export default class StatisticsQuestionDetail extends Component {

  render() {
    let longestRowLabel = this.props.question.rows.reduce((c, v) => c.title.length > v.title.length ? c : v)
    let longestColLabel = this.props.question.cols.reduce((c, v) => c.title.length > v.title.length ? c : v)

    return (
      <div className="right jumbotron">
        <h3>Statistics</h3>
        <strong>Number of Rows: </strong>{this.props.question.rows.length}<br />
        <strong>Number of Cols: </strong>{this.props.question.cols.length}<br />
        <strong>Images Uploaded: </strong>{this.props.counter}<br />
        <strong>Longest Rowlabel: </strong>{longestRowLabel.title}<br />
        <strong>Longest ColLabel: </strong>{longestColLabel.title}<br />
      </div>
    );
  }
}

