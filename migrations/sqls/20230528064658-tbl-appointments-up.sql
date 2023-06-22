CREATE TABLE tbl_appointments(
    appointment_id SERIAL PRIMARY KEY,
    patient_id VARCHAR NOT NULL,
    hospital_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date Date NOT NULL,
    appointment_time VARCHAR NOT NULL,
    isActive BOOLEAN default true,
    FOREIGN KEY(patient_id) REFERENCES tbl_patients(patient_id),
    FOREIGN KEY(hospital_id) REFERENCES tbl_hospital(hospital_id),
    FOREIGN KEY(doctor_id) REFERENCES tbl_doctor(doctor_id)
);