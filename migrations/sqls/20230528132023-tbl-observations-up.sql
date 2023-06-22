CREATE TABLE tbl_observation(
    observation_id SERIAL PRIMARY KEY,
    appointment_id INT NOT NULL,
    patient_id VARCHAR NOT NULL,
    doctor_id INT NOT NULL,
    findings VARCHAR NOT NULL,
    prescriptions VARCHAR NOT NULL,
    FOREIGN KEY(patient_id) REFERENCES tbl_patients(patient_id),
    FOREIGN KEY(doctor_id) REFERENCES tbl_doctor(doctor_id),
    FOREIGN KEY(appointment_id) REFERENCES tbl_appointments(appointment_id)
);