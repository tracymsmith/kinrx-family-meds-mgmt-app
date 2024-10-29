// Action to request medicines
export const fetchMedicines = () => ({
    type: 'FETCH_MEDICINES',
  });
  
  // Action to set medicines in the Redux store
  export const setMedicines = (medicines) => ({
    type: 'SET_MEDICINES',
    payload: medicines,
  });
  