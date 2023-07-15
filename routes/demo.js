// import express
const express = require("express");

// import router
const router = express.Router();

// route
router.post("/", (req, res, next) => {
  // log the headers of the request
  console.log("post request", req.body);
});

router.get("/", (req, res, next) => {
  // log the headers of the request
  console.log("get request", req.header);

  //   redirection
  res.redirect("/users");
});

module.exports = router;
