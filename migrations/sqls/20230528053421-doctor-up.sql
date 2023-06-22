CREATE TABLE tbl_doctor(
    doctor_id SERIAL PRIMARY KEY,
    ima_no VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    specialization VARCHAR NOT NULL,
    current_hospital INT NOT NULL,
    isActive BOOLEAN NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(current_hospital) REFERENCES tbl_hospital(hospital_id)
);

INSERT INTO
    tbl_doctor(
        ima_no,
        username,
        password,
        firstname,
        lastname,
        address,
        specialization,
        current_hospital,
        isActive
    )
VALUES
    (
        '#456789',
        'paulprince24',
        '123456789',
        'Paul',
        'Prince',
        'India Angamaly Kerala',
        'Orthopaedic',
        1,
        true
    );

INSERT INTO
    tbl_doctor(
        ima_no,
        username,
        password,
        firstname,
        lastname,
        address,
        specialization,
        current_hospital,
        isActive
    )
VALUES
    (
        '#456781',
        'anitaprince24',
        '123456789',
        'Anita',
        'Prince',
        'United Kingdom Preston',
        'Clinical Pediatrician',
        1,
        true
    );

INSERT INTO
    tbl_doctor(
        ima_no,
        username,
        password,
        firstname,
        lastname,
        address,
        specialization,
        current_hospital,
        isActive,
        img
    )
VALUES
    (
        '#456783',
        'joelmathew24',
        '123456789',
        'Joel',
        'Mathew Thomas',
        'Rani',
        'Gynaecologist ',
        1,
        true,
        '/assets/img/mathan1.jpg'
    );


    INSERT INTO
    tbl_doctor(
        ima_no,
        username,
        password,
        firstname,
        lastname,
        address,
        specialization,
        current_hospital,
        isActive,
        img
    )
VALUES
    (
        '#456789',
        'jinson32',
        '123456789',
        'Jinson',
        'Mathew',
        'Rani',
        'Gastrology ',
        1,
        true,
        '/assets/img/torque.jpg'
    );


        INSERT INTO
    tbl_doctor(
        ima_no,
        username,
        password,
        firstname,
        lastname,
        address,
        specialization,
        current_hospital,
        isActive,
        img
    )
VALUES
    (
        '#456789',
        'akshay23',
        '123456789',
        'Akshay',
        'Babu',
        'Alapuzha',
        'Surgeon ',
        1,
        true,
        '/assets/img/akshay.jpg'
    );

           INSERT INTO
    tbl_doctor(
        ima_no,
        username,
        password,
        firstname,
        lastname,
        address,
        specialization,
        current_hospital,
        isActive,
        img
    )
VALUES
    (
        '#456712',
        'vishnu34',
        '123456789',
        'Vishnu',
        'Prasad',
        'Ranni',
        'Dermatology',
        1,
        true,
        '/assets/img/panic.jpg'
    );


               INSERT INTO
    tbl_doctor(
        ima_no,
        username,
        password,
        firstname,
        lastname,
        address,
        specialization,
        current_hospital,
        isActive,
        img
    )
VALUES
    (
        '#456712',
        'zameel34',
        '123456789',
        'Zameel',
        'K B',
        'Thrissur',
        'Family Medicine',
        1,
        true,
        '/assets/img/kodambi.jpg'
    );


                   INSERT INTO
    tbl_doctor(
        ima_no,
        username,
        password,
        firstname,
        lastname,
        address,
        specialization,
        current_hospital,
        isActive,
        img
    )
VALUES
    (
        '#456712',
        'romel34',
        '123456789',
        'Romel K',
        'Rais',
        'Pathanamthitta',
        'Cardiologist',
        1,
        true,
        '/assets/img/buddy.jpg'
    );

    
                   INSERT INTO
    tbl_doctor(
        ima_no,
        username,
        password,
        firstname,
        lastname,
        address,
        specialization,
        current_hospital,
        isActive,
        img
    )
VALUES
    (
        '#456712',
        'deron34',
        '123456789',
        'Deron',
        'Babu',
        'Idukki',
        'Pediatrics',
        1,
        true,
        '/assets/img/deron.jpg'
    );

                       INSERT INTO
    tbl_doctor(
        ima_no,
        username,
        password,
        firstname,
        lastname,
        address,
        specialization,
        current_hospital,
        isActive,
        img
    )
VALUES
    (
        '#456712',
        'paul',
        '123456789',
        'Deron',
        'Babu',
        'Idukki',
        'Pediatrics',
        1,
        true,
        '/assets/img/paul.jpg'
    );