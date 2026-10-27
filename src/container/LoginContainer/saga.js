
import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';



function* login(action) {
  try {
    const params = {
      api: `${appConfig.ip}/api/institution/login`,
      method: 'POST',
      body: {
        email: action.payload.email,
        password: action.payload.password
      }
    };

    const res = yield call(commonApi, params);

    if (res) {
      yield put(actionType.loginSuccess(res));


      yield call(toast.success, 'Login successful');
      yield call(action.payload.navigate, '/dashboard');
    }
  } catch (error) {
    yield put(actionType.loginFail(error));
    yield call(toast.error, 'Login failed');
  }
}


function* userMe() {
  try {
    const params = {
      api: `${appConfig.ip}/api/profile`,
      method: 'GET',
      authorization: null 
    };

    const res = yield call(commonApi, params);


    yield put(actionType.userMeSuccess(res));

  } catch (error) {
    yield put(actionType.userMeFail(error));
  }
}





function* updateProfile(action) {
  try {
    const params = {
      api: `${appConfig.ip}/api/update`,
      method: "PUT",
      body: action.payload,
      authorization: "Bearer",
    };

    const res = yield call(commonApi, params);

    yield put(actionType.updateProfileSuccess(res));

    // ✅ ADD THIS
    yield put(actionType.userMe());

    yield call(toast.success, "Profile updated successfully");
  } catch (error) {
    yield put(actionType.updateProfileFail());
    yield call(toast.error, "Profile update failed");
  }
}








export default function* LoginActionWatcher() {
  yield takeEvery(actionType.userLogin, login);
  yield takeEvery(actionType.userMe, userMe);
  yield takeEvery(actionType.updateProfile, updateProfile);
}
