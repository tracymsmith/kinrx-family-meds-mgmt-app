const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to fetch all medicines for a specific patient
router.get('/:patient_id', (req, res) => {
  const patientId = req.params.patient_id;
  const queryText = `
    SELECT pm.id, pm.medicine, pm.dosage, pm.amount, pm.frequency
    FROM "patients_medicines" pm
    WHERE pm.patient_id = $1
    ORDER BY pm.medicine ASC;
  `;

  pool.query(queryText, [patientId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error('Error fetching medicines for patient:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
