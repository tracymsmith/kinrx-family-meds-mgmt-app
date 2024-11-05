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
  
  // Local state for selecting patient, medicine, amount, and frequency
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [medicineAmount, setMedicineAmount] = useState('');
  const [medicineFrequency, setMedicineFrequency] = useState('');
  
 
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

  // Handle form submission to link meds to patients
  const handleAddPatientMedicine = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/patients_medicines', {
        patient_id: selectedPatient,
        medicine_id: selectedMedicine,
        amount: medicineAmount,
        frequency: medicineFrequency,
      });

      // Clear input fields
      setSelectedPatient('');
      setSelectedMedicine('');
      setMedicineAmount('');
      setMedicineFrequency('');

    } catch (error) {
      console.error('Error adding patient medicine:', error);
    }
  };


  return (
    <div>
      <h1>Add New Patients</h1>

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
        <button type="submit">Add New Patient</button>
      </form>

      <h1>Add New Medicines</h1>

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
        <button type="submit">Add New Medicine</button>
      </form>

      {/* NEW: Form to select a patient, medicine, amount, and frequency */}

      <h1>Link Med to Patient</h1>


      <form onSubmit={handleAddPatientMedicine}>
        <label>
          Select Patient:
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            required
          >
            <option value="">--Select Patient--</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.patient}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Medicine:
          <select
            value={selectedMedicine}
            onChange={(e) => setSelectedMedicine(e.target.value)}
            required
          >
            <option value="">--Select Medicine--</option>
            {medicines.map((medicine) => (
              <option key={medicine.id} value={medicine.id}>
                {medicine.medicine} - {medicine.dosage}
              </option>
            ))}
          </select>
        </label>

        <label>
          Amount:
          <input
            type="text"
            value={medicineAmount}
            onChange={(e) => setMedicineAmount(e.target.value)}
            required
          />
        </label>

        <label>
          Frequency:
          <input
            type="text"
            value={medicineFrequency}
            onChange={(e) => setMedicineFrequency(e.target.value)}
            required
          />
        </label>
        
        <button type="submit">Add Medicine to Patient</button>
      </form>
    </div>
  );

}

export default HomePage;
