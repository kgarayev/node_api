// import express
const express = require("express");

// import router
const router = express.Router();

// delete a user router
router.delete("/user/:id", (req, res) => {
  const id = Number(req.params.id);

  //   destructure user data
  const { users } = req.apiData;

  // defensive checks
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  //   find the index of the user
  const indexOf = users.findIndex((user) => {
    return user.id === id;
  });

  // defensive checks
  if (indexOf < 0) {
    res.send({ status: 0, reason: "Id is not found, maybe already deleted" });
    return;
  }

  //   remove the user from the api data
  users.splice(indexOf, 1);

  res.send({ status: 1, message: "User removed" });
});

module.exports = router;
