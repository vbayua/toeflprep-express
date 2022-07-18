const db = require('../models');

const Exam = db.exam.Exam;

// CRUD


exports.createExam = (req, res) => {
  const exam = new Exam({
    title: req.body.title,
    status: req.body.status ? req.body.status : ''
  });
  exam.save((err, exam) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    res.status(200).send({
      message: 'Exam added successfully',
    });
  })
}

exports.getAllExam = (req, res) => {
  Exam.find((err, exams) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    res.status(200).send({
      exams
    })
  });
}

exports.getExamById = (req, res) => {
  const examId = {
    _id: req.query.id
  }
  Exam.findById(examId, (err, exam) => {
    if (err) {
      res.status(404).send({
        message: err,
      });
      return;
    }
    res.status(200).send({
      message: 'Get exam by _Id',
      data: exam
    });
  });
}

exports.updateExamById = (req, res) => {
  const query = {
    _id: req.query.id
  }
  Exam.findByIdAndUpdate(query,
    {
      title: req.body.title,
      status: req.body.status
    },
    { new: true },
    (err, exam) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      }
      res.status(200).send({
        message: 'Exam updated',
        data: exam
      });
    })
}

exports.deleteExamById = (req, res) => {
  const query = req.query.id
  Exam.findByIdAndDelete(query, undefined, (err) => {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }
    res.status(200).send({
      message: 'Delete successful'
    });
  });
}

exports.getQuestionsInExam = (req, res) => {
  Exam.findOne({
    _id: req.params.id
  }).populate('questions', '').exec(
    (err, exam) => {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }
      res.status(200).send({
        exam
      });
    }
  )
}