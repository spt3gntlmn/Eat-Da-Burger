const connection = require('./connection.js');

// connect to mysql db
connection.connect(function (err) {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  };
  console.log(`connection is ID ${connection.threadId}`);
});

//  MySQL methods
const orm = {
  selectAll: function (query) {
    // MySQL query
    connection.query(`SELECT * FROM burgers`, function (err, result) {
      if (err) throw err;
      query(result);
    });
  },

  // insert one code
  insertOne: function (burger_name, query) {
    let date = new Date();

    //  Run MySQL query
    connection.query(`INSERT INTO burgers SET ?`, {
      burger_name: burger_name,
      devoured: false,
      date: date
    }, function (err, result) {
      if (err) throw err;
      query(result);
    });

  },

  //  update One
  updateOne: function (burgerID, query) {

    // MySQl query
    connection.query(`UPDATE burgers SET ? WHERE ?`, [{ devoured: true }, { id: burgerID }], function (err, result) {
      if (err) throw err;
      query(result);
    });

  },

  //  undevour One
  undevour: function (burgerID, query) {

    // MySQl query
    connection.query(`UPDATE burgers SET ? WHERE ?`, [{ devoured: false }, { id: burgerID }], function (err, result) {
      if (err) throw err;
      query(result);
    });

  }


};

//  Export ORM
module.exports = orm;