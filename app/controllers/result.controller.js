const db = require('../models');

const Responses = db.responses.Responses;
const Results = db.responses.Results;

exports.getResultsByUserId = async (req, res) => {
  const query = {
    userId: req.params.userId
  }
  Results.find(query).populate('examId', 'title').populate('userId', '').exec(
    (err, results) => {
      if (err) {
        res.status(500).send({
          message: err
        })
        return
      }
      res.status(200).send({
        results
      })
    }
  )
}

exports.getUserResultId = async (req, res) => {
  const query = {
    userId: req.params.userId,
    examId: req.params.examId
  }
  Results.findOne(query).populate({ path: 'examId', select: 'title' }).populate('userId', 'username').exec(
    (err, result) => {
      if (err) {
        res.status(500).send({
          message: err
        })
        return
      }
      res.status(200).send({
        result
      })
    }
  )
}

exports.getExamResults = async (req, res) => {
  const query = {
    examId: req.params.examId
  }
  Results.find(query).populate('userId', '').populate('examId', 'title').exec(
    (err, result) => {
      if (err) {
        res.status(500).send({
          err
        })
        return
      }
      res.status(200).send({
        result
      })
    }
  )
}