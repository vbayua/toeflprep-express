const mongoose = require('mongoose');
const { Schema } = mongoose;


const resultSchema = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    },
    rawScore: {
      type: Number,
    },
    scaledScore: {
      type: Number
    },
    responses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Responses'
    }
  }
)

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;