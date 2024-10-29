const medicineReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MEDICINES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default medicineReducer;
  