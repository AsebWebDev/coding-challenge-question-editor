const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The question name is required'],
    minlength: 1
  },
  cols: [
    {
      title: String,
      picture: {
        type: String,
        default: "https://static.thenounproject.com/png/396915-200.png"
      },
    }
  ],

  rows: [
      {
        title: String,
        picture: {
          type: String,
          default: "https://static.thenounproject.com/png/396915-200.png"
        },
        col: [ {
          type: Boolean,
          default: false
        }  ] 
      }
  ]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;