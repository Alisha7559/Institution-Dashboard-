import { takeEvery, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import commonApi from "../api";
import config from "../../config";
import * as actions from "./slice";

function* getEnquiriesSaga() {
  try {
    const params = { api: `${config.ip}/api/enquiry/institute`, method: "GET", credentials: "include" };
    const res = yield call(commonApi, params);
    yield put(actions.getEnquiriesSuccess(res));
  } catch (error) {
    yield put(actions.getEnquiriesFail(error.message));
    toast.error(error.message || "Failed to load enquiries");
  }
}

function* updateEnquiryStatusSaga(action) {
  try {
    const { id, status } = action.payload;
    const params = { api: `${config.ip}/api/enquiry/${id}`, method: "PUT", body: { status }, credentials: "include" };
    const res = yield call(commonApi, params);
    yield put(actions.updateEnquirySuccess(res));
    toast.success("Status updated successfully");
  } catch (error) {
    yield put(actions.updateEnquiryFail(error.message));
    toast.error(error.message);
  }
}

export default function* enquiryWatcher() {
  yield takeEvery(actions.getEnquiries.type, getEnquiriesSaga);
  yield takeEvery(actions.updateEnquiry.type, updateEnquiryStatusSaga);
}