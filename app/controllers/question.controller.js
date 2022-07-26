const db = require('../models');

const Exam = db.exam.Exam;
const Questions = db.exam.Questions;

exports.addQuestion = (req, res) => {
  const question = new Questions(
    {
      testExam: req.params.id,
      question: req.body.question,
      questionType: req.body.type,
      paragraphs: req.body.paragraphs,
      imageUrl: req.body.imageUrl,
      audioUrl: req.body.audioUrl,
      questionPart: req.body.part,
      answerOptions: req.body.answers,
      correctAnswer: req.body.correctAnswer
    }
  );

  Questions.create(question).then(docQuestion => {
    return Exam.findByIdAndUpdate(docQuestion.testExam,{ $push: { questions: docQuestion._id } },
      { new: true }
    );
  }).finally(() => {
    res.status(200).send({
      message: 'Success!'
    });
    return;
  });
};

exports.updateQuestion = (req, res) => {
  const query = {
    _id: req.params.id,
  }
  const update = {
    question: req.body.question,
    questionType: req.body.type,
    paragraphs: req.body.paragraphs,
    imageUrl: req.body.imageUrl,
    audioUrl: req.body.audioUrl,
    questionPart: req.body.part,
    answerOptions: req.body.answers,
    correctAnswer: req.body.correctAnswer
  }
  Questions.updateOne(query, update).then(
    question => {
      res.status(200).send({
        message: 'Success!',
        question
      });
      return;
    },
    error => {
      res.status(500).send({
        message: 'Failure',
        error
      })
    }
  )
}

exports.deleteQuestion = (req, res) => {
  const query = {
    _id: req.params.id
  }

  Questions.findOneAndDelete(query, undefined, (err, doc) => {
    if (err) {
      res.status(500).send({
        err
      })
      return
    }
    res.status(200).send({
      doc
    })
  })
}

exports.getQuestion = (req, res) => {
  const query = {
    _id: req.params.id
  }
  Questions.findOne(query).then(
    question => {
      res.status(200).send({
        question
      })
    },
    error => {
      res.status(500).send({
        error
      })
    }
  )
}



exports.getQuestionsInExam = (req, res) => {
  const query = {
    testExam: req.query.id
  }
  Questions.find(query).populate('testExam', 'title -_id').exec((err, doc) => {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }
    res.status(200).send({
      data: doc
    });
  })
}

exports.getListeningQuestions = (req, res) => {
  Exam.findOne({
    _id: req.params.id
  }).populate({
    path: 'questions',
    match: { questionType: { $in: 'Listening Comprehension' } }
  }).exec(
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

exports.getReadingQuestions = (req, res) => {
  Exam.findOne({
    _id: req.params.id
  }).populate({
    path: 'questions',
    match: { questionType: { $in: 'Reading Comprehension' } }
  }).exec(
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

exports.getStructureQuestions = (req, res) => {
  Exam.findOne({
    _id: req.params.id
  }).populate({
    path: 'questions',
    match: { questionType: { $in: 'Structure and Written' } }
  }).exec(
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