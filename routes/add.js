// import express
const express = require("express");
const { connected } = require("process");

// import router
const router = express.Router();

// importing the random id generator function
const { genRandomString } = require("../utils/math");

// importing joi validator
const { validate } = require("../validation/index");

// add user router
router.post("/user", async (req, res) => {
  console.log(req.body);

  //   destructure users data from the apiData
  const { users } = req.apiData;

  // validate
  let localErrors = await validate(req.body, "addUser");

  console.log(localErrors);

  if (localErrors) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
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
  }

  //   find the index if the user exists
  const indexOf = users.findIndex((user) => {
    return (
      (user.firstName === firstName && user.lastName === lastName) ||
      user.number === number ||
      user.email === email
    );
  });

  //   defensive check for duplicates
  if (indexOf > -1) {
    res.send({ status: 0, reason: "Duplicate entry" });
  }

  //   push the data into the apiData whilst generating random id number and an empty accounts array
  req.apiData.users.push({
    id: genRandomString(),
    firstName,
    lastName,
    number,
    email,
    dob,
    password,
    accounts: [],
  });

  res.send({ status: 1, message: "User added" });
});

module.exports = router;
