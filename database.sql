-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
CREATE TABLE "medicines" (
    "id" SERIAL PRIMARY KEY,
    "medicine" VARCHAR (80) UNIQUE NOT NULL,
    "dose" VARCHAR (1000) NOT NULL,
    "user_id" INT REFERENCES "user" NOT NULL
);
CREATE TABLE "patients" (
    "id" SERIAL PRIMARY KEY,
    "patient" VARCHAR (80) UNIQUE NOT NULL,
    "date_of_birth" VARCHAR (1000) NOT NULL,
    "user_id" INT REFERENCES "user" NOT NULL
);
CREATE TABLE "patients_medicines" (
    "id" SERIAL PRIMARY KEY,
    "patient_id" INT REFERENCES "patients"(id) ON DELETE CASCADE,
    "medicine_id" INT REFERENCES "medicines"(id) ON DELETE CASCADE,
    "dose" VARCHAR(1000) NOT NULL,
    "amount" VARCHAR(1000) NOT NULL,
    "frequency" VARCHAR(1000) NOT NULL
);
INSERT INTO "patients_medicines" (patient_id, medicine_id, dose, amount, frequency)
VALUES (1, 2, '500 mg', '1 tablet', 'Twice daily');

