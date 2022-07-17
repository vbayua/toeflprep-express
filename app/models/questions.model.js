const mongoose = require('mongoose');
const { Schema } = mongoose;
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
const Questions = mongoose.model('Questions', )