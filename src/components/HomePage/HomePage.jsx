import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../redux/actions/patient.actions';
import { fetchMedicines } from '../redux/actions/medicine.actions';

function HomePage() {
  const dispatch = useDispatch();

  // Access patients and medicines data from the Redux store
  const patients = useSelector((state) => state.patients);
  const medicines = useSelector((state) => state.medicines);

  // Dispatch fetch actions when the component mounts
  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchMedicines());
  }, [dispatch]);

  return (
    <div>
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
            {medicine.medicine}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HomePage;
