// import express
const express = require("express");

// import router
const router = express.Router();

// import the asyncSQL function
const asyncMySQL = require("../database/connection");

// route
router.get("/:num", async (req, res) => {
  // log the headers of the request
  console.log("New request to: /", req.headers);

  // converting id from string to number
  const num = Number(req.params.num);

  console.log(num);

  try {
    const userQuantity = (await asyncMySQL(`SELECT COUNT(*) FROM users`))[0][
      "COUNT(*)"
    ];
    console.log(userQuantity);
  } catch (error) {
    res.send({ status: 0, error });
    return;
  }

  const userQuantity = (await asyncMySQL(`SELECT COUNT(*) FROM users`))[0][
    "COUNT(*)"
  ];

  // if a specific quantity is asked for
  if (num > 0 && num < userQuantity) {
    const results = await asyncMySQL(`SELECT * FROM users LIMIT ${num}`);
    res.send({ status: 1, results });
    return;
  }

  const results = await asyncMySQL(`SELECT * FROM users LIMIT ${num}`);

  // send the response to the front
  res.send({ status: 1, results });
});

module.exports = router;
