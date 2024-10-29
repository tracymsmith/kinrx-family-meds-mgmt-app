import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { setPatients } from '../actions/patient.actions';

function* fetchPatientsSaga() {
  try {
    const response = yield call(axios.get, '/api/patients');
    yield put(setPatients(response.data));
  } catch (error) {
    console.error('Error fetching patients:', error);
  }
}

function* patientSaga() {
  yield takeLatest('FETCH_PATIENTS', fetchPatientsSaga);
}

export default patientSaga;
