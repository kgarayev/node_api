// import express
const express = require("express");

// import router
const router = express.Router();

// import asyncMySQL function
const asyncMySQL = require("../database/connection");

// get user router
router.get("/users", async (req, res) => {
  // ask sql for data
  // returns an array of results
  const results = await asyncMySQL(`SELECT * FROM users`);

  res.send({ status: 1, results });
});

router.get("/user/:id", async (req, res) => {
  // convert id from string to number
  const id = Number(req.params.id);

  // check if the id is number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  // ask sql for data
  // returns an array of results
  const results = await asyncMySQL(`SELECT * FROM users WHERE id LIKE ${id}`);

  console.log(results);

  // check if the results are there
  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "Id not found" });
});

module.exports = router;
