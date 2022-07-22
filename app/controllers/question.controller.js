const db = require('../models');

const Exam = db.exam.Exam;
const Questions = db.exam.Questions;

exports.addQuestion = (req, res) => {
  const question = new Questions(
    {
      testExam: req.params.id,
      question: req.body.question,
      questionType: req.body.type,
      pargraphs: req.body.paragraphs,
      imageUrl: req.body.imageUrl,
      audioUrl: req.body.audioUrl,
      questionPart: req.body.part,
      answerOptions: req.body.answers,
      correctAnswer: req.body.correctAnswer
    }
  );

  Questions.create(question).then(docQuestion => {
    return Exam.findByIdAndUpdate(
      docQuestion.testExam,
      { $push: { questions: docQuestion._id } },
      { new: true }
    );
  }).finally(() => {
    res.status(200).send({
      message: 'Success!'
    });
    return;
  });
};

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