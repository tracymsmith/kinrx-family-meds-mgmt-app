import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { setMedicines } from '../actions/medicine.actions';

function* fetchMedicinesSaga() {
  try {
    const response = yield call(axios.get, '/api/medicines');
    yield put(setMedicines(response.data));
  } catch (error) {
    console.error('Error fetching medicines:', error);
  }
}

function* medicineSaga() {
  yield takeLatest('FETCH_MEDICINES', fetchMedicinesSaga);
}

export default medicineSaga;
