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

// POST route to add a medicine to a patient
router.post('/', (req, res) => {
  const { patient_id, medicine_id, amount, frequency } = req.body;
  const queryText = `
    INSERT INTO "patients_medicines" (patient_id, medicine_id, amount, frequency)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;

  pool
    .query(queryText, [patient_id, medicine_id, amount, frequency])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error('Error adding patient medicine:', error);
      res.sendStatus(500);
    });
});

router.delete('/:patientId/:medicineId', async (req, res) => {
  const { patientId, medicineId } = req.params;
  const queryText = `DELETE FROM "patients_medicines" WHERE "patient_id" = $1 AND "id" = $2;`;
  try {
    await pool.query(queryText, [patientId, medicineId]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.sendStatus(500);
  }
});

router.put('/:patientId/:medicineId', async (req, res) => {
  const { patientId, medicineId } = req.params;
  const { dosage, amount, frequency } = req.body;
  const queryText = `
    UPDATE "patients_medicines"
    SET "dosage" = $1, "amount" = $2, "frequency" = $3
    WHERE "patient_id" = $4 AND "id" = $5;
  `;
  try {
    await pool.query(queryText, [dosage, amount, frequency, patientId, medicineId]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating medicine:', error);
    res.sendStatus(500);
  }
});


module.exports = router;
