const db = require('../models');

const Exam = db.exam.Exam;
const Questions = db.exam.Questions;

exports.addQuestion = (req, res) => {
  const question = new Questions(
    {
      testExam: req.params.id,
      question: req.body.question,
      questionType: req.body.type,
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