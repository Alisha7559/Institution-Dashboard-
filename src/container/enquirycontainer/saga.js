import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../api';
import config from '../../config';
import * as actions from './slice';
import { select } from "redux-saga/effects";


/* ================= GET ENQUIRIES ================= */

function* getEnquiriesSaga() {

  try {
          const instituteId = yield select(
      (state) => state.login.user?._id
    );
    const params = {

       api: `${config.ip}/api/getenquiry/${instituteId}`,
      method: 'GET',
      authorization: 'Bearer'

    };

    const res = yield call(commonApi, params);

    yield put(actions.getEnquiriesSuccess(res.data));

  }

  catch (error) {

    yield put(actions.getEnquiriesFail(error.message));

    toast.error(error.message || "Failed to load enquiries");

  }

}



/* ================= UPDATE STATUS (Optional) ================= */

function* updateEnquiryStatusSaga(action) {

  try {

    const { id, status } = action.payload;

    const params = {

      api: `${config.ip}/api/enquiry/${id}`,
      method: 'PUT',
      authorization: 'Bearer',
      body: { status }

    };

    const res = yield call(commonApi, params);

    yield put(actions.updateEnquirySuccess(res.data));

    toast.success("Status updated");

  }

  catch (error) {

    yield put(actions.updateEnquiryFail(error.message));

    toast.error(error.message);

  }

}



/* ================= WATCHER ================= */

export default function* enquiryWatcher() {

  yield takeEvery(actions.getEnquiries.type, getEnquiriesSaga);

  yield takeEvery(actions.updateEnquiry.type, updateEnquiryStatusSaga);

}