// import express
const express = require("express");
const { connected } = require("process");

// import router
const router = express.Router();

// import the sql query function
const asyncMySQL = require("../database/connection");

// importing the random id generator function
const { genRandomString } = require("../utils/math");

// importing joi validator
const { validate } = require("../validation/index");

// add user router
router.post("/user", async (req, res) => {
  // just console log the body
  console.log(req.body);

  // validate
  let localErrors = await validate(req.body, "addUser");

  // log local errors if any
  console.log(localErrors);

  // notify about validation errors and abort if any
  if (localErrors) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
    return;
  }

  //   destructuring the body
  const { firstName, lastName, number, email, dob, password } = req.body;

  // not needed now could be used later

  //   const {
  //     accountName,
  //     accountNumber,
  //     sortCode,
  //     currencyCode,
  //     currencyName,
  //     currencySymbol,
  //     currencyCountry,
  //   } = accounts[0];

  // logical check (might be redundant due to the joi validator present . consider removing it)
  const firstBoolean =
    firstName &&
    typeof firstName === "string" &&
    lastName &&
    typeof lastName === "string" &&
    number &&
    typeof Number(number) === "number" &&
    email &&
    typeof email === "string" &&
    dob &&
    typeof dob === "string" &&
    password &&
    typeof password === "string";

  // defensive check
  if (!firstBoolean) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
    return;
  }

  // implementing the query
  try {
    await asyncMySQL(
      `INSERT INTO users (first_name, last_name, number, email, dob, password) 
              VALUES ("${firstName}", "${lastName}", "${number}", "${email}", STR_TO_DATE("${dob}", "%d/%m/%Y"), "${password}")`
    );
    // notifying the user of successful result
    res.send({ status: 1, message: "User added" });
    return;
  } catch (error) {
    // error message to the front
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

module.exports = router;
