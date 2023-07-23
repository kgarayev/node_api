// IMPORTING STUFF:
// import express
const express = require("express");

// import router
const router = express.Router();

// importing the random id generator function
const { genRandomString } = require("../utils/math");

// importing joi validator
const { validate } = require("../validation/index");

// import asyncMySQL function
const asyncMySQL = require("../database/connection");

// import queries
const {
  addAccount,
  deleteQuery,
  updateQuery,
  getQuery,
} = require("../database/queries");

// GET ROUTE:
// get a specific user router
router.get("/:id", async (req, res) => {
  // convert id from string to number
  const id = Number(req.params.id);

  // check if the id is number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  // ask sql for data
  // returns an array of results
  const results = await asyncMySQL(getQuery("accounts", id));

  // check if the results are there
  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  // if the resuts are not there, communicate this
  res.send({ status: 0, reason: "Id not found" });
});

// POST ROUTE:
// add account router
router.post("/", async (req, res) => {
  // just console log the body
  console.log(req.body);

  // validate
  let localErrors = await validate(req.body, "addAccount");

  // log local errors if any
  console.log(localErrors);

  // notify about validation errors and abort if any
  if (localErrors) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
    return;
  }

  //   destructuring the body
  const {
    accountName,
    accountNumber,
    sortCode,
    currencyCode,
    currencyName,
    currencySymbol,
    currencyCountry,
    balance,
    userId,
  } = req.body;

  // implementing the query
  try {
    await asyncMySQL(
      addAccount(
        accountName,
        accountNumber,
        sortCode,
        currencyCode,
        currencyName,
        currencySymbol,
        currencyCountry,
        balance,
        userId
      )
    );
    // notifying the user of successful result
    res.send({ status: 1, message: "Account added" });
    return;
  } catch (error) {
    // error message to the front
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

// DELETE ROUTE:
// delete a user router
router.delete("/:id", async (req, res) => {
  // converting id from string to number
  const id = Number(req.params.id);

  // check if the id is number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  try {
    // run the query
    const result = await asyncMySQL(deleteQuery("accounts", id));

    console.log(result);

    // check if the id exists and the user has been removed
    if (result.affectedRows === 1) {
      // send the successful update to the user
      res.send({ status: 1, message: "Account removed" });
      return;
    }
    // if not, notify the user
    res.send({ status: 0, message: "Invalid id" });
    return;
  } catch (error) {
    // catch the error
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

// UPDATE ROUTE:
// router to update the user information
router.patch("/:id", async (req, res) => {
  // convert id from string to number
  const id = Number(req.params.id);

  // validate
  let localErrors = await validate(req.body, "updateAccount");

  // checking if local errors exist
  if (localErrors) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
    return;
  }

  //   destructuring the body
  const {
    accountName,
    accountNumber,
    sortCode,
    currencyCode,
    currencyName,
    currencySymbol,
    currencyCountry,
    balance,
    userId,
  } = req.body;

  try {
    // First, check if user with this id exists
    const results = await asyncMySQL(
      `SELECT * FROM accounts WHERE id LIKE "${id}"`
    );

    // If no user exists with this id, return an error
    if (results.length === 0) {
      res.send({ status: 0, message: "Invalid account id" });
      return;
    }

    //   for security we have repetition
    if (accountName && typeof accountName === "string") {
      await asyncMySQL(
        updateQuery("accounts", "account_name", accountName, id)
      );
    }

    if (accountNumber && typeof accountNumber === "number") {
      await asyncMySQL(
        updateQuery("accounts", "account_number", accountNumber, id)
      );
    }

    if (sortCode && typeof sortCode === "number") {
      await asyncMySQL(updateQuery("accounts", "sort_code", sortCode, id));
    }

    if (currencyCode && typeof currencyCode === "string") {
      await asyncMySQL(
        updateQuery("accounts", "currency_code", currencyCode, id)
      );
    }

    if (currencyName && typeof currencyName === "string") {
      await asyncMySQL(
        updateQuery("accounts", "currency_name", currencyName, id)
      );
    }

    if (currencySymbol && typeof currencySymbol === "string") {
      await asyncMySQL(
        updateQuery("accounts", "currency_symbol", currencySymbol, id)
      );
    }

    if (currencyCountry && typeof currencyCountry === "string") {
      await asyncMySQL(
        updateQuery("accounts", "currency_country", currencyCountry, id)
      );
    }

    if (balance && typeof balance === "number") {
      await asyncMySQL(updateQuery("accounts", "balance", balance, id));
    }

    if (userId && typeof userId === "number") {
      await asyncMySQL(updateQuery("accounts", "user_id", userId, id));
    }

    // sending the final update to the user
    res.send({ status: 1, message: "Account updated" });
    return;
  } catch (error) {
    // catch errors if any
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

// exporting the router
module.exports = router;
