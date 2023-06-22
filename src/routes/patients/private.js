const { client } = require("../../config/dbConfig");

var { customAlphabet, nanoid } = require("nanoid");
var Router = require("express").Router();

// New Patient
Router.post("/add", async (req, res, next) => {
  try {
    console.log(req.body);
    var body = req.body;
    var patientid = customAlphabet('1234567ABCDEFGH', 7)
    var query = {
      text: "INSERT INTO patients VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)",
      values: [
        patientid(),
        body.name,
        body.age,
        body.sex,
        body.bloodgroup,
        body.dateofbirth,
        body.email,
        '123456789',
        body.phonenumber,
        body.fathersname,
        body.mothersname,
        body.address1,
        body.city,
        body.state,
        body.zip,
        new Date(),
        new Date(),
      ],
    };
    var newUser = await client.query(query);
    if (newUser.rowCount == 1) {
      console.log("New Patient Added");
      res.status(200).json({
        status: true,
        msg: "Patient Added",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
