const { client } = require("../../config/dbConfig");

var Router = require("express").Router();

Router.post("/addfindings", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.active == "true") {
      client.query(
        "INSERT INTO tbl_observation(appointment_id, patient_id, doctor_id, findings, prescriptions) VALUES($1,$2,$3,$4,$5)",
        [
          req.body.appointmentid,
          req.body.patientid,
          req.body.doctorid,
          req.body.findings,
          req.body.prescriptions,
        ],
        (err, findings) => {
          if (err) throw err;
          if (findings.rowCount == 1) {
            res.status(200).json({
              msg: "Findings added",
            });
          }
        }
      );
    } else {
      client.query(
        "UPDATE tbl_appointments SET isactive = $1 WHERE appointment_id = $2",
        [false, req.body.appointmentid],
        (err, statusUpdated) => {
          if (err) throw err;
          if (statusUpdated.rowCount == 1) {
            res.status(200).json({
              msg: "Status updated",
            });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
