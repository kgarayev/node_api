// import express
const express = require("express");

// import router
const router = express.Router();

// import the asyncSQL function
const asyncMySQL = require("../database/connection");

// route
router.get("/", async (req, res) => {
  // log the headers of the request
  console.log("New request to: /", req.headers);

  // destructuring the request queries
  let { num } = req.query;

  // converting id from string to number
  num = Number(num);

  console.log(num);

  try {
    var userQuantity = (await asyncMySQL(`SELECT COUNT(*) FROM users`))[0][
      "COUNT(*)"
    ];
    console.log(userQuantity);
  } catch (error) {
    res.send({ status: 0, error });
    return;
  }

  // if a specific quantity is asked for
  if (num > 0 && num < userQuantity) {
    const results = await asyncMySQL(`SELECT * FROM users LIMIT ${num}`);
    res.send({ status: 1, results });
    return;
  } else if (num === 0) {
    res.send({ status: 1, message: "No users requested" });
    return;
  } else if (num < 0) {
    res.send({ status: 0, message: "Invalid query" });
    return;
  }

  // otherwise, show all users
  const results = await asyncMySQL(`SELECT * FROM users`);

  // send the response to the front
  res.send({ status: 1, results });
});

module.exports = router;
