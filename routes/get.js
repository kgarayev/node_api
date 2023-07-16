// import express
const express = require("express");

// import router
const router = express.Router();

// get user router
router.get("/users", (req, res) => {
  res.send({ status: 1, users: req.apiData.users });
});

router.get("/user/:id", (req, res) => {
  const id = req.params.id;

  // make a copy of api json data
  const _apiData = { ...req.apiData };

  //   destructure user data
  const { users } = _apiData;

  //   find the specific user
  const user = users.find((user) => {
    return user.id === id;
  });

  //check that char exists
  if (!user) {
    res.send({ status: 0, reason: "Id not found" });
    return;
  }

  res.send({ status: 1, user });
});

module.exports = router;
