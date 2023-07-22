// import express
const express = require("express");

// import router
const router = express.Router();

// import the sql query function
const asyncMySQL = require("../database/connection");

// delete a user router
router.delete("/user/:id", async (req, res) => {
  // converting id from string to number
  const id = Number(req.params.id);

  // check if the id is number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  try {
    await asyncMySQL(`DELETE FROM users WHERE id LIKE ${id}`);
  } catch (error) {
    res.send({ status: 0, error });
  }

  res.send({ status: 1, message: "User removed" });
});

module.exports = router;
