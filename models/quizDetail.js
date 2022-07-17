const mongoose = require("mongoose");

const quizDetailSchema = new mongoose.Schema(
  {
    question: String,
    opt1: String,
    opt2: String,
    opt3: String,
    opt4: String,
    ans: String,
  },
  { timestamps: true }
);

const QuizDetail = mongoose.model("QuizDetail", quizDetailSchema);

module.exports.quizDetailSchema = quizDetailSchema;
module.exports.QuizDetail = QuizDetail;
