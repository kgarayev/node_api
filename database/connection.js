// import mysql
const mysql = require("mysql");

// instance of a connection
// this driver does not support promises
// need to create our own wrapper / promisify this
const myConnection = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
  database: "stash",
});

// wrapping the query code in the promise to make it async await compatible
// resolve if no error, reject if error
// wrapping the drive inside a promise
const asyncMySQL = (query) => {
  return new Promise((resolve, reject) => {
    myConnection.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

// exporting the function to be used elsewhere on the project
module.exports = asyncMySQL;

// demo function to implement a number of queries
// const demo = async () => {
//   result1 = await asyncMySQL("SELECT * FROM users");
//   result2 = await asyncMySQL("SELECT * FROM users");
//   result3 = await asyncMySQL("SELECT * FROM users");
//   result4 = await asyncMySQL("SELECT * FROM users");
// };

// callback version of the query (leads to callback hell if a lot of queries are executed )
// myConnection.query("SELECT * FROM users", (error, results) => {
//   console.log(error, results);
// });
