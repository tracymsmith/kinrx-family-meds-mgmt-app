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


// PUT route to update a patient
router.put('/:id', (req, res) => {
  const { patient, date_of_birth } = req.body;
  const queryText = `
    UPDATE "patients" SET "patient"=$1, "date_of_birth"=$2
    WHERE "id" = $3;
  `;

  pool
    .query(queryText, [patient, date_of_birth, req.params.id])
    .then((result) => res.sendStatus(204))
    .catch((error) => {
      console.error('Error updating patient:', error);
      res.sendStatus(500);
    });

  // PUT route to delete a patient
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const queryText = `
      DELETE FROM "patients"
      WHERE "id" = $1
      RETURNING *;
    `;

    pool.query(queryText, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Patient not found' });
      } else {
        res.status(200).json({ message: 'Patient deleted successfully' });
      }
    })
    .catch((error) => {
      console.error('Error deleting patient:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});
}); 

module.exports = router;
