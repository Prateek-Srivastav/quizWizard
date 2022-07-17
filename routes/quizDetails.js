const express = require("express");
const auth = require("../middleware/auth");
const { QuizDetail } = require("../models/quizDetail");

const router = express.Router();

router.post("/post", auth, async (req, res) => {
  try {
    const { question, opt1, opt2, opt3, opt4, ans } = req.body;

    if (!question || !opt1 || !opt2 || !opt3 || !opt4 || !ans)
      return res.status(400).send("Please enter all required details.");

    const quiz = new QuizDetail({
      question,
      opt1,
      opt2,
      opt3,
      opt4,
      ans,
    });

    await quiz.save();
    res.send("Quiz submitted successfully");
  } catch (error) {
    console.log(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const quiz = await QuizDetail.find();

    if (!quiz) res.send("no quiz found");

    res.send(quiz);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
