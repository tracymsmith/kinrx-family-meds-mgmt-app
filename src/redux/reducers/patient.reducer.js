const patientReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PATIENTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default patientReducer;
  