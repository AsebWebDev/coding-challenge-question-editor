const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const mongoose = require("mongoose");
const Question = require("../models/Question");

require('../configs/database')

let questions = [
  {
    title: "Question 1",
    cols: [{title: "Col1"}, {title: "Col2"}, {title: "Col3"}, {title: "Col4"}],
    rows: [
      {
        title: "Row1",
        col: [false, false, false, true]
      },
      {
        title: "Row2",
        col: [false, true, false, false]
      },
      {
        title: "Row3",
        col: [false, true, false, false]
      },
      {
        title: "Row4",
        col: [false, true, false, false]
      },
    ]
  }
]

Question.deleteMany()
  .then(() => {
    return Question.create(questions)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} questions created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })