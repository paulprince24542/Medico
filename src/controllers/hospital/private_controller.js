const { client } = require("../../config/dbConfig");
var cryptoRandom = require("crypto-random-string");

function addPatient(req, res, next) {
  console.log("Adding Patient");
  console.log(req.body);
  try {
    client.query(
      `INSERT INTO tbl_patients(patient_id, firstname, lastname, username, email, password, dob, age, gender, bloodgroup, fathername, mothername, address, city, state, postalcode, phone, status, hospitalid)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
      [
        // "cryptoRandom({ length: 10 }),"
        req.body.nfcid,
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        req.body.email,
        "123456789",
        req.body.dob,
        req.body.age,
        req.body.gender,
        req.body.bloodgroup,
        req.body.fathername,
        req.body.mothername,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.postalcode,
        req.body.phone,
        true,
        req.user.id,
      ],
      (err, patientAdded) => {
        if (err) throw err;
        if (patientAdded.rowCount == 1) {
          res.status(200).json({
            status: true,
            msg: "Patient Added",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err,
    });
  }
}

function assignDoctor(req, res, next) {
  try {
    client.query(
      "UPDATE tbl_doctor SET current_hospital = $1 WHERE ima_no = $2",
      [req.user.id, req.body.imano],
      (err, doctorAssigned) => {
        if (err) throw err;
        if (doctorAssigned.rowCount == 1) {
          res.status(200).json({
            msg: "Doctor assigned to hospital",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

function createAppointment(req, res, next) {
  try {
    client.query(
      "INSERT INTO tbl_appointments(patient_id, hospital_id, doctor_id, appointment_date, appointment_time) VALUES($1,$2,$3,$4,$5)",
      [
        req.body.patientid,
        req.user.id,
        req.body.doctorid,
        req.body.appointmentdate,
        req.body.appointmenttime,
      ],
      (err, added) => {
        if (err) throw err;
        if (added) {
          res.status(200).json({
            msg: "Appointment Added",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addPatient,
  assignDoctor,
  createAppointment,
};
