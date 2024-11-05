import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { setPatientMedicines } from '../actions/patientMedicines.actions';

function* fetchPatientMedicinesSaga(action) {
  try {
    const response = yield call(axios.get, `/api/patients_medicines/${action.payload}`);
    yield put(setPatientMedicines(response.data));
  } catch (error) {
    console.error('Error fetching medicines for patient:', error);
  }
}

function* patientMedicinesSaga() {
  yield takeLatest('FETCH_PATIENT_MEDICINES', fetchPatientMedicinesSaga);
}

export default patientMedicinesSaga;
