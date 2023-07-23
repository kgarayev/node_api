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
};