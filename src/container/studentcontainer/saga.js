import { takeEvery, call, put } from "redux-saga/effects";
import { getStudents, getStudentsSuccess, getStudentsFail } from "./slice";
import commonApi from '../api'; // make sure this exists
import appConfig from '../../config';

function* getStudentsSaga() {
  console.log("Saga triggered");
  try {

    

    const params = {
      api: `${appConfig.ip}/api/institution-students`,
      method: "GET",
      credentials: "include",
    };

    const res = yield call(commonApi, params);

    console.log("API Response:", res);

    yield put(getStudentsSuccess(res || []));

  } catch (error) {
    console.log("Saga Error:", error);
    yield put(getStudentsFail(error.message));
  }
}
export default function* studentWatcher() {
  yield takeEvery(getStudents.type, getStudentsSaga);
}