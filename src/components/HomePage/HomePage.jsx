import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function HomePage() {
  const dispatch = useDispatch();

  // Access patients and medicines data from the Redux store
  const patients = useSelector((state) => state.patients);
  const medicines = useSelector((state) => state.medicines);

  // Local state for patient and medicine form inputs
  const [patientName, setPatientName] = useState('');
  const [patientDOB, setPatientDOB] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [medicineDosage, setMedicineDosage] = useState('');
  

  // Dispatch fetch actions when the component mounts
  useEffect(() => {
    dispatch({type: 'FETCH_PATIENTS'});
    dispatch({type: 'FETCH_MEDICINES'});
  }, []);

  // Handle form submission to add a new patient
  const handlePatientSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to add the new patient
      await axios.post('/api/patients', {
        patient: patientName,
        date_of_birth: patientDOB,
      });

      // Clear input fields
      setPatientName('');
      setPatientDOB('');

      // Refresh the list of patients
      dispatch({type: 'FETCH_PATIENTS'});
    } catch (error) {
      console.error('Error adding new patient:', error);
    }
  };

  // Handle form submission to add a new medicine
  const handleMedicineSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to add the new medicine
      await axios.post('/api/medicines', {
        medicine: medicineName,
        dosage: medicineDosage,
      });

      // Clear input fields
      setMedicineName('');
      setMedicineDosage('');

      // Refresh the list of medicines
      dispatch({type: 'FETCH_MEDICINES'});
    } catch (error) {
      console.error('Error adding new medicine:', error);
    }
  };


  return (
    <div>
      <h1>Welcome to the KinRx Home Page</h1>

      {/* Form to add new patient */}
      <form onSubmit={handlePatientSubmit}>
        <label>
          Patient Name:
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            value={patientDOB}
            onChange={(e) => setPatientDOB(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Patient</button>
      </form>

      {/* Form to add new medicine */}
      <form onSubmit={handleMedicineSubmit}>
        <label>
          Medicine Name:
          <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            required
          />
        </label>
        <label>
          Dosage:
          <input
            type="text"
            value={medicineDosage}
            onChange={(e) => setMedicineDosage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Medicine</button>
      </form>

      <h2>Select Patient</h2>
      <select>
        <option value="">--Select Patient--</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.patient}
          </option>
        ))}
      </select>

      <h2>Select Medicine</h2>
      <select>
        <option value="">--Select Medicine--</option>
        {medicines.map((medicine) => (
          <option key={medicine.id} value={medicine.id}>
            {medicine.medicine} - {medicine.dose}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HomePage;
