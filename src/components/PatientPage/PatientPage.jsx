import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../../redux/actions/patient.actions';
import { fetchPatientMedicines } from '../../redux/actions/patientMedicines.actions';

function PatientPage() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const medicines = useSelector((state) => state.patientMedicines);

  // Local state to store the selected patient’s ID
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Fetch patients when the component mounts
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  // Handle clicking on a patient button
  const handlePatientClick = (patientId) => {
    setSelectedPatientId(patientId); // Set the selected patient
    dispatch(fetchPatientMedicines(patientId)); // Fetch medicines for the selected patient
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

      {/* Display Medicines for the Selected Patient */}
      {selectedPatientId && (
        <div>
          <h2>Medicines for Selected Patient</h2>
          <ul>
            {medicines.map((med) => (
              <li key={med.id}>
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

  