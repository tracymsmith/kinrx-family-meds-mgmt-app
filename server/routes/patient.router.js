const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET route to fetch all patients
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "patients" ORDER BY "patient" ASC;';
  
  pool.query(queryText)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error('Error fetching patients:', err);
      res.sendStatus(500);
    });
});

// POST route to add a new patient
router.post('/', (req, res) => {
  const { patient, date_of_birth } = req.body;
  const queryText = `
    INSERT INTO "patients" (patient, date_of_birth, user_id)
    VALUES ($1, $2, $3) RETURNING *;
  `;

  // Replace user_id with actual user logic as needed
  const userId = 1; // Temporary placeholder for user_id

  pool
    .query(queryText, [patient, date_of_birth, userId])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error('Error adding new patient:', error);
      res.sendStatus(500);
    });
}); // <-- Closing curly bracket for router.post

module.exports = router;
