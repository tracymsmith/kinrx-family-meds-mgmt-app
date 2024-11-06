import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../../redux/actions/patient.actions';
import { fetchPatientMedicines } from '../../redux/actions/patientMedicines.actions';

function PatientPage() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const medicines = useSelector((state) => state.patientMedicines);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handlePatientClick = (patientId) => {
    setSelectedPatientId(patientId);
    dispatch(fetchPatientMedicines(patientId));
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PatientPage;