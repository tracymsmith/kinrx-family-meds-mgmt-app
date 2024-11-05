export const fetchPatientMedicines = (patientId) => ({
    type: 'FETCH_PATIENT_MEDICINES',
    payload: patientId,
  });
  
  export const setPatientMedicines = (medicines) => ({
    type: 'SET_PATIENT_MEDICINES',
    payload: medicines,
  });
  