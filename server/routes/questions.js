const express = require('express');
const Question = require('../models/Question')

const router = express.Router();

router.get('/', (req, res, next) => {
  Question.find()
    .then(questions => {
      res.json(questions);
    })
    .catch(err => next(err))
});

router.post('/', (req, res, next) => {
  let { name } = req.body
  Question.create({ name })
    .then(question => {
      res.json({
        success: true,
        question
      });
    })
    .catch(err => next(err))
});

module.exports = router;
