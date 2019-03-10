const express = require('express');
const multer = require ('multer');
const Question = require('../models/Question')
const router = express.Router();

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

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
        message: "Success!",
        question
      });
    })
    .catch(err => next(err))
});

router.post('/add-picture', upload.single('file'), (req, res, next) => {
  console.log("Post Add Picture hit")
  console.log(req.file.path)
  res.json({
    message: "File has been uploaded!",
  });
});

router.post('/:id', (req, res, next) => {
  Question.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(question => {
    res.json({
      message: "Success",
      question
    });
  })
  .catch(err => console.log(err))
});



module.exports = router;
