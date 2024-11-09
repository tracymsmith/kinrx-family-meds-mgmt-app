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

  // New state for editing patient
  const [isEditing, setIsEditing] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);  
 
  // Dispatch fetch actions when the component mounts
  useEffect(() => {
    dispatch({type: 'FETCH_PATIENTS'});
    dispatch({type: 'FETCH_MEDICINES'});
  }, []);  
  

  // Handle form submission to add a new patient
  const handlePatientSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/patients/${editingPatient}`, {
          patient: patientName,
          date_of_birth: patientDOB,
        });
        setIsEditing(false);
        setEditingPatient(null);
      } else {
        await axios.post('/api/patients', {
          patient: patientName,
          date_of_birth: patientDOB,
        });
      }
      setPatientName('');
      setPatientDOB('');
      dispatch({ type: 'FETCH_PATIENTS' });
    } catch (error) {
      console.error('Error submitting patient:', error);
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
    console.log(selectedPatient, selectedMedicine, medicineAmount, medicineFrequency)
    try {
      await axios.post('/api/patients_medicines', {
        patient_id: selectedPatient.id,
        patient: selectedPatient.patient,
        medicine_id: selectedMedicine.id,
        medicine: selectedMedicine.medicine,
        dosage: selectedMedicine.dosage,
        amount: medicineAmount,
        frequency: medicineFrequency,
      });

      // Clear input fields
      setSelectedPatient({ id: '', patient: '' });
      setSelectedMedicine({ id: '', medicine: '' });
      setMedicineAmount('');
      setMedicineFrequency('');


    } catch (error) {
      console.error('Error adding patient medicine:', error);
    }
  };

  // New function to handle patient edit
  const handleEditPatient = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/patients/${editingPatient}`, {
        patient: patientName,
        date_of_birth: patientDOB,
      });
      setIsEditing(false);
      setEditingPatient(null);
      setPatientName('');
      setPatientDOB('');
      dispatch({type: 'FETCH_PATIENTS'});
    } catch (error) {
      console.error('Error editing patient:', error);
    }
  };

  // New function to handle patient delete
  const handleDeletePatient = async (patientId) => {
    try {
      await axios.delete(`/api/patients/${patientId}`);
      dispatch({ type: 'FETCH_PATIENTS' });
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div>
      <h1>Add New Patients</h1>
      <p>{JSON.stringify(selectedMedicine.medicine)}</p>

      {/* Form to add new patient */}
      <form onSubmit={editingPatient ? handleEditPatient : handlePatientSubmit}>
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
          <button type="submit">
            {isEditing ? 'Update Patient' : 'Add New Patient'}
          </button>
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
            value={selectedPatient.id}
            // onChange={(e) => setSelectedPatient(patients.find(p => p.id === parseInt(e.target.value)))}>
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'edit') {
                setIsEditing(true);
                setEditingPatient(selectedPatient.id);
                setPatientName(selectedPatient.patient);
                setPatientDOB(selectedPatient.date_of_birth);
              } else if (value === 'delete') {
                handleDeletePatient(selectedPatient.id);
              } else if (value === '--Select Patient--') {
                setSelectedPatient({ id: '', patient: '' });
              } else {
                setSelectedPatient(patients.find(p => p.id === parseInt(value)));
              }
            }}
          >
            <option value="--Select Patient--">--Select Patient--</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.patient}
              </option>
            ))}
            <option value="edit">Edit Selected Patient</option>
            <option value="delete">Delete Selected Patient</option>
          </select>
        </label>

        <label>
          Select Medicine:
          <select
            value={selectedMedicine.id}
            onChange={(e) => setSelectedMedicine(medicines.find(m => m.id === parseInt(e.target.value)))}>
            required
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
