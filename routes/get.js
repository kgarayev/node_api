// import express
const express = require("express");

// import router
const router = express.Router();

// get user router
router.get("/users", (req, res) => {
  res.send({ status: 1, users: req.apiData.users });
});

router.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  // make a copy of api json data
  const _apiData = { ...req.apiData };

  //   destructure user data
  const { users } = _apiData;

  // defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  // defensive checks
  if (id > users.length) {
    res.send({ status: 0, reason: "Id is not found" });
    return;
  }

  //   find the specific user
  const user = users.find((user) => {
    return user.id === id;
  });

  res.send({ status: 1, user });
});

module.exports = router;
