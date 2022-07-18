const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
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
      type: String,
      required: true
    }
  }
)

const Responses = mongoose.model('Responses', responseSchema);

module.exports = Responses;