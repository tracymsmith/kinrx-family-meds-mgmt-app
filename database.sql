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
