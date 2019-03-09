const mongoose = require('mongoose');

const uri = "mongodb://localhost/question-editor"
// const uri = process.env.MONGODB_URI 

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });