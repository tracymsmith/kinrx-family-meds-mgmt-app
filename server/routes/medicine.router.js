const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET route to fetch all medicines
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "medicines" ORDER BY "medicine" ASC;';
  
  pool.query(queryText)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error('Error fetching medicines:', err);
      res.sendStatus(500);
    });
});

// POST route to add a new medicine
router.post('/', (req, res) => {
  const { medicine, dosage } = req.body;
  const queryText = `
    INSERT INTO "medicines" (medicine, dosage)
    VALUES ($1, $2) RETURNING *;
  `;


  pool
    .query(queryText, [medicine, dosage])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error('Error adding new medicine:', error);
      res.sendStatus(500);
    });
}); // <-- Closing curly bracket for router.post

module.exports = router;
