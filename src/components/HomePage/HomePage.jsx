import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicines } from '../redux/actions/medicine.actions';

function HomePage() {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  return (
    <div>
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
