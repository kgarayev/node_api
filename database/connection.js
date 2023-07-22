// import mysql
const mysql = require("mysql");

// instance of a connection
// this driver does not support promises
// need to create our own wrapper / promisify this
// connect to RDMS without specifying the database itself
const myConnection = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
});

// wrapping the query code in the promise to make it async await compatible
// resolve if no error, reject if error
// wrapping the drive inside a promise
// returns an array
const asyncMySQL = (query) => {
  return new Promise((resolve, reject) => {
    myConnection.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
      return;
    });
  });
};

// create a database function if one does not already exist
const createDB = async (dbName) => {
  try {
    // Create the database if it doesn't exist
    await asyncMySQL(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

    // Switch to using the new database
    myConnection.changeUser({ database: dbName }, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
    });
  } catch (error) {
    console.error(error);
  }
};

// create a database called stash
createDB("stash");

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
