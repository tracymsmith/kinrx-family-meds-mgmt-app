import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../../redux/actions/patient.actions';
import { fetchPatientMedicines } from '../../redux/actions/patientMedicines.actions';

function PatientPage() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const medicines = useSelector((state) => state.patientMedicines);

  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handlePatientClick = (patientId) => {
    setSelectedPatientId(patientId);
    dispatch(fetchPatientMedicines(patientId));
  };

  const handleEditMedicine = (medicineId) => {
    // Implement edit functionality
    console.log(`Edit medicine with ID: ${medicineId}`);
  };

  const handleDeleteMedicine = (medicineId) => {
    // Implement delete functionality
    console.log(`Delete medicine with ID: ${medicineId}`);
  };

  return (
    <div>
      <h1>Patients</h1>
      <div>
        {patients.map((patient) => (
          <button 
            key={patient.id} 
            onClick={() => handlePatientClick(patient.id)}
            style={{ margin: '5px' }}
          >
            {patient.patient}
          </button>
        ))}
      </div>

      {selectedPatientId && (
        <div>
          <h2>Medicines for Selected Patient</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {medicines.map((med) => (
              <li key={med.id} style={{ marginBottom: '10px' }}>
                <strong>{med.medicine}</strong> - {med.dosage}, {med.amount}, {med.frequency}
                <button 
                  onClick={() => handleEditMedicine(med.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteMedicine(med.id)}
                  style={{ marginLeft: '5px' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PatientPage;