const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Questions'
    },
    answerChoice: {
      type: String
    },
    isCorrect: {
      type: Boolean
    }
  }
)

const resultSchema = Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  },
  name: {
    type: String,
  },
  major: {
    type: String,
  },
  date: {
    type: String,
  },
  listeningRaw: {
    type: Number,
  },
  structureRaw: {
    type: Number,
  },
  readingRaw: {
    type: Number,
  },
  listeningScaled: {
    type: Number,
  },
  structureScaled: {
    type: Number,
  },
  readingScaled: {
    type: Number,
  },
  totalRaw: {
    type: Number,
  },
  totalScaled: {
    type: Number,
  },
  responses: [responseSchema],
})

const Responses = mongoose.model('Responses', responseSchema);
const Results = mongoose.model('Results', resultSchema);

module.exports = {
  Responses,
  Results
};