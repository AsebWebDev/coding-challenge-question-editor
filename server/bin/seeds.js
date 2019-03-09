const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const mongoose = require("mongoose");
const Question = require("../models/Question");

require('../configs/database')

let questions = [
  {
    title: "Question 1",
    colTitles: ["Col1", "Col2", "Col3", "Col4"],
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