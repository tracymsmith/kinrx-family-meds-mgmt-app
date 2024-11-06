import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { setPatients } from '../actions/patient.actions';

function* fetchPatientsSaga() {
  try {
    const response = yield call(axios.get, '/api/patients');
    yield put(setPatients(response.data));
  } catch (error) {
    console.error('Error fetching patients:', error)};
}
  
function* editPatientSaga(action) {
  try {
    const { patientId, updatedPatientData } = action.payload;
    const response = yield call(axios.put, `/api/patients/${patientId}`, updatedPatientData);
    yield put({ type: 'EDIT_PATIENT_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'EDIT_PATIENT_FAILURE', error });
  }
}

function* deletePatientSaga(action) {
  try {
    yield call(axios.delete, `/api/patients/${action.payload}`);
    yield put({ type: 'DELETE_PATIENT_SUCCESS', payload: action.payload });
  } catch (error) {
    yield put({ type: 'DELETE_PATIENT_FAILURE', error });
  }
}

export default function* patientSaga() {
  // ... existing sagas
  yield takeLatest('FETCH_PATIENTS', fetchPatientsSaga);
  yield takeLatest('EDIT_PATIENT', editPatientSaga);
  yield takeLatest('DELETE_PATIENT', deletePatientSaga);
}
