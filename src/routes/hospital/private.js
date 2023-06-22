const { async } = require("crypto-random-string");
const { client } = require("../../config/dbConfig");
const {
  addPatient,
  assignDoctor,
  createAppointment,
} = require("../../controllers/hospital/private_controller");
const { verify_Authorization } = require("../../middlewares/jwt");

var Router = require("express").Router();

Router.post("/addpatient", verify_Authorization, (req, res, next) => {
  console.log("gerg");
  try {
    addPatient(req, res, next);
  } catch (err) {
    console.log(err);
  }
});

Router.post("/assigndoctor", verify_Authorization, (req, res, next) => {
  console.log("gerg");
  try {
    assignDoctor(req, res, next);
  } catch (err) {
    console.log(err);
  }
});

Router.post("/addappointment", verify_Authorization, (req, res, next) => {
  console.log(req.body);
  try {
    createAppointment(req, res, next);
  } catch (err) {
    console.log(err);
  }
});

Router.post("/getdoctor", async (req, res) => {
  console.log(req.body);
  client.query(
    "SELECT * FROM tbl_doctor WHERE ima_no = $1",
    [req.body.imano],
    (err, doctorDetails) => {
      if (err) throw err;
      console.log(doctorDetails.rows);
      if (doctorDetails.rowCount > 0) {
        res.status(200).json({
          status: true,
          data: doctorDetails.rows,
        });
      } else {
        res.status(400).json({
          status: false,
          data: doctorDetails.rows,
        });
      }
    }
  );
});

module.exports = Router;
