CREATE TABLE tbl_hospital(
    hospital_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    tbl_hospital(name, username, password)
VALUES
    (
        'Little Flower Hospital Angamaly',
        'lf2022',
        '123456789'
    );