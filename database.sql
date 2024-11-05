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
    "patient" VARCHAR (80) UNIQUE NOT NULL,
    "medicine_id" INT REFERENCES "medicines"(id) ON DELETE CASCADE,
    "medicine" VARCHAR (80) UNIQUE NOT NULL,
    "dosage" VARCHAR(1000) NOT NULL,
    "amount" VARCHAR(1000) NOT NULL,
    "frequency" VARCHAR(1000) NOT NULL
);
INSERT INTO "medicines" (medicine, dose, user_id)
VALUES ('vitamin D3', '2000 IU / 50 mcg', 9),('acetaminophen', '650 mg', 9),('guanfacine', '1 mg', 9),('carvedilol', '25 mg', 9),('allopurinol', '100 mg', 9),('lisinopril', '20 mg', 9),('magnesium oxide', '250 mg', 9),('magnesium glicynate', '100 mg', 9),('levothyroxine', '112 mcg', 9),('aspirin', '81 mg', 9),('hydralazine', '10 mg', 9),('albuterol', '90 mcg', 9),('warfarin', '5 mg', 9),('rosuvastatin', '10 mg', 9),('jardiance', '10 mg', 9),('trazadone', '50 mg', 9),('metformin', '1,000 mg', 9),('furosemide', '20 mg', 9);
INSERT INTO "patients" (patient, date_of_birth, user_id)
VALUES ('Ward', '06/18/48', 9),('June', '06/27/39', 9),('Theodore', '04/07/07', 9),('Wally', '09/24/59', 9);
-- INSERT INTO "patients_medicines" (patient_id, medicine_id, dose, amount, frequency)
-- VALUES (1, 2, '500 mg', '1 tablet', 'Twice daily');

