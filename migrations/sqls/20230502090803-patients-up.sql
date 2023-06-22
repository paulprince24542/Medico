CREATE TABLE tbl_patients (
  patient_id VARCHAR PRIMARY KEY,
  firstname varchar NOT NULL,
  lastname varchar NOT NULL,
  username varchar NOT NULL,
  email varchar NOT NULL,
  password varchar NOT NULL,
  dob date NOT NULL,
  age INT NOT NULL,
  gender varchar NOT NULL,
  bloodgroup varchar NOT NULL,
  fathername varchar NOT NULL,
  mothername varchar NOT NULL,
  address varchar NOT NULL,
  city varchar NOT NULL,
  state varchar NOT NULL,
  postalcode varchar NOT NULL,
  phone varchar NOT NULL,
  status varchar NOT NULL,
  hospitalid varchar NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  update_at timestamp DEFAULT CURRENT_TIMESTAMP
);

