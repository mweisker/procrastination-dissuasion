
const { Pool } = require('pg');

const PG_URI = 'postgres://yubvxcje:67dUCJg1VnWSBtd2Zir-hCXcmD-eWRkS@mahmud.db.elephantsql.com/yubvxcje';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}


/*

CREATE TABLE Users (
  UserId SERIAL PRIMARY KEY,
  UserName varchar,
  Password varchar
);

CREATE TABLE Tasks (
  TaskId SERIAL PRIMARY KEY,
  Title varchar,
  Description varchar,
  Status varchar DEFAULT 'in progress',
  DueDate DATE,
  UserId int,
  FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

*/