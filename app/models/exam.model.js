const mongoose = require('mongoose');
const { Schema } = mongoose;

// const root = 'azureBlobStorageRoute';
// use map type to apply dynamic upload to hostname

const examSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions'
      }
    ]
  }
);

const answerOptionsSchema = Schema(
  {
    answer: {
      type: String,
    },
    isCorrect: {
      type: Boolean
    }
  }
);

const questionSchema = Schema(
  {
    testExam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    },
    questionType: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
    },
    audioUrl: {
      type: String
    },
    questionPart: {
      type: String,
    },
    question: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
    },
    answerOptions: {
      type: Array,
    }
  }
);

const Exam = mongoose.model('Exam', examSchema);
const Questions = mongoose.model('Questions', questionSchema)
const AnswerOptions = mongoose.model('Answers', answerOptionsSchema)


module.exports = {
  Exam,
  Questions,
  AnswerOptions
};
