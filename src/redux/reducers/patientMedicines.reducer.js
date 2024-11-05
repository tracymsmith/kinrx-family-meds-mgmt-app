const patientMedicinesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PATIENT_MEDICINES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default patientMedicinesReducer;
  