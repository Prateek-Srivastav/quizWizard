const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return res.status(400).send("Please enter a valid email.");

  const hashedPw = await bcrypt.hash(password, 12);

  const user = new User({
    email,
    password: hashedPw,
  });

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(token);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let isValidUser;

  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return res.status(400).send("Please enter a valid email.");

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).send("User is not registered. Please register.");
  else if (user) isValidUser = await bcrypt.compare(password, user.password);

  if (isValidUser) {
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(token);
  } else if (!isValidUser) return res.status(400).send("Wrong password");
});

module.exports = router;
