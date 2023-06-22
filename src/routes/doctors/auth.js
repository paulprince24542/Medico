const { client } = require("../../config/dbConfig");
const { doctor_JWT } = require("../../middlewares/jwt");

var Router = require("express").Router();


Router.post("/login", async (req, res) => {
  try {
    console.log(req.body)
    var findDoctor = await client.query(
      "SELECT doctor_id, password FROM tbl_doctor WHERE username = $1",
      [req.body.username]
    );
    if (findDoctor.rowCount == 1) {
      if (req.body.password == findDoctor.rows[0].password) {
        var jwt_token = await doctor_JWT(findDoctor.rows[0].doctor_id);
        if (jwt_token) {
          res.cookie("dtoken", jwt_token).status(200).json({
            status: true,
            dtoken: jwt_token,
          });
        }
      } else {
        res.status(400).json({
          status: false,
          msg: "password incorrect",
        });
      }
    } else {
      res.status(400).json({
        msg: "username not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
