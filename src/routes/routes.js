const { async } = require("crypto-random-string");
const { client } = require("../config/dbConfig");
const {
  verify_Authorization,
  doctor_Authorization,
  patient_Authorization,
} = require("../middlewares/jwt");

var Router = require("express").Router();

Router.get("/hospital/login", (req, res) => {
  res.render("hospital-login");
});

Router.get("/hospital/doctors", verify_Authorization, (req, res) => {
  client.query(
    "SELECT * FROM tbl_doctor WHERE current_hospital = $1 AND isactive = $2",
    [req.user.id, true],
    (err, doctors) => {
      if (err) throw err;
      if (doctors.rowCount > 0) {
        console.log(doctors.rows);
        res.render("doctor", {
          data: doctors.rows,
        });
      }
    }
  );
});

Router.get("/hospital/patients", verify_Authorization, (req, res) => {
  client.query("SELECT * from tbl_patients", (err, patients) => {
    if (err) throw err;
    if (patients.rowCount > 0) {
      console.log(patients.rows);
      res.render("patients", {
        data: patients.rows.reverse(),
      });
    }
  });
});

Router.get("/hospital/appoinments", verify_Authorization, (req, res) => {
  client.query(
    "SELECT appointment_id, tbl_patients.firstname as patientfirstname,tbl_patients.lastname as patientlastname, age, tbl_doctor.firstname as doctorname, tbl_doctor.specialization, appointment_date , appointment_time, status FROM tbl_appointments INNER JOIN tbl_patients ON tbl_appointments.patient_id = tbl_patients.patient_id INNER JOIN tbl_doctor ON tbl_appointments.doctor_id = tbl_doctor.doctor_id  WHERE hospital_id = $1 AND tbl_appointments.isactive = $2",
    [req.user.id, true],
    (err, appoinments) => {
      if (err) throw err;
      if (appoinments.rowCount > 0) {
        console.log(appoinments.rows);
        res.render("appoinments", {
          data: appoinments.rows.reverse(),
        });
      }
    }
  );
});

Router.get(
  "/hospital/addappointments",
  verify_Authorization,
  async (req, res) => {
    var getDoctorsList = await client.query("SELECT * from tbl_doctor WHERE isactive = true");
    console.log(getDoctorsList.rows);
    res.render("add-appointments", {
      doctors: getDoctorsList.rows,
    });
  }
);

Router.get("/hospital/addpatient", verify_Authorization, (req, res) => {
  res.render("add-patient");
});

Router.get("/hospital/assign-doctor", verify_Authorization, (req, res) => {
  res.render("assign-doctor");
});

Router.get("/doctor/login", (req, res) => {
  res.render("doctors/doctor-login");
});

// Router.get("/doctor/dashboard", doctor_Authorization, (req, res) => {
//   res.render("doctors/doctor-dashboard");
// });

Router.get("/doctor/appointments", doctor_Authorization, (req, res) => {
  client.query(
    "SELECT appointment_id, tbl_patients.firstname as fname,tbl_patients.lastname as lname, tbl_patients.patient_id,tbl_doctor.doctor_id, tbl_doctor.firstname as doctorname, tbl_doctor.specialization, appointment_date , appointment_time, status FROM tbl_appointments INNER JOIN tbl_patients ON tbl_appointments.patient_id = tbl_patients.patient_id INNER JOIN tbl_doctor ON tbl_appointments.doctor_id = tbl_doctor.doctor_id  WHERE tbl_appointments.doctor_id = $1 AND tbl_appointments.isactive = $2",
    [req.user.id, true],
    (err, appoinments) => {
      if (err) throw err;
      if (appoinments.rowCount > 0) {
        console.log(appoinments.rows);
        res.render("doctors/doctor-appointments", {
          status: true,
          data: appoinments.rows.reverse(),
        });
      } else {
        res.render("doctors/doctor-appointments", {
          status: false,
          data: appoinments.rows.reverse(),
        });
      }
    }
  );
});

Router.get(
  "/doctor/appointments/findings",
  doctor_Authorization,
  (req, res) => {
    console.log(req.query);
    // "SELECT * FROM tbl_observation INNER JOIN tbl_doctor ON tbl_observation.doctor_id = tbl_doctor.doctor_id INNER JOIN tbl_appointments ON tbl_appointments.patient_id = tbl_observation.patient_id WHERE tbl_observation.patient_id = $1 AND tbl_appointments.patient_id = $2",
    client.query(
      "SELECT * FROM tbl_observation INNER JOIN tbl_doctor ON tbl_observation.doctor_id = tbl_doctor.doctor_id INNER JOIN tbl_appointments ON tbl_appointments.appointment_id = tbl_observation.appointment_id WHERE tbl_observation.patient_id = $1 ",
      [req.query.patientid],
      (err, observations) => {
        console.log(observations.rows);
        if (err) throw err;
        if (observations.rowCount >= 0) {
          // res.render("add-findings", {
          //   data: observations.rows.reverse(),
          // });
          res.render("doctors/add-findings", {
            data: observations.rows.reverse(),
          });
        } else {
        }
      }
    );
  }
);

Router.get("/doctor/records", (req,res) => {
  res.render("doctors/medical-records")
})

Router.get("/patient/login", (req, res) => {
  res.render("patient-login");
});

Router.get("/patient/records", patient_Authorization, (req, res) => {
  client.query(
    "SELECT * FROM tbl_observation INNER JOIN tbl_doctor ON tbl_observation.doctor_id = tbl_doctor.doctor_id INNER JOIN tbl_appointments ON tbl_appointments.appointment_id = tbl_observation.appointment_id WHERE tbl_observation.patient_id = $1",
    [req.user.id],
    (err, records) => {
      console.log(records.rows);
      if (err) throw err;
      res.render("patients/records", {
        data: records.rows,
      });
    }
  );
});

Router.get("/patient/appointments", patient_Authorization, (req, res) => {
  client.query(
    "SELECT appointment_id,appointment_date,appointment_time, tbl_appointments.isactive, tbl_doctor.firstname as dfirst, tbl_doctor.lastname as dlast, specialization from tbl_appointments INNER JOIN tbl_doctor ON tbl_appointments.doctor_id = tbl_doctor.doctor_id WHERE patient_id = $1 AND tbl_appointments.isactive = $2",
    [req.user.id, true],
    (err, appoinments) => {
      //console.log(appoinments.rows);
      client.query(
        "SELECT appointment_id, appointment_date,appointment_time, tbl_appointments.isactive, tbl_doctor.firstname as dfirst, tbl_doctor.lastname as dlast, specialization from tbl_appointments INNER JOIN tbl_doctor ON tbl_appointments.doctor_id = tbl_doctor.doctor_id WHERE patient_id = $1 AND tbl_appointments.isactive =$2",
        [req.user.id, false],
        (err, oldAppointments) => {
          if (err) throw err;
          console.log(oldAppointments.rows);
          res.render("patients/appointments", {
            data: appoinments.rows,
            backup: oldAppointments.rows,
          });
        }
      );
    }
  );
});

module.exports = Router;
