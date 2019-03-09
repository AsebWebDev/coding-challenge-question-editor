const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const mongoose = require("mongoose");

require('../configs/database')

let questions = [
  {
    name: "alice",
  },
  {
    name: "bob",
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