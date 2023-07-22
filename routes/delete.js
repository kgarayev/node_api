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
    // run the query
    const result = await asyncMySQL(`DELETE FROM users WHERE id LIKE ${id}`);

    console.log(result);

    // check if the id exists and the user has been removed
    if (result.affectedRows === 1) {
      // send the successful update to the user
      res.send({ status: 1, message: "User removed" });
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

module.exports = router;
