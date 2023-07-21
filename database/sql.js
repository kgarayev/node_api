// import mysql
const mysql = require("mysql");

// instance of a connection
const myConnection = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
  database: "stash",
});

myConnection.query("SELECT * FROM users", (error, results) => {
  console.log(error, results);
});
