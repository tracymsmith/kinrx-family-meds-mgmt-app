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

module.exports = router;
