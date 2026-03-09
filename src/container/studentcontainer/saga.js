function* getStudentsSaga() {
  try {

    const params = {
      api: `${config.ip}/api/institution-students`,
      method: "GET",
      credentials: "include"
    };

    const res = yield call(commonApi, params);

yield put(actions.getStudentsSuccess(res || []));
  } catch (error) {

    yield put(actions.getStudentsFail(error.message));

  }
}

yield takeEvery(actions.getStudents.type, getStudentsSaga);