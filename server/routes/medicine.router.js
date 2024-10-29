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

module.exports = router;
