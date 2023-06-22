var { Client } = require("pg");

if (process.env.APPENV == "development") {
  var options = {
    host: "localhost",
    port: 5432,
    database: "medicalidem",
    user: "postgres",
    password: "fg",
  };
  var client = new Client(options);
  client.connect((err) => {
    if (err) {
      console.error("connection error", err.stack);
    } else {
      console.log("Postgres Development Connected");
    }
  });
} else {
  var options = {
    host: "localhost",
    port: 5432,
    database: "medicalidem",
    user: "paulprince",
    password: "fg",
  };
  var client = new Client(options);
  client.connect((err) => {
    if (err) {
      console.error("connection error", err.stack);
    } else {
      console.log("Postgres Production Connected");
    }
  });
}

module.exports.client = client;
