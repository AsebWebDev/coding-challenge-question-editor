const express = require('express');
const Question = require('../models/Question')

const router = express.Router();

router.get('/', (req, res, next) => {
  Question.find()
    .then(questions => {
			console.log('TCL: questions', questions)
      res.json(questions);
    })
    .catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
  Question.findById(req.params.id)
    .then(question => {
      res.json(question);
    })
    .catch(err => next(err))
});

router.post('/', (req, res, next) => {
  let { title } = req.body
  Question.create({ title })
    .then(question => {
      res.json({
        success: true,
        question
      });
    })
    .catch(err => next(err))
});

module.exports = router;
