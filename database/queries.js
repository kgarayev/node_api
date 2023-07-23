// a file with all sql queries in it

module.exports = {
  // create users table if does not exist
  createUsersTable: () => {
    return `CREATE TABLE IF NOT EXISTS users (
        id INT(11) PRIMARY KEY AUTO_INCREMENT UNIQUE,
        first_name VARCHAR(64) NOT NULL,
        last_name VARCHAR(64) NOT NULL,
        number VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(64) NOT NULL UNIQUE,
        dob DATE NOT NULL,
        password_hash VARCHAR(64) NOT NULL,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;
  },

  //   create accounts table if does not exist
  createAccountsTable: () => {
    return `CREATE TABLE IF NOT EXISTS accounts (
        id INT(11) PRIMARY KEY AUTO_INCREMENT UNIQUE,
        account_name VARCHAR(64) NOT NULL,
        account_number INT(8) NOT NULL UNIQUE,
        sort_code INT(6) NOT NULL UNIQUE,
        currency_code VARCHAR(3) NOT NULL,
        currency_name VARCHAR(64) NOT NULL,
        currency_symbol VARCHAR(2) NOT NULL,
        currency_country VARCHAR(64) NOT NULL,
        balance DECIMAL(10,2) NOT NULL,
        user_id INT(11) NOT NULL,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;
  },

  //   create transactions table if does not exist
  createTransactionsTable: () => {
    return `CREATE TABLE IF NOT EXISTS transactions (
        id INT(11) PRIMARY KEY AUTO_INCREMENT UNIQUE,
        type VARCHAR(64) NOT NULL,
        details VARCHAR(64) NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        amount DECIMAL(10, 2) NOT NULL,
        account_id INT(11) NOT NULL
    )`;
  },

  //   add user query
  addUser: (firstName, lastName, number, email, dob, password_hash) => {
    return `INSERT INTO users (first_name, last_name, number, email, dob, password) 
            VALUES (
                "${firstName}", 
                "${lastName}", 
                "${number}", 
                "${email}", 
                STR_TO_DATE("${dob}", "%d/%m/%Y"), 
                "${password_hash}")`;
  },

  //   add account query
  addAccount: (
    accountName,
    accountNumber,
    sortCode,
    currencyCode,
    currencyName,
    currencySymbol,
    currencyCountry,
    balance,
    userId
  ) => {
    return `INSERT INTO accounts (
                    account_name, account_number, 
                    sort_code, currency_code, 
                    currency_name, currency_symbol, 
                    currency_country, balance, user_id) 
                        VALUES (
                            "${accountName}", 
                            "${accountNumber}", 
                            "${sortCode}", 
                            "${currencyCode}", 
                            "${currencyName}",
                            "${currencySymbol}",
                            "${currencyCountry}",
                            "${balance}",
                            "${userId}")`;
  },

  //   add transaction query
  addTransaction: (type, details, amount, account_id) => {
    return `INSERT INTO users (type, details, amount, account_id) 
            VALUES (
                "${type}", 
                "${details}", 
                "${amount}", 
                "${account_id}")`;
  },

  // GENERIC QUERIES:
  //  a generic remove/delete query
  deleteQuery: (dbName, id) => {
    return `DELETE FROM ${dbName} WHERE id LIKE ${id}`;
  },

  //   a generic update query
  updateQuery: (dbName, dbColumn, newValue, id) => {
    return `UPDATE ${dbName} SET ${dbColumn} = "${newValue}" WHERE id LIKE "${id}"`;
  },

  //   a generic get/select query
  getQuery: (dbName, id) => {
    return `SELECT * FROM ${dbName} WHERE id LIKE ${id}`;
  },
};
