const { client } = require("../../config/dbConfig");
const { patientLogin } = require("../../controllers/patients/auth_controller");
const { generate_JWT, patient_JWT } = require("../../middlewares/jwt");

var Router = require("express").Router();

Router.post("/login", async (req, res, next) => {
  try {
    var findUser = await client.query(
      "SELECT patient_id, password FROM tbl_patients WHERE username = $1",
      [req.body.username]
    );
    if (findUser.rowCount == 1) {
      if ((req.body.password = findUser.rows[0].password)) {
        var jwt_token = await patient_JWT(findUser.rows[0].patient_id);
        if (jwt_token) {
          res.cookie("ptoken", jwt_token).status(200).json({
            status: true,
            ptoken: jwt_token,
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
        status: false,
        msg: "username not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
