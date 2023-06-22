var express = require("express");
var app = express();

// ! Import Libraries
require("dotenv").config();
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var { engine } = require("express-handlebars");

var path = require("path");

// ! Database Configuration
const { client } = require("./src/config/dbConfig");
// const { admin, adminRouter } = require("./src/admin/admin");

// ! Sub Routes
var PatientAuth = require("./src/routes/patients/auth");
var HospitalAuth = require("./src/routes/hospital/auth");
var HospitalPrivate = require("./src/routes/hospital/private");

var DoctorAuth = require("./src/routes/doctors/auth");
var DoctorPrivate = require("./src/routes/doctors/private");

var routes = require("./src/routes/routes");

var PatientPrivate = require("./src/routes/patients/private");
const { readNFC } = require("./src/utils/readNFC");
const {
  generateAuthorization,
  verifyAuthorization,
} = require("../Client Projects/aamilpro_node/src/middlewares/verify_auth");
const { verify_Authorization } = require("./src/middlewares/jwt");

// ! Configuration
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());
app.set("view engine", "ejs");

app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/patient/auth", PatientAuth);
app.use("/patient/private", PatientPrivate);

app.use("/hospital/auth", HospitalAuth);
app.use("/hospital/private", HospitalPrivate);

app.use("/doctor/auth", DoctorAuth);
app.use("/doctor/private", DoctorPrivate);

app.use("/client", routes);
// app.use(admin.options.rootPath, adminRouter);

app.get("/", verify_Authorization, async (req, res) => {
  var doctor = await client.query(
    "SELECT * FROM tbl_doctor WHERE current_hospital = $1 AND isactive = $2",
    [req.user.id, true]
  );
  var appointments = await client.query(
    "SELECT tbl_patients.firstname as patientf, tbl_patients.lastname as patientl, tbl_appointments.isactive as active, tbl_patients.address as paddress, tbl_doctor.firstname as dfirst, tbl_doctor.lastname as dlast from tbl_appointments INNER JOIN tbl_patients ON tbl_appointments.patient_id = tbl_patients.patient_id INNER JOIN tbl_doctor ON tbl_appointments.doctor_id = tbl_doctor.doctor_id WHERE hospital_id = $1",
    [req.user.id]
  );
  var patient = await client.query(
    "select * from tbl_patients WHERE hospitalid = $1",
    [req.user.id]
  );
  console.log(appointments.rows);
  res.render("index", {
    doctors: doctor.rows,
    appointments: appointments.rows,
    dcount: doctor.rowCount,
    pcount: patient.rowCount,
    appointmentscount: appointments.rowCount,
  });
});

app.post("/nfc", async (req, res) => {
  console.log("Reading");
  var data = await readNFC(res);
  // console.log(data);

  // if(data){
  // res.status(200).json({
  //   msg: "Read: True",
  //   uid: data,
  // });
  // }
});

var PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Status: Running  http://localhost:${PORT}`);
});
