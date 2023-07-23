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
  addTransaction,
  deleteQuery,
  updateQuery,
  getQuery,
} = require("../database/queries");

// GET ROUTE:
// get a specific transaction router
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
  const results = await asyncMySQL(getQuery("transactions", id));

  // check if the results are there
  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  // if the resuts are not there, communicate this
  res.send({ status: 0, reason: "Id not found" });
});

// POST ROUTE:
// add transaction router
router.post("/", async (req, res) => {
  // just console log the body
  console.log(req.body);

  // validate
  let localErrors = await validate(req.body, "addTransaction");

  // log local errors if any
  console.log(localErrors);

  // notify about validation errors and abort if any
  if (localErrors) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
    return;
  }

  //   destructuring the body
  const { type, details, amount, accountId } = req.body;

  // implementing the query
  try {
    await asyncMySQL(addTransaction(type, details, amount, accountId));
    // notifying the front of successful result
    res.send({ status: 1, message: "Transaction added" });
    return;
  } catch (error) {
    // error message to the front
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

// DELETE ROUTE:
// delete a transaction router
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
    const result = await asyncMySQL(deleteQuery("transactions", id));

    console.log(result);

    // check if the id exists and the transaction has been removed
    if (result.affectedRows === 1) {
      // send the successful update to the front
      res.send({ status: 1, message: "Transaction removed" });
      return;
    }
    // if not, notify the front
    res.send({ status: 0, message: "Invalid id" });
    return;
  } catch (error) {
    // catch the error
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

// UPDATE ROUTE:
// router to update the transaction information
router.patch("/:id", async (req, res) => {
  // convert id from string to number
  const id = Number(req.params.id);

  // validate
  let localErrors = await validate(req.body, "updateTransaction");

  // logging local errors
  // console.log(localErrors);

  // checking if local errors exist
  if (localErrors) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
    return;
  }

  //   destructuring the body
  const { type, details, amount, accountId } = req.body;

  try {
    // First, check if transaction with this id exists
    const results = await asyncMySQL(
      `SELECT * FROM transactions WHERE id LIKE "${id}"`
    );

    // If no transaction exists with this id, return an error
    if (results.length === 0) {
      res.send({ status: 0, message: "Invalid transaction id" });
      return;
    }

    //   for security we have repetition
    if (type && typeof type === "string") {
      await asyncMySQL(updateQuery("transactions", "type", type, id));
    }

    if (details && typeof details === "string") {
      await asyncMySQL(updateQuery("transactions", "details", details, id));
    }

    if (amount && typeof Number(amount) === "number") {
      await asyncMySQL(updateQuery("transactions", "amount", amount, id));
    }

    if (accountId && typeof Number(accountId) === "number") {
      await asyncMySQL(
        updateQuery("transactions", "account_id", accountId, id)
      );
    }

    // sending the final update to the front
    res.send({ status: 1, message: "Transaction updated" });
    return;
  } catch (error) {
    // catch errors if any
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

// exporting the router
module.exports = router;
