CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    FirstName VARCHAR,
    LastName VARCHAR,
    username VARCHAR,
    password VARCHAR,
    createdAt DATE,
    updatedAt DATE
);
INSERT INTO users
VALUES(
        1,
        'Paul',
        'Prince',
        'paulprince2454',
        '12456789',
        '18-04-2023',
        '18-04-2023'
    );