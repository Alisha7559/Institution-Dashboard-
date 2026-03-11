import { call, put, takeEvery } from "redux-saga/effects";

import commonApi from "../api";
import config from "../../config";
import * as actions from "./slice";


/* ================= GET SUPPORT TYPES ================= */

function* getTypes() {

  try {

    const params = {
      api: `${config.ip}/api/support-types`,
      method: "GET", // ✅ FIXED
      authorization: "Bearer"
    };

    const res = yield call(commonApi, params);

    yield put(actions.getSupportTypesSuccess(res));

  } catch (error) {

    console.log("Support types error:", error);

    yield put(actions.getSupportTypesFail());

  }

}


/* ================= CREATE SUPPORT REQUEST ================= */

function* createRequest(action) {

  try {

    const params = {
      api: `${config.ip}/api/support-request`,
      method: "POST",
      authorization: "Bearer",
      body: action.payload
    };

    yield call(commonApi, params);

    yield put(actions.createSupportRequestSuccess());

    yield put(actions.getMyRequests());

  } catch (error) {

    console.log("Support request error:", error);

  }

}


/* ================= GET MY REQUESTS ================= */

function* getMyRequests() {

  try {

    const params = {
      api: `${config.ip}/api/my-support-requests`,
      method: "GET",
      authorization: "Bearer"
    };

    const res = yield call(commonApi, params);

    yield put(actions.getMyRequestsSuccess(res));

  } catch (error) {

    console.log("My requests error:", error);

    yield put(actions.getMyRequestsFail());

  }

}


/* ================= WATCHER ================= */

export default function* supportWatcher() {

  yield takeEvery(actions.getSupportTypes.type, getTypes);

  yield takeEvery(actions.createSupportRequest.type, createRequest);

  yield takeEvery(actions.getMyRequests.type, getMyRequests);

}