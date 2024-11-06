const patientReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PATIENTS':
        return action.payload;
      // ... existing cases
      case 'EDIT_PATIENT_SUCCESS':
        return {
          ...state,
          patients: state.patients.map(patient => 
            patient.id === action.payload.patientId ? 
            { ...patient, ...action.payload.updatedPatientData } : 
            patient
          )
        };
      case 'DELETE_PATIENT_SUCCESS':
        return {
          ...state,
          patients: state.patients.filter(patient => patient.id !== action.payload)
        };
      // ... other cases
      default:
        return state;
    }
  };
  
  export default patientReducer;
  