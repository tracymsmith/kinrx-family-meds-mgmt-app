// Action to request patients
export const fetchPatients = () => ({
    type: 'FETCH_PATIENTS',
  });
  
  // Action to set patients in the Redux store
  export const setPatients = (patients) => ({
    type: 'SET_PATIENTS',
    payload: patients,
  });
  