CREATE TABLE "patients" (
  "patient_id" INT PRIMARY KEY,
  "firstName" varchar NOT NULL,
  "lastName" varchar NOT NULL,
  "age" varchar NOT NULL,
  "sex" varchar NOT NULL,
  "bloodgroup" varchar NOT NULL,
  "dateofbirth" date NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "phonenumber" varchar NOT NULL,
  "altphonenumber" varchar NOT NULL,
  "fathersname" varchar NOT NULL,
  "mothersname" varchar NOT NULL,
  "address1" varchar NOT NULL,
  "address2" varchar NOT NULL,
  "city" varchar NOT NULL,
  "state" varchar NOT NULL,
  "zip" INT NOT NULL,
  "created_at" date NOT NULL,
  "updated_at" date NOT NULL
);

CREATE TABLE "hospitals" (
  "hospital_id" INT PRIMARY KEY,
  "hostpital_name" varchar,
  "username" varchar,
  "password" varchar,
  "verified" true,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "doctors" (
  "doctor_id" INT PRIMARY KEY,
  "doctor_name" varchar,
  "username" varchar,
  "password" varchar,
  "verified" boolean,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "appointments" (
  "appointment_id" INT PRIMARY KEY,
  "hospital_id" INT,
  "doctor_id" INT,
  "patient_id" INT,
  "appoinmentDate" date,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "observations" (
  "observation_id" INT PRIMARY KEY,
  "patient_id" INT,
  "appointment_id" INT,
  "findings" varchar
);

ALTER TABLE "appointments" ADD FOREIGN KEY ("hospital_id") REFERENCES "hospitals" ("hospital_id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("doctor_id") REFERENCES "doctors" ("doctor_id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("patient_id") REFERENCES "patients" ("patient_id");

ALTER TABLE "observations" ADD FOREIGN KEY ("patient_id") REFERENCES "patients" ("patient_id");

ALTER TABLE "observations" ADD FOREIGN KEY ("appointment_id") REFERENCES "appointments" ("appointment_id");
